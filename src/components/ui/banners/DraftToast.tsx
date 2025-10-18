"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";

export type ToastState = "minimal" | "expanded" | "detailed";

export interface DraftToastProps {
  type: "enter" | "exit";
  url: string;
  title: string;
  shortTitle: string;
  description: string;
  buttonText: string;
  icon: React.ReactNode;
  isVisible?: boolean;
}

interface Position {
  x: number;
  y: number;
}

interface DragState {
  isDragging: boolean;
  dragOffset: Position;
  startPosition: Position;
}

type EdgeSide = "left" | "right";

// Default position for toast (snapped to left edge)
const DEFAULT_POSITION = { x: 8, y: 72 };

// Storage keys for persistence (unified for both enter and exit)
const STORAGE_KEYS = {
  position: "draft-toast-position",
  edge: "draft-toast-edge",
} as const;

export default function DraftToast({
  type,
  url,
  title,
  shortTitle,
  description,
  buttonText,
  icon,
  isVisible = true,
}: DraftToastProps) {
  const [toastState, setToastState] = useState<ToastState>("minimal");
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState<Position>(() => {
    // Initialize position from localStorage or default
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEYS.position);
        if (saved) {
          const parsedPosition = JSON.parse(saved) as Position;
          const margin = 8;
          const topMargin = 72;

          // Validate saved position is within bounds
          const isValid =
            parsedPosition.x >= 0 &&
            parsedPosition.y >= topMargin &&
            parsedPosition.x <= window.innerWidth - 48 &&
            parsedPosition.y <= window.innerHeight - 48;

          if (isValid) {
            // Ensure saved position is snapped to an edge
            const isNearLeftEdge = parsedPosition.x <= margin + 50; // Within 50px of left edge
            const isNearRightEdge =
              parsedPosition.x >= window.innerWidth - 48 - margin - 50; // Within 50px of right edge

            if (isNearLeftEdge || isNearRightEdge) {
              return parsedPosition;
            } else {
              // If saved position is not near an edge, snap it to the nearest one
              const centerX = parsedPosition.x + 24; // 24 = half of minimal width (48px)
              const snapToLeft = centerX < window.innerWidth / 2;
              return {
                x: snapToLeft ? margin : window.innerWidth - 48 - margin,
                y: Math.max(topMargin, parsedPosition.y),
              };
            }
          }
        }
      } catch (error) {
        console.warn("Failed to load toast position from localStorage:", error);
      }

      // Return default position snapped to left edge
      return DEFAULT_POSITION;
    }
    return DEFAULT_POSITION;
  });

  const [edgeSide, setEdgeSide] = useState<EdgeSide>(() => {
    // Only run localStorage logic on client side
    if (typeof window !== "undefined") {
      try {
        // First try to load from localStorage
        const savedEdge = localStorage.getItem(STORAGE_KEYS.edge);

        if (savedEdge && (savedEdge === "left" || savedEdge === "right")) {
          return savedEdge as EdgeSide;
        }

        // Fallback to calculating from position
        const saved = localStorage.getItem(STORAGE_KEYS.position);
        if (saved) {
          const parsedPosition = JSON.parse(saved) as Position;
          const centerX = parsedPosition.x + 24; // 24 = half of minimal width (48px)
          return centerX < window.innerWidth / 2 ? "left" : "right";
        }
      } catch (error) {
        console.warn("Failed to determine edge side from localStorage:", error);
      }
    }
    return "left";
  });

  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    dragOffset: { x: 0, y: 0 },
    startPosition: { x: 0, y: 0 },
  });

  const toastRef = useRef<HTMLDivElement>(null);
  const dragHandleRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const expandTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dragStartTimeRef = useRef<number>(0);

  // Dimensions for different states (memoized for performance)
  const getDimensions = useCallback(
    (state: ToastState = toastState) => {
      switch (state) {
        case "minimal":
          return { width: 48, height: 48 };
        case "expanded":
          return { width: 192, height: 48 };
        case "detailed":
          return { width: 256, height: 212 }; // Approximate height
        default:
          return { width: 48, height: 48 };
      }
    },
    [toastState]
  );

  // Constrain position within viewport bounds (optimized)
  const constrainPosition = useCallback(
    (pos: Position, targetState?: ToastState): Position => {
      if (typeof window === "undefined") return pos;

      const dimensions = getDimensions(targetState);
      const margin = 8; // 8px margin from edges
      const topMargin = 72; // Larger top margin to prevent toast from going too high

      const maxX = window.innerWidth - dimensions.width - margin;
      const maxY = window.innerHeight - dimensions.height - margin;

      return {
        x: Math.max(margin, Math.min(pos.x, maxX)),
        y: Math.max(topMargin, Math.min(pos.y, maxY)),
      };
    },
    [getDimensions]
  );

  // Save position to localStorage (debounced for performance)
  const savePositionDebounced = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (pos: Position) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          if (typeof window !== "undefined") {
            try {
              localStorage.setItem(STORAGE_KEYS.position, JSON.stringify(pos));
            } catch (error) {
              console.warn(
                "Failed to save toast position to localStorage:",
                error
              );
            }
          }
        }, 100); // 100ms debounce
      };
    })(),
    []
  );

  // Save edge side to localStorage (debounced for performance)
  const saveEdgeSideDebounced = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (edge: EdgeSide) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          if (typeof window !== "undefined") {
            try {
              localStorage.setItem(STORAGE_KEYS.edge, edge);
            } catch (error) {
              console.warn(
                "Failed to save toast edge side to localStorage:",
                error
              );
            }
          }
        }, 100); // 100ms debounce
      };
    })(),
    []
  );

  // Handle window resize to keep toast visible and maintain edge snapping (throttled for performance)
  const handleResize = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setPosition((current) => {
            // Determine which edge the toast was on before resize
            const dimensions = getDimensions();
            const margin = 8;
            const topMargin = 72;
            const wasOnLeft = edgeSide === "left";

            // Snap to the same edge after resize
            const newPosition = {
              //   x: wasOnLeft
              //     ? margin
              //     : window.innerWidth - dimensions.width - margin,
              x: margin,
              y: Math.max(
                topMargin,
                Math.min(
                  current.y,
                  window.innerHeight - dimensions.height - margin
                )
              ),
            };

            savePositionDebounced(newPosition);
            return newPosition;
          });
        }, 50); // 50ms throttle
      };
    })(),
    [getDimensions, savePositionDebounced, edgeSide]
  );

  // Check and adjust position when state changes (to handle expansion outside viewport)
  const adjustPositionForState = useCallback(
    (newState: ToastState) => {
      setPosition((current) => {
        const constrained = constrainPosition(current, newState);
        if (constrained.x !== current.x || constrained.y !== current.y) {
          savePositionDebounced(constrained);
          return constrained;
        }
        return current;
      });
    },
    [constrainPosition, savePositionDebounced]
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [handleResize]);

  // Drag handlers (optimized for performance)
  const handleDragHandleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const rect = toastRef.current?.getBoundingClientRect();
      if (!rect) return;

      dragStartTimeRef.current = Date.now();
      setDragState({
        isDragging: true,
        dragOffset: {
          x:
            edgeSide === "left"
              ? e.clientX - rect.left
              : rect.width - (e.clientX - rect.left),
          y: e.clientY - rect.top,
        },
        startPosition: { ...position },
      });

      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    },
    [position, edgeSide]
  );

  const handleDragHandleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      e.stopPropagation();

      const touch = e.touches[0];
      if (!touch) return;

      const rect = toastRef.current?.getBoundingClientRect();
      if (!rect) return;

      dragStartTimeRef.current = Date.now();
      setDragState({
        isDragging: true,
        dragOffset: {
          x:
            edgeSide === "left"
              ? touch.clientX - rect.left
              : rect.width - (touch.clientX - rect.left),
          y: touch.clientY - rect.top,
        },
        startPosition: { ...position },
      });

      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    },
    [position, edgeSide]
  );

  const handleDragHandleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragState.isDragging) return;

      e.preventDefault();
      const newPosition = constrainPosition({
        x:
          edgeSide === "left"
            ? e.clientX - dragState.dragOffset.x
            : window.innerWidth - e.clientX - dragState.dragOffset.x,
        y: e.clientY - dragState.dragOffset.y,
      });

      setPosition(newPosition);
    },
    [dragState.isDragging, dragState.dragOffset, constrainPosition, edgeSide]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!dragState.isDragging) return;

      e.preventDefault();
      const touch = e.touches[0];
      if (!touch) return;

      const newPosition = constrainPosition({
        x:
          edgeSide === "left"
            ? touch.clientX - dragState.dragOffset.x
            : window.innerWidth - touch.clientX - dragState.dragOffset.x,
        y: touch.clientY - dragState.dragOffset.y,
      });

      setPosition(newPosition);
    },
    [dragState.isDragging, dragState.dragOffset, constrainPosition, edgeSide]
  );

  // Auto-snap to nearest edge after drag
  const snapToNearestEdge = useCallback(
    (currentPos: Position): Position => {
      if (typeof window === "undefined") return currentPos;

      const dimensions = getDimensions();
      const margin = 8;
      const topMargin = 72;
      const centerX = currentPos.x + dimensions.width / 2;
      const screenCenter = window.innerWidth / 2;

      // Determine which edge is closer
      const snapToLeft =
        edgeSide === "left" ? centerX < screenCenter : centerX > screenCenter;

      const newSide = snapToLeft ? "left" : "right";

      if (newSide !== edgeSide) {
        currentPos.x = window.innerWidth - currentPos.x - dimensions.width;
        setPosition(currentPos);
      }

      const snappedPosition = {
        // x: snapToLeft ? margin : window.innerWidth - dimensions.width - margin,
        x: margin,
        y: Math.max(
          topMargin,
          Math.min(
            currentPos.y,
            window.innerHeight - dimensions.height - margin
          )
        ),
      };

      // Update edge side state
      setEdgeSide(newSide);

      // Save the new edge side to localStorage
      saveEdgeSideDebounced(newSide);

      return snappedPosition;
    },
    [getDimensions, saveEdgeSideDebounced]
  );

  // Animate position change smoothly
  const animateToPosition = useCallback(
    (targetPos: Position) => {
      if (!toastRef.current) return;

      const startPos = { ...position };
      const distance = Math.sqrt(
        Math.pow(targetPos.x - startPos.x, 2) +
          Math.pow(targetPos.y - startPos.y, 2)
      );

      // Calculate animation duration based on distance (min 200ms, max 600ms)
      const duration = Math.min(600, Math.max(200, distance * 1.5));
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-out cubic)
        const easeOut = 1 - Math.pow(1 - progress, 3);

        const currentPos = {
          x: startPos.x + (targetPos.x - startPos.x) * easeOut,
          y: startPos.y + (targetPos.y - startPos.y) * easeOut,
        };

        setPosition(currentPos);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Ensure final position is exact
          setPosition(targetPos);
          savePositionDebounced(targetPos);
        }
      };

      requestAnimationFrame(animate);
    },
    [position, savePositionDebounced]
  );

  const mouseUpLogic = () => {
    if (!dragState.isDragging) return;

    const dragDistance = Math.sqrt(
      Math.pow(position.x - dragState.startPosition.x, 2) +
        Math.pow(position.y - dragState.startPosition.y, 2)
    );

    setDragState((prev) => ({ ...prev, isDragging: false }));

    // If there was actual movement, snap to edge
    if (dragDistance > 5) {
      const snappedPosition = snapToNearestEdge(position);

      if (
        snappedPosition.x !== position.x ||
        snappedPosition.y !== position.y
      ) {
        animateToPosition(snappedPosition);
      } else {
        savePositionDebounced(position);
      }
    }
  };

  const handleMouseUp = useCallback(
    (e: MouseEvent) => {
      mouseUpLogic();

      e.preventDefault();
      e.stopPropagation();
    },
    [
      dragState.isDragging,
      dragState.startPosition,
      position,
      snapToNearestEdge,
      animateToPosition,
      savePositionDebounced,
    ]
  );

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (!dragState.isDragging) {
        setDragState((prev) => ({ ...prev, isDragging: false }));
        return;
      }

      mouseUpLogic();
    },
    [
      dragState.isDragging,
      dragState.startPosition,
      position,
      snapToNearestEdge,
      animateToPosition,
      savePositionDebounced,
    ]
  );

  // Global mouse event listeners for dragging and hover state management
  useEffect(() => {
    if (dragState.isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
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
    }
  }, [
    dragState.isDragging,
    handleMouseMove,
    handleMouseUp,
    handleTouchMove,
    handleTouchEnd,
  ]);

  // Global mouse move listener to track position for hover validation
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      // Only track when we're in expanded state and might need to validate hover
      if (toastState === "expanded" && toastRef.current) {
        const rect = toastRef.current.getBoundingClientRect();
        const isCurrentlyOver =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;

        // If we think we're hovering but mouse is actually outside, correct the state
        if (isHovered && !isCurrentlyOver) {
          setIsHovered(false);
          // Start collapse timer if we're in expanded state
          if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
          }
          hoverTimeoutRef.current = setTimeout(() => {
            if (toastState === "expanded") {
              setToastState("minimal");
              requestAnimationFrame(() => {
                adjustPositionForState("minimal");
              });
            }
          }, 800);
        }
      }
    };

    // Only add listener when needed
    if (toastState === "expanded") {
      document.addEventListener("mousemove", handleGlobalMouseMove, {
        passive: true,
      });
      return () => {
        document.removeEventListener("mousemove", handleGlobalMouseMove);
      };
    }
  }, [toastState, isHovered, adjustPositionForState]);

  // Colors based on type
  const colors = {
    enter: {
      bg: "bg-info/20",
      bgHover: "bg-info/40",
      bgDetailed: "bg-info/70",
      border: "border-info/30",
      borderHover: "border-info/50",
      button: "bg-info/30",
      buttonHover: "bg-info/50",
      buttonBorder: "border-info/40",
      buttonBorderHover: "border-info/60",
      dot: "bg-success",
      dotClass: "bg-success",
    },
    exit: {
      bg: "bg-warning/20",
      bgHover: "bg-warning/40",
      bgDetailed: "bg-warning/80",
      border: "border-warning/30",
      borderHover: "border-warning/50",
      button: "bg-warning/30",
      buttonHover: "bg-warning/50",
      buttonBorder: "border-warning/40",
      buttonBorderHover: "border-warning/60",
      dot: "bg-error",
      dotClass: "bg-error",
    },
  };

  const color = colors[type];

  // Handle mouse enter with immediate expansion (optimized)
  const handleMouseEnter = useCallback(
    (e: React.MouseEvent) => {
      if (dragState.isDragging) return;

      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      setIsHovered(true);
      if (toastState === "minimal") {
        setToastState("expanded");
        requestAnimationFrame(() => {
          //   adjustPositionForState("expanded");
        });
      }
    },
    [dragState.isDragging, toastState, adjustPositionForState]
  );

  const handleTouchStartExpand = useCallback(
    (e: React.TouchEvent) => {
      if (dragState.isDragging) return;

      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      setIsHovered(true);
      if (toastState === "minimal") {
        setToastState("expanded");
      }
    },
    [dragState.isDragging, toastState]
  );

  // Handle mouse leave with delay (optimized)
  const handleMouseLeave = useCallback(
    (e: React.MouseEvent) => {
      if (dragState.isDragging) return;

      setIsHovered(false);
      hoverTimeoutRef.current = setTimeout(() => {
        if (!toastRef.current) return;

        const rect = toastRef.current.getBoundingClientRect();
        const isStillHovering =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;

        if (!isStillHovering && toastState === "expanded") {
          setToastState("minimal");
          requestAnimationFrame(() => {
            adjustPositionForState("minimal");
          });
        }
      }, 800);
    },
    [dragState.isDragging, toastState, adjustPositionForState]
  );

  // Handle click to toggle detailed state (optimized)
  const handleClick = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      // Ignore clicks on the drag handle
      if (
        dragHandleRef.current &&
        dragHandleRef.current.contains(e.target as Node)
      ) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      const clientX =
        "clientX" in e
          ? e.clientX
          : "changedTouches" in e && e.changedTouches[0]
          ? e.changedTouches[0].clientX
          : 0;
      const clientY =
        "clientY" in e
          ? e.clientY
          : "changedTouches" in e && e.changedTouches[0]
          ? e.changedTouches[0].clientY
          : 0;

      const isTouchEvent = "touches" in e || "changedTouches" in e;

      if (toastState === "minimal") {
        setIsHovered(true);
        setToastState("expanded");

        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
        }

        if (isTouchEvent) {
          hoverTimeoutRef.current = setTimeout(() => {
            setToastState("minimal");
            setIsHovered(false);
            requestAnimationFrame(() => {
              adjustPositionForState("minimal");
            });
          }, 4000);
        }
      } else if (toastState === "detailed") {
        setToastState("expanded");

        requestAnimationFrame(() => {
          adjustPositionForState("expanded");
        });

        // Wait for the transition to complete, then check hover state
        setTimeout(() => {
          if (!toastRef.current) return;

          const rect = toastRef.current.getBoundingClientRect();
          const isStillOver =
            clientX >= rect.left &&
            clientX <= rect.right &&
            clientY >= rect.top &&
            clientY <= rect.bottom;

          if (isTouchEvent) {
            // Mobile: immediately collapse if touch was outside new bounds
            if (!isStillOver) {
              setToastState("minimal");
              setIsHovered(false);
              requestAnimationFrame(() => {
                adjustPositionForState("minimal");
              });
            } else {
              // Touch was inside, set 4 second timer
              if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
              }
              hoverTimeoutRef.current = setTimeout(() => {
                setToastState("minimal");
                setIsHovered(false);
                requestAnimationFrame(() => {
                  adjustPositionForState("minimal");
                });
              }, 4000);
            }
          } else {
            // Desktop: update hover state and start collapse timer if needed
            if (!isStillOver) {
              setIsHovered(false);
              if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
              }
              hoverTimeoutRef.current = setTimeout(() => {
                setToastState("minimal");
                requestAnimationFrame(() => {
                  adjustPositionForState("minimal");
                });
              }, 800);
            } else {
              setIsHovered(true);
            }
          }
        }, 550); // Wait for CSS transition (500ms) + small buffer
      } else {
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
        }
        setToastState("detailed");
        requestAnimationFrame(() => {
          adjustPositionForState("detailed");
        });
      }
    },
    [toastState, adjustPositionForState]
  );

  // Handle button click (memoized)
  const handleButtonClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      window.location.href = url;
    },
    [url]
  );

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (expandTimeoutRef.current) {
        clearTimeout(expandTimeoutRef.current);
      }
    };
  }, []);

  // Memoized style calculations for better performance
  const containerStyle = useMemo(() => {
    const baseStyle: React.CSSProperties = {
      top: `${position.y}px`,
      transform: dragState.isDragging ? "scale(1.05)" : "scale(1)",
      touchAction: "none",
    };

    if (edgeSide === "left") {
      baseStyle.left = `${position.x}px`;
    } else {
      const dimensions = getDimensions();
      const distanceFromRight = position.x;
      baseStyle.right = `${distanceFromRight}px`;
    }

    return baseStyle;
  }, [position.x, position.y, dragState.isDragging, edgeSide, getDimensions]);

  const toastClasses = useMemo(() => {
    const baseClasses =
      "transition-all duration-500 ease-in-out overflow-hidden shadow-lg hover:shadow-xl";
    const sizeClasses = {
      minimal: "w-12 h-12 rounded-4xl backdrop-blur-xs opacity-60",
      expanded: "w-48 h-15 rounded-xl backdrop-blur-sm opacity-100",
      detailed: "w-64 rounded-xl backdrop-blur-lg opacity-100",
    };
    const bgClasses = (() => {
      if (toastState === "detailed") {
        return color.bgDetailed;
      }
      if (isHovered) {
        return color.bgHover;
      }
      return color.bg;
    })();
    const borderClasses = `border ${
      isHovered || toastState === "detailed" ? color.borderHover : color.border
    }`;
    const dragClasses = dragState.isDragging ? "ring-2 ring-white/30" : "";

    return `${baseClasses} ${sizeClasses[toastState]} ${bgClasses} ${borderClasses} ${dragClasses}`;
  }, [
    toastState,
    isHovered,
    color.bg,
    color.bgHover,
    color.border,
    color.borderHover,
    dragState.isDragging,
  ]);

  const toastStyle = useMemo(
    () => ({
      minHeight: toastState === "detailed" ? "auto" : "3rem",
    }),
    [toastState]
  );

  // Memoized button styles for better performance
  const buttonStyle = useMemo(
    () => ({
      backgroundColor: isHovered
        ? type === "enter"
          ? "rgb(59 130 246 / 0.5)"
          : "rgb(245 158 11 / 0.5)"
        : type === "enter"
        ? "rgb(59 130 246 / 0.3)"
        : "rgb(245 158 11 / 0.3)",
      borderColor: isHovered
        ? type === "enter"
          ? "rgb(59 130 246 / 0.6)"
          : "rgb(245 158 11 / 0.6)"
        : type === "enter"
        ? "rgb(59 130 246 / 0.4)"
        : "rgb(245 158 11 / 0.4)",
    }),
    [isHovered, type]
  );

  const detailedButtonStyle = useMemo(
    () => ({
      backgroundColor:
        type === "enter" ? "rgb(59 130 246 / 0.4)" : "rgb(245 158 11 / 0.4)",
      borderColor:
        type === "enter" ? "rgb(59 130 246 / 0.5)" : "rgb(245 158 11 / 0.5)",
    }),
    [type]
  );

  // Memoized button hover handlers to prevent recreation
  const handleDetailedButtonEnter = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.backgroundColor =
        type === "enter" ? "rgb(59 130 246 / 0.6)" : "rgb(245 158 11 / 0.6)";
    },
    [type]
  );

  const handleDetailedButtonLeave = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.backgroundColor =
        type === "enter" ? "rgb(59 130 246 / 0.4)" : "rgb(245 158 11 / 0.4)";
    },
    [type]
  );

  if (!isVisible) return null;

  return (
    <div
      ref={toastRef}
      className={`fixed z-50 duration-500 ease-out select-none ${
        dragState.isDragging ? "transition-none" : "transition-all"
      }`}
      style={containerStyle}
    >
      <div
        className={toastClasses}
        style={toastStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {/* Drag indicator */}
        {(toastState === "expanded" || toastState === "detailed") && (
          <div
            ref={dragHandleRef}
            className="flex justify-center cursor-grab active:cursor-grabbing px-8 py-2 touch-none"
            onMouseDown={handleDragHandleMouseDown}
            onTouchStart={handleDragHandleTouchStart}
            onClick={handleDragHandleClick}
          >
            <div className="w-8 h-1 bg-white/30 hover:bg-white/50 rounded-full transition-colors" />
          </div>
        )}

        {/* Minimal State - Just a circle with dot */}
        {/* {toastState === "minimal" && (
          <div className="w-full flex items-center h-full justify-center">
            <div
              className={`w-3 h-3 ${color.dotClass} rounded-full animate-pulse`}
            />
          </div>
        )} */}

        {/* Expanded State - Title and button */}
        {(toastState === "minimal" || toastState === "expanded") && (
          <div
            className={`flex items-center transition-all ${
              toastState === "expanded" ? "justify-between px-4 pb-2" : ""
            } ${
              toastState === "minimal" ? "w-full justify-center h-full" : ""
            }`}
          >
            <div className="flex items-center space-x-2">
              <div
                className={`${
                  color.dotClass
                } rounded-full animate-pulse transition-all duration-500 ${
                  toastState === "expanded" ? "w-2 h-2" : "w-3 h-3"
                }`}
              />
              {toastState === "expanded" && (
                <span className="text-white/90 font-medium text-sm whitespace-nowrap px-1">
                  {shortTitle}
                </span>
              )}
            </div>
            {toastState === "expanded" && (
              <button
                onClick={handleButtonClick}
                className={`
                flex items-center space-x-1.5 px-3 py-1.5 rounded-lg cursor-pointer
                text-white/90 hover:text-white text-xs font-medium
                transition-all duration-200 ease-in-out
                hover:scale-105 active:scale-95
                ${color.button} hover:${color.buttonHover}
                border ${color.buttonBorder} hover:${color.buttonBorderHover}
              `}
                style={buttonStyle}
                title={title}
              >
                <span>{buttonText}</span>
                {icon}
              </button>
            )}
          </div>
        )}

        {/* Detailed State - Full information */}
        {toastState === "detailed" && (
          <div className="p-4 pt-3 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-2 h-2 ${color.dotClass} rounded-full animate-pulse`}
                />
                <span className="text-white/90 font-semibold text-sm">
                  {title}
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const mouseX = e.clientX;
                  const mouseY = e.clientY;
                  setToastState("expanded");

                  requestAnimationFrame(() => {
                    adjustPositionForState("expanded");
                  });

                  // Wait for transition, then check hover state
                  setTimeout(() => {
                    if (!toastRef.current) return;

                    const rect = toastRef.current.getBoundingClientRect();
                    const isStillOver =
                      mouseX >= rect.left &&
                      mouseX <= rect.right &&
                      mouseY >= rect.top &&
                      mouseY <= rect.bottom;

                    if (!isStillOver) {
                      setIsHovered(false);
                      if (hoverTimeoutRef.current) {
                        clearTimeout(hoverTimeoutRef.current);
                      }
                      hoverTimeoutRef.current = setTimeout(() => {
                        setToastState("minimal");
                        requestAnimationFrame(() => {
                          adjustPositionForState("minimal");
                        });
                      }, 800);
                    } else {
                      setIsHovered(true);
                    }
                  }, 550);
                }}
                className="text-white/60 hover:text-white/90 transition-colors p-1 rounded hover:bg-white/10 cursor-pointer"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <p className="text-white text-xs leading-relaxed text-shadow-2xs">
              {description}
            </p>

            <button
              onClick={handleButtonClick}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg cursor-pointer
                         text-white font-medium text-sm transition-all duration-200 ease-in-out
                         hover:scale-[1.02] active:scale-[0.98] border group"
              style={detailedButtonStyle}
              onMouseEnter={handleDetailedButtonEnter}
              onMouseLeave={handleDetailedButtonLeave}
            >
              <span>{buttonText}</span>
              <div className="transition-transform duration-200 group-hover:translate-x-1">
                {icon}
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
