/**
 * KV Storage utilities for managing notifications with compression and block separation
 */

const NOTIFICATIONS_KEY = "admin_notifications";
const MAX_BLOCK_SIZE = 24 * 1024 * 1024; // 24 MiB
const METADATA_OVERHEAD = 1024; // Reserve space for metadata
const SAFE_BLOCK_SIZE = MAX_BLOCK_SIZE - METADATA_OVERHEAD;

interface NotificationPayload {
  name: string;
  surname: string;
  email: string;
  subject: string;
  body: string;
  category?: string;
  tags?: string[];
  timestamp: number;
}

interface StorageBlock {
  data: string;
  hasNext: boolean;
  blockIndex: number;
  totalBlocks?: number;
}

/**
 * Compresses a string using gzip compression
 */
async function compress(data: string): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  const uint8Array = encoder.encode(data);

  const compressionStream = new CompressionStream("gzip");
  const writer = compressionStream.writable.getWriter();
  writer.write(uint8Array);
  writer.close();

  const chunks: Uint8Array[] = [];
  const reader = compressionStream.readable.getReader();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }

  const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }

  return result.buffer;
}

/**
 * Decompresses gzip compressed data
 */
async function decompress(data: ArrayBuffer): Promise<string> {
  const decompressionStream = new DecompressionStream("gzip");
  const writer = decompressionStream.writable.getWriter();
  writer.write(new Uint8Array(data));
  writer.close();

  const chunks: Uint8Array[] = [];
  const reader = decompressionStream.readable.getReader();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }

  const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }

  const decoder = new TextDecoder();
  return decoder.decode(result);
}

/**
 * Converts ArrayBuffer to base64 string
 */
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/**
 * Converts base64 string to ArrayBuffer
 */
function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

/**
 * Adds a notification to KV storage
 */
export async function addNotification(
  kv: KVNamespace,
  notification: NotificationPayload
): Promise<void> {
  console.log("[KV] Adding notification to storage");

  const existing = await readNotifications(kv);
  existing.push(notification);

  await writeNotifications(kv, existing);
  console.log("[KV] Notification added successfully");
}

/**
 * Reads all notifications from KV storage
 */
export async function readNotifications(
  kv: KVNamespace
): Promise<NotificationPayload[]> {
  console.log("[KV] Reading notifications from storage");

  try {
    const firstBlock = await kv.get<StorageBlock>(NOTIFICATIONS_KEY, "json");

    if (!firstBlock) {
      console.log("[KV] No notifications found");
      return [];
    }

    let allData = firstBlock.data;
    let blockIndex = 0;

    while (firstBlock.hasNext && blockIndex < 100) {
      blockIndex++;
      const nextKey = `${NOTIFICATIONS_KEY}_${blockIndex}`;
      const nextBlock = await kv.get<StorageBlock>(nextKey, "json");

      if (!nextBlock) {
        console.warn(`[KV] Block ${blockIndex} not found, stopping read`);
        break;
      }

      allData += nextBlock.data;

      if (!nextBlock.hasNext) {
        break;
      }
    }

    const compressedBuffer = base64ToArrayBuffer(allData);
    const jsonString = await decompress(compressedBuffer);
    const notifications = JSON.parse(jsonString) as NotificationPayload[];

    console.log(`[KV] Successfully read ${notifications.length} notifications`);
    return notifications;
  } catch (error) {
    console.error("[KV] Error reading notifications:", error);
    return [];
  }
}

/**
 * Writes notifications to KV storage with compression and block separation
 */
async function writeNotifications(
  kv: KVNamespace,
  notifications: NotificationPayload[]
): Promise<void> {
  console.log(`[KV] Writing ${notifications.length} notifications to storage`);

  const jsonString = JSON.stringify(notifications);
  const compressed = await compress(jsonString);
  const base64Data = arrayBufferToBase64(compressed);

  console.log(`[KV] Compressed size: ${base64Data.length} bytes`);

  if (base64Data.length <= SAFE_BLOCK_SIZE) {
    const block: StorageBlock = {
      data: base64Data,
      hasNext: false,
      blockIndex: 0,
      totalBlocks: 1,
    };

    await kv.put(NOTIFICATIONS_KEY, JSON.stringify(block));
    console.log("[KV] Notifications written in single block");
  } else {
    const totalBlocks = Math.ceil(base64Data.length / SAFE_BLOCK_SIZE);
    console.log(`[KV] Data too large, splitting into ${totalBlocks} blocks`);

    for (let i = 0; i < totalBlocks; i++) {
      const start = i * SAFE_BLOCK_SIZE;
      const end = Math.min(start + SAFE_BLOCK_SIZE, base64Data.length);
      const chunk = base64Data.slice(start, end);

      const block: StorageBlock = {
        data: chunk,
        hasNext: i < totalBlocks - 1,
        blockIndex: i,
        totalBlocks,
      };

      const key = i === 0 ? NOTIFICATIONS_KEY : `${NOTIFICATIONS_KEY}_${i}`;
      await kv.put(key, JSON.stringify(block));
      console.log(`[KV] Written block ${i + 1}/${totalBlocks}`);
    }
  }
}

/**
 * Clears all notifications by setting empty value
 */
export async function clearNotifications(kv: KVNamespace): Promise<void> {
  console.log("[KV] Clearing notifications");

  const firstBlock = await kv.get<StorageBlock>(NOTIFICATIONS_KEY, "json");

  if (!firstBlock) {
    console.log("[KV] No notifications to clear");
    return;
  }

  const emptyBlock: StorageBlock = {
    data: "",
    hasNext: false,
    blockIndex: 0,
    totalBlocks: 1,
  };

  await kv.put(NOTIFICATIONS_KEY, JSON.stringify(emptyBlock));

  if (firstBlock.totalBlocks && firstBlock.totalBlocks > 1) {
    for (let i = 1; i < firstBlock.totalBlocks; i++) {
      const key = `${NOTIFICATIONS_KEY}_${i}`;
      await kv.put(key, JSON.stringify(emptyBlock));
    }
  }

  console.log("[KV] Notifications cleared");
}
