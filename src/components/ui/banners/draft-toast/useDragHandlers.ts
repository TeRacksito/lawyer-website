import { useState, useRef, useCallback, useEffect } from "react";
import { DragState, Position, EdgeSide } from "./types";
import { MARGINS } from "./constants";
import {
  getDimensions,
  constrainPosition,
  calculateDragDistance,
} from "./utils";

interface UseDragHandlersProps {
  position: Position;
  setPosition: (pos: Position) => void;
  savePosition: (pos: Position) => void;
  edgeSide: EdgeSide;
  setEdgeSide: (side: EdgeSide) => void;
  saveEdgeSide: (side: EdgeSide) => void;
  toastRef: React.RefObject<HTMLDivElement | null>;
  onDragStart?: () => void;
}

export function useDragHandlers({
  position,
  setPosition,
  savePosition,
  edgeSide,
  setEdgeSide,
  saveEdgeSide,
  toastRef,
  onDragStart,
}: UseDragHandlersProps) {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    dragOffset: { x: 0, y: 0 },
    startPosition: { x: 0, y: 0 },
  });

  const dragStartTimeRef = useRef<number>(0);

  const snapToNearestEdge = useCallback(
    (currentPos: Position): Position => {
      if (typeof window === "undefined") return currentPos;

      const dimensions = getDimensions("minimal");
      const centerX = currentPos.x + dimensions.width / 2;
      const screenCenter = window.innerWidth / 2;

      const snapToLeft =
        edgeSide === "left" ? centerX < screenCenter : centerX > screenCenter;

      const newSide = snapToLeft ? "left" : "right";

      if (newSide !== edgeSide) {
        currentPos.x = window.innerWidth - currentPos.x - dimensions.width;
        setPosition(currentPos);
      }

      const snappedPosition = {
        x: MARGINS.edge,
        y: Math.max(
          MARGINS.top,
          Math.min(
            currentPos.y,
            window.innerHeight - dimensions.height - MARGINS.edge
          )
        ),
      };

      setEdgeSide(newSide);
      saveEdgeSide(newSide);

      return snappedPosition;
    },
    [edgeSide, setPosition, setEdgeSide, saveEdgeSide]
  );

  const animateToPosition = useCallback(
    (targetPos: Position) => {
      if (!toastRef.current) return;

      const startPos = { ...position };
      const distance = Math.sqrt(
        Math.pow(targetPos.x - startPos.x, 2) +
          Math.pow(targetPos.y - startPos.y, 2)
      );

      const duration = Math.min(600, Math.max(200, distance * 1.5));
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);

        const currentPos = {
          x: startPos.x + (targetPos.x - startPos.x) * easeOut,
          y: startPos.y + (targetPos.y - startPos.y) * easeOut,
        };

        setPosition(currentPos);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setPosition(targetPos);
          savePosition(targetPos);
        }
      };

      requestAnimationFrame(animate);
    },
    [position, setPosition, savePosition, toastRef]
  );

  const handleDragStart = useCallback(
    (clientX: number, clientY: number) => {
      const rect = toastRef.current?.getBoundingClientRect();
      if (!rect) return;

      dragStartTimeRef.current = Date.now();
      setDragState({
        isDragging: true,
        dragOffset: {
          x:
            edgeSide === "left"
              ? clientX - rect.left
              : rect.width - (clientX - rect.left),
          y: clientY - rect.top,
        },
        startPosition: { ...position },
      });

      onDragStart?.();
    },
    [position, edgeSide, toastRef, onDragStart]
  );

  const handleDragMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!dragState.isDragging) return;

      const newPosition = constrainPosition({
        x:
          edgeSide === "left"
            ? clientX - dragState.dragOffset.x
            : window.innerWidth - clientX - dragState.dragOffset.x,
        y: clientY - dragState.dragOffset.y,
      });

      setPosition(newPosition);
    },
    [dragState.isDragging, dragState.dragOffset, edgeSide, setPosition]
  );

  const handleDragEnd = useCallback(() => {
    if (!dragState.isDragging) return;

    const dragDistance = calculateDragDistance(
      position,
      dragState.startPosition
    );
    setDragState((prev) => ({ ...prev, isDragging: false }));

    if (dragDistance > 5) {
      const snappedPosition = snapToNearestEdge(position);

      if (
        snappedPosition.x !== position.x ||
        snappedPosition.y !== position.y
      ) {
        animateToPosition(snappedPosition);
      } else {
        savePosition(position);
      }
    }
  }, [
    dragState.isDragging,
    dragState.startPosition,
    position,
    snapToNearestEdge,
    animateToPosition,
    savePosition,
  ]);

  useEffect(() => {
    if (!dragState.isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      handleDragMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      if (touch) handleDragMove(touch.clientX, touch.clientY);
    };

    const handleMouseUp = (e: MouseEvent) => {
      handleDragEnd();
      e.preventDefault();
      e.stopPropagation();
    };

    const handleTouchEnd = () => {
      handleDragEnd();
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd, { passive: false });
    document.body.style.userSelect = "none";
    document.body.style.cursor = "grabbing";

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    };
  }, [dragState.isDragging, handleDragMove, handleDragEnd]);

  return {
    dragState,
    handleDragStart,
  };
}
