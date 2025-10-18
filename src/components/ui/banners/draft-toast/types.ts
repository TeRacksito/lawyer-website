export type ToastState = "minimal" | "expanded" | "detailed";
export type EdgeSide = "left" | "right";

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

export interface Position {
  x: number;
  y: number;
}

export interface DragState {
  isDragging: boolean;
  dragOffset: Position;
  startPosition: Position;
}

export interface ToastDimensions {
  width: number;
  height: number;
}

export interface ToastColors {
  bg: string;
  bgHover: string;
  bgDetailed: string;
  border: string;
  borderHover: string;
  button: string;
  buttonHover: string;
  buttonBorder: string;
  buttonBorderHover: string;
  dot: string;
  dotClass: string;
}
