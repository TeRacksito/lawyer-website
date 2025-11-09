"use client";

import { useState, useRef, useEffect } from "react";
import EmojiPicker, { Categories, EmojiStyle } from "emoji-picker-react";
import React from "react";
import { createRoot } from "react-dom/client";

React;

interface EmojiTextInputProps {
  field: {
    label?: string;
    description?: string;
    namespace: string[];
  };
  input: {
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (event?: React.FocusEvent<HTMLInputElement>) => void;
    onFocus: (event?: React.FocusEvent<HTMLInputElement>) => void;
  };
}

function ShadowWrapper({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<ReturnType<typeof createRoot> | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // Only attach shadow root if it doesn't already exist
    let shadow = host.shadowRoot;
    if (!shadow) {
      shadow = host.attachShadow({ mode: "open" });
    }

    const container = document.createElement("div");
    container.className = className;
    shadow.appendChild(container);

    rootRef.current = createRoot(container);
    rootRef.current.render(children);

    return () => {
      // Clear the container before unmounting to avoid race conditions
      if (rootRef.current) {
        rootRef.current.unmount();
        rootRef.current = null;
      }
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
    };
  }, [children, className]);

  return <div ref={hostRef} />;
}

/**
 * Custom Tina field component that combines a text input with an emoji picker.
 * Users can type text directly or select an emoji from the picker.
 */
export default function EmojiTextInput({ input, field }: EmojiTextInputProps) {
  const [showPicker, setShowPicker] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleEmojiSelect = (emojiData: { emoji: string }) => {
    const newValue = input.value + emojiData.emoji;
    const event = {
      target: { value: newValue },
    } as React.ChangeEvent<HTMLInputElement>;
    input.onChange(event);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    input.onChange(e);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowPicker(false);
      }
    };

    if (showPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPicker]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-4 bg-gradient-to-br from-base-50 to-base-100 p-6 rounded-xl border border-base-200 shadow-sm"
    >
      {(field?.label || field?.description) && (
        <div className="pb-4 border-b border-base-300/50">
          {field?.label && (
            <h3 className="text-sm font-semibold text-base-content mb-1">
              {field.label}
            </h3>
          )}
          {field?.description && (
            <p className="text-xs text-base-content/70 leading-relaxed">
              {field.description}
            </p>
          )}
        </div>
      )}

      <div className="space-y-3">
        <div className="relative">
          <input
            {...input}
            type="text"
            value={input.value || ""}
            onChange={handleInputChange}
            placeholder="Ingresa texto o selecciona emoji"
            className="input input-bordered w-full p-2"
          />
          <button
            type="button"
            onClick={() => setShowPicker(!showPicker)}
            className={`absolute right-3 top-1/2 -translate-y-1/2 text-2xl transition-transform duration-200 ${
              showPicker ? "scale-125" : "hover:scale-110"
            }`}
            title="Abrir selector de emoji"
          >
            😊
          </button>
        </div>
      </div>

      {showPicker && (
        <div className="pt-4 border-t border-base-300">
          <ShadowWrapper>
            <EmojiPicker
              onEmojiClick={handleEmojiSelect}
              width="100%"
              height={450}
              emojiStyle={EmojiStyle.NATIVE}
              categories={[
                { category: Categories.SUGGESTED, name: "Sugeridos" },
                {
                  category: Categories.SMILEYS_PEOPLE,
                  name: "Caras y personas",
                },
                {
                  category: Categories.ANIMALS_NATURE,
                  name: "Animales y naturaleza",
                },
                { category: Categories.FOOD_DRINK, name: "Comida y bebida" },
                {
                  category: Categories.TRAVEL_PLACES,
                  name: "Viajes y lugares",
                },
                { category: Categories.ACTIVITIES, name: "Actividades" },
                { category: Categories.OBJECTS, name: "Objetos" },
                { category: Categories.SYMBOLS, name: "Símbolos" },
                { category: Categories.FLAGS, name: "Banderas" },
              ]}
              searchPlaceHolder="Buscar"
            />
          </ShadowWrapper>
        </div>
      )}
    </div>
  );
}
