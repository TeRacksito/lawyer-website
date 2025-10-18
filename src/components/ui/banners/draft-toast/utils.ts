import { Position, ToastState, ToastDimensions } from "./types";
import { MARGINS } from "./constants";

export function getDimensions(state: ToastState): ToastDimensions {
  switch (state) {
    case "minimal":
      return { width: 48, height: 48 };
    case "expanded":
      return { width: 192, height: 48 };
    case "detailed":
      return { width: 256, height: 212 };
    default:
      return { width: 48, height: 48 };
  }
}

export function constrainPosition(
  pos: Position,
  targetState?: ToastState
): Position {
  if (typeof window === "undefined") return pos;

  const dimensions = getDimensions(targetState || "minimal");
  const maxX = window.innerWidth - dimensions.width - MARGINS.edge;
  const maxY = window.innerHeight - dimensions.height - MARGINS.edge;

  return {
    x: Math.max(MARGINS.edge, Math.min(pos.x, maxX)),
    y: Math.max(MARGINS.top, Math.min(pos.y, maxY)),
  };
}

export function isPointInRect(x: number, y: number, rect: DOMRect): boolean {
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

export function calculateDragDistance(
  current: Position,
  start: Position
): number {
  return Math.sqrt(
    Math.pow(current.x - start.x, 2) + Math.pow(current.y - start.y, 2)
  );
}
