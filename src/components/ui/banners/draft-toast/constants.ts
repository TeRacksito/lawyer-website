import { Position, ToastColors } from "./types";

export const DEFAULT_POSITION: Position = { x: 8, y: 72 };

export const STORAGE_KEYS = {
  position: "draft-toast-position",
  edge: "draft-toast-edge",
} as const;

export const MARGINS = {
  edge: 8,
  top: 72,
} as const;

export const TIMINGS = {
  hoverDelay: 800,
  mobileAutoCollapse: 4000,
  transitionWait: 550,
  debounce: 100,
  throttle: 50,
} as const;

export const COLORS: Record<"enter" | "exit", ToastColors> = {
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
