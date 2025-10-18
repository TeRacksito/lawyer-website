import { useState, useCallback, useEffect } from "react";
import { Position, EdgeSide } from "./types";
import { DEFAULT_POSITION, STORAGE_KEYS, MARGINS } from "./constants";

export function usePersistedPosition() {
  const [position, setPosition] = useState<Position>(() => {
    if (typeof window === "undefined") return DEFAULT_POSITION;

    try {
      const saved = localStorage.getItem(STORAGE_KEYS.position);
      if (saved) {
        const parsedPosition = JSON.parse(saved) as Position;

        const isValid =
          parsedPosition.x >= 0 &&
          parsedPosition.y >= MARGINS.top &&
          parsedPosition.x <= window.innerWidth - 48 &&
          parsedPosition.y <= window.innerHeight - 48;

        if (isValid) {
          const isNearLeftEdge = parsedPosition.x <= MARGINS.edge + 50;
          const isNearRightEdge =
            parsedPosition.x >= window.innerWidth - 48 - MARGINS.edge - 50;

          if (isNearLeftEdge || isNearRightEdge) {
            return parsedPosition;
          } else {
            const centerX = parsedPosition.x + 24;
            const snapToLeft = centerX < window.innerWidth / 2;
            return {
              x: snapToLeft
                ? MARGINS.edge
                : window.innerWidth - 48 - MARGINS.edge,
              y: Math.max(MARGINS.top, parsedPosition.y),
            };
          }
        }
      }
    } catch (error) {
      console.warn("Failed to load toast position from localStorage:", error);
    }

    return DEFAULT_POSITION;
  });

  const savePosition = useCallback((pos: Position) => {
    setPosition(pos);
    try {
      localStorage.setItem(STORAGE_KEYS.position, JSON.stringify(pos));
    } catch (error) {
      console.warn("Failed to save toast position to localStorage:", error);
    }
  }, []);

  return { position, setPosition, savePosition };
}

export function usePersistedEdgeSide() {
  const [edgeSide, setEdgeSide] = useState<EdgeSide>(() => {
    if (typeof window === "undefined") return "left";

    try {
      const savedEdge = localStorage.getItem(STORAGE_KEYS.edge);

      if (savedEdge && (savedEdge === "left" || savedEdge === "right")) {
        return savedEdge as EdgeSide;
      }

      const saved = localStorage.getItem(STORAGE_KEYS.position);
      if (saved) {
        const parsedPosition = JSON.parse(saved) as Position;
        const centerX = parsedPosition.x + 24;
        return centerX < window.innerWidth / 2 ? "left" : "right";
      }
    } catch (error) {
      console.warn("Failed to determine edge side from localStorage:", error);
    }

    return "left";
  });

  const saveEdgeSide = useCallback((edge: EdgeSide) => {
    setEdgeSide(edge);
    try {
      localStorage.setItem(STORAGE_KEYS.edge, edge);
    } catch (error) {
      console.warn("Failed to save toast edge side to localStorage:", error);
    }
  }, []);

  return { edgeSide, setEdgeSide, saveEdgeSide };
}
