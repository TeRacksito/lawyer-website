"use client";

import { useState, useRef, useEffect } from "react";
import EmojiPicker, { Categories, EmojiStyle } from "emoji-picker-react";
import React from "react";
import { createRoot } from "react-dom/client";

React;

interface EmojiTextInputProps {
  input: {
    name: string;
    value: string;
    onChange: (value: string) => void;
    onBlur: () => void;
    onFocus: () => void;
  };
  field?: {
    label?: string;
    description?: string;
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
  const pickerRef = useRef<HTMLDivElement>(null);

  const handleEmojiSelect = (emojiData: { emoji: string }) => {
    input.onChange(input.value + emojiData.emoji);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    input.onChange(e.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
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
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <div className="flex-1">
          <input
            {...input}
            type="text"
            value={input.value || ""}
            onChange={handleInputChange}
            placeholder={field?.description || "Enter text or select emoji"}
            className="input input-bordered w-full"
          />
        </div>
        <button
          type="button"
          onClick={() => setShowPicker(!showPicker)}
          className="btn btn-icon btn-outline"
          title="Toggle emoji picker"
        >
          😊
        </button>
      </div>

      {showPicker && (
        <div ref={pickerRef} className="relative">
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
