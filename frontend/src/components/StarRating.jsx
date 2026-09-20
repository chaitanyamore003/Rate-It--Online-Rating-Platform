import React, { useState } from "react";
import { Star } from "lucide-react";

const StarRating = ({ initialRating, onRate, readonly = false }) => {
  // Local state — the currently committed rating (persists between renders).
  const [rating, setRating] = useState(initialRating || 0);

  // Hover preview — only used while the cursor is over a star. When it's 0,
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseEnter = (index) => {
    if (!readonly) setHoverRating(index);
  };

  const handleMouseLeave = () => {
    if (!readonly) setHoverRating(0);
  };

  const handleClick = (index) => {
    if (readonly) return;

    setRating(index);
    if (onRate) onRate(index);
  };

  return (
    // onMouseLeave lives on the wrapper so that moving between stars doesn't
    // briefly reset the preview to 0 (which would cause flicker).
    <div
      className="flex items-center gap-0.5"
      onMouseLeave={handleMouseLeave}
      role={readonly ? "img" : "radiogroup"}
      aria-label={readonly ? `Rating: ${rating} out of 5` : "Rate this item"}
    >
      {[1, 2, 3, 4, 5].map((index) => {
        const isFilled = index <= (hoverRating || rating);

        return (
          <button
            key={index}
            type="button"
            disabled={readonly}
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            className={`rounded-sm outline-none transition focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 ${
              readonly ? "cursor-default" : "cursor-pointer"
            }`}
            aria-label={`${index} star${index > 1 ? "s" : ""}`}
            aria-pressed={isFilled}
          >
            <Star
              size={22}
              className={`transition ${
                isFilled ? "fill-current text-neutral-900" : "text-neutral-300"
              } ${
                !readonly && !isFilled ? "group-hover:text-neutral-400" : ""
              }`}
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
