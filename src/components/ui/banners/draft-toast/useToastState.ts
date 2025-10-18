import { useState, useRef, useCallback, useEffect } from "react";
import { ToastState, Position } from "./types";
import { TIMINGS } from "./constants";
import { constrainPosition, isPointInRect } from "./utils";

interface UseToastStateProps {
  toastRef: React.RefObject<HTMLDivElement | null>;
  isDragging: boolean;
  position: Position;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
  savePosition: (pos: Position) => void;
}

export function useToastState({
  toastRef,
  isDragging,
  position,
  setPosition,
  savePosition,
}: UseToastStateProps) {
  const [toastState, setToastState] = useState<ToastState>("minimal");
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearHoverTimeout = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  }, []);

  const adjustPositionForState = useCallback(
    (newState: ToastState) => {
      setPosition((current) => {
        const constrained = constrainPosition(current, newState);
        if (constrained.x !== current.x || constrained.y !== current.y) {
          savePosition(constrained);
          return constrained;
        }
        return current;
      });
    },
    [setPosition, savePosition]
  );

  const collapseToMinimal = useCallback(() => {
    setToastState("minimal");
    setIsHovered(false);
    requestAnimationFrame(() => adjustPositionForState("minimal"));
  }, [adjustPositionForState]);

  const handleMouseEnter = useCallback(() => {
    if (isDragging) return;

    clearHoverTimeout();
    setIsHovered(true);
    if (toastState === "minimal") {
      setToastState("expanded");
    }
  }, [isDragging, toastState, clearHoverTimeout]);

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging) return;

      setIsHovered(false);
      hoverTimeoutRef.current = setTimeout(() => {
        if (!toastRef.current) return;

        const rect = toastRef.current.getBoundingClientRect();
        const isStillHovering = isPointInRect(e.clientX, e.clientY, rect);

        if (!isStillHovering && toastState === "expanded") {
          collapseToMinimal();
        }
      }, TIMINGS.hoverDelay);
    },
    [isDragging, toastState, toastRef, collapseToMinimal]
  );

  const handleTransitionToExpanded = useCallback(
    (clientX: number, clientY: number, isTouchEvent: boolean) => {
      setToastState("expanded");

      requestAnimationFrame(() => {
        adjustPositionForState("expanded");
      });

      setTimeout(() => {
        if (!toastRef.current) return;

        const rect = toastRef.current.getBoundingClientRect();
        const isStillOver = isPointInRect(clientX, clientY, rect);

        if (isTouchEvent) {
          if (!isStillOver) {
            collapseToMinimal();
          } else {
            clearHoverTimeout();
            hoverTimeoutRef.current = setTimeout(
              collapseToMinimal,
              TIMINGS.mobileAutoCollapse
            );
          }
        } else {
          if (!isStillOver) {
            setIsHovered(false);
            clearHoverTimeout();
            hoverTimeoutRef.current = setTimeout(() => {
              setToastState("minimal");
              requestAnimationFrame(() => adjustPositionForState("minimal"));
            }, TIMINGS.hoverDelay);
          } else {
            setIsHovered(true);
          }
        }
      }, TIMINGS.transitionWait);
    },
    [toastRef, adjustPositionForState, clearHoverTimeout, collapseToMinimal]
  );

  const handleClick = useCallback(
    (clientX: number, clientY: number, isTouchEvent: boolean) => {
      if (toastState === "minimal") {
        setIsHovered(true);
        setToastState("expanded");
        clearHoverTimeout();

        if (isTouchEvent) {
          hoverTimeoutRef.current = setTimeout(
            collapseToMinimal,
            TIMINGS.mobileAutoCollapse
          );
        }
      } else if (toastState === "detailed") {
        handleTransitionToExpanded(clientX, clientY, isTouchEvent);
      } else {
        clearHoverTimeout();
        setToastState("detailed");
        requestAnimationFrame(() => adjustPositionForState("detailed"));
      }
    },
    [
      toastState,
      adjustPositionForState,
      clearHoverTimeout,
      collapseToMinimal,
      handleTransitionToExpanded,
    ]
  );

  useEffect(() => {
    if (toastState !== "expanded") return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!toastRef.current) return;

      const rect = toastRef.current.getBoundingClientRect();
      const isCurrentlyOver = isPointInRect(e.clientX, e.clientY, rect);

      if (isHovered && !isCurrentlyOver) {
        setIsHovered(false);
        clearHoverTimeout();
        hoverTimeoutRef.current = setTimeout(() => {
          if (toastState === "expanded") {
            collapseToMinimal();
          }
        }, TIMINGS.hoverDelay);
      }
    };

    document.addEventListener("mousemove", handleGlobalMouseMove, {
      passive: true,
    });
    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
    };
  }, [toastState, isHovered, toastRef, clearHoverTimeout, collapseToMinimal]);

  useEffect(() => {
    return () => clearHoverTimeout();
  }, [clearHoverTimeout]);

  return {
    toastState,
    setToastState,
    isHovered,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
    handleTransitionToExpanded,
    clearHoverTimeout,
    adjustPositionForState,
  };
}
