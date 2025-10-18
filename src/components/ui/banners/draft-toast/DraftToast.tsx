"use client";

import React, { useCallback, useMemo, useRef } from "react";
import { COLORS } from "./constants";
import { DraftToastProps } from "./types";
import { useDragHandlers } from "./useDragHandlers";
import {
  usePersistedEdgeSide,
  usePersistedPosition,
} from "./usePersistedState";
import { useToastState } from "./useToastState";

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
  const { position, setPosition, savePosition } = usePersistedPosition();
  const { edgeSide, setEdgeSide, saveEdgeSide } = usePersistedEdgeSide();

  const toastRef = useRef<HTMLDivElement>(null);
  const dragHandleRef = useRef<HTMLDivElement>(null);

  const {
    toastState,
    isHovered,
    handleMouseEnter,
    handleMouseLeave,
    handleClick: handleToastClick,
    handleTransitionToExpanded,
    clearHoverTimeout,
  } = useToastState({
    toastRef,
    isDragging: false,
    position,
    setPosition,
    savePosition,
  });

  const { dragState, handleDragStart } = useDragHandlers({
    position,
    setPosition,
    savePosition,
    edgeSide,
    setEdgeSide,
    saveEdgeSide,
    toastRef,
    onDragStart: clearHoverTimeout,
  });

  const color = COLORS[type];

  const handleDragHandleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      handleDragStart(e.clientX, e.clientY);
    },
    [handleDragStart]
  );

  const handleDragHandleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      e.stopPropagation();
      const touch = e.touches[0];
      if (touch) handleDragStart(touch.clientX, touch.clientY);
    },
    [handleDragStart]
  );

  const handleDragHandleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
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
      handleToastClick(clientX, clientY, isTouchEvent);
    },
    [handleToastClick]
  );

  const handleButtonClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      window.location.href = url;
    },
    [url]
  );

  const handleCloseButtonClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      handleTransitionToExpanded(e.clientX, e.clientY, false);
    },
    [handleTransitionToExpanded]
  );

  const containerStyle = useMemo(() => {
    const baseStyle: React.CSSProperties = {
      top: `${position.y}px`,
      transform: dragState.isDragging ? "scale(1.05)" : "scale(1)",
      touchAction: "none",
    };

    if (edgeSide === "left") {
      baseStyle.left = `${position.x}px`;
    } else {
      baseStyle.right = `${position.x}px`;
    }

    return baseStyle;
  }, [position.x, position.y, dragState.isDragging, edgeSide]);

  const toastClasses = useMemo(() => {
    const baseClasses =
      "transition-all duration-500 ease-in-out overflow-hidden shadow-lg hover:shadow-xl";
    const sizeClasses = {
      minimal: "w-12 h-12 rounded-4xl backdrop-blur-xs opacity-60",
      expanded: "w-48 h-15 rounded-xl backdrop-blur-sm opacity-100",
      detailed: "w-64 rounded-xl backdrop-blur-lg opacity-100",
    };
    const bgClasses =
      toastState === "detailed"
        ? color.bgDetailed
        : isHovered
        ? color.bgHover
        : color.bg;
    const borderClasses = `border ${
      isHovered || toastState === "detailed" ? color.borderHover : color.border
    }`;
    const dragClasses = dragState.isDragging ? "ring-2 ring-white/30" : "";

    return `${baseClasses} ${sizeClasses[toastState]} ${bgClasses} ${borderClasses} ${dragClasses}`;
  }, [toastState, isHovered, color, dragState.isDragging]);

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
        style={{
          minHeight: toastState === "detailed" ? "auto" : "3rem",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
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
                onClick={handleCloseButtonClick}
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
