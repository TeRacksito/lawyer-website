# DraftToast Component

A draggable, expandable toast notification component for draft mode indication.

## Structure

The component has been refactored into a modular structure for better maintainability:

```
draft-toast/
├── DraftToast.tsx          # Main component
├── index.ts                # Public exports
├── types.ts                # TypeScript type definitions
├── constants.ts            # Configuration constants
├── utils.ts                # Pure utility functions
├── usePersistedState.ts    # Position & edge persistence hooks
├── useDragHandlers.ts      # Drag functionality hook
└── useToastState.ts        # Toast state management hook
```

## Files

### `types.ts`
Defines all TypeScript interfaces and types used across the component.

### `constants.ts`
Contains configuration values:
- `DEFAULT_POSITION`: Initial toast position
- `STORAGE_KEYS`: LocalStorage key names
- `MARGINS`: Edge and top margins
- `TIMINGS`: Animation and delay durations
- `COLORS`: Color schemes for enter/exit types

### `utils.ts`
Pure utility functions:
- `getDimensions()`: Returns dimensions for each toast state
- `constrainPosition()`: Keeps toast within viewport bounds
- `isPointInRect()`: Checks if a point is inside a rectangle
- `calculateDragDistance()`: Calculates distance between two positions

### `usePersistedState.ts`
Custom hooks for state persistence:
- `usePersistedPosition()`: Manages toast position with localStorage
- `usePersistedEdgeSide()`: Manages edge side preference with localStorage

### `useDragHandlers.ts`
Handles all drag-related functionality:
- Mouse and touch event handlers
- Position snapping to edges
- Smooth position animations
- Global event listener management

### `useToastState.ts`
Manages toast state transitions:
- State changes (minimal → expanded → detailed)
- Hover detection and auto-collapse
- Transition timing and coordination
- Mobile vs desktop behavior differences

### `DraftToast.tsx`
Main component that orchestrates all hooks and renders the UI.

## Usage

```tsx
import DraftToast from "./DraftToast";

<DraftToast
  type="enter"
  url="/api/draft/enter"
  title="Draft Mode Available"
  shortTitle="Draft"
  description="Enable preview mode..."
  buttonText="Enter"
  icon={<ArrowIcon />}
  isVisible={true}
/>
```

## Features

- **Three States**: minimal (dot), expanded (title + button), detailed (full info)
- **Draggable**: Via drag handle bar
- **Edge Snapping**: Auto-snaps to left edge (currently disabled for right edge)
- **Persistent Position**: Saves position and edge preference to localStorage
- **Mobile Support**: Touch events with tap-to-expand
- **Responsive**: Adjusts on window resize
- **Smooth Animations**: Position transitions with easing

## Key Behaviors

### Desktop
- Hover to expand from minimal to expanded
- Click to toggle between expanded and detailed
- Auto-collapse after leaving hover for 800ms

### Mobile
- Tap to expand
- Auto-collapse after 4 seconds
- Immediate collapse if touch is outside bounds after transition

## Customization

Modify constants in `constants.ts`:
- `MARGINS.top`: Adjust top boundary (default: 72px)
- `TIMINGS.hoverDelay`: Change hover collapse delay
- `TIMINGS.mobileAutoCollapse`: Change mobile auto-collapse time
- `COLORS`: Customize color schemes
