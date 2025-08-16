import { draftMode } from "next/headers";
import ClientExitPreviewBanner from "./ClientExitPreviewBanner";

export default async function ExitPreviewBanner() {
  const { isEnabled: draftIsEnabled } = await draftMode();

  if (!draftIsEnabled) return null;

  return <ClientExitPreviewBanner />;
}
