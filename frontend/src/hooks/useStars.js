import { useState } from "react";

export const useStars = (initialValue = 0) => {
  const [rating, setRating] = useState(initialValue);
  const [hover, setHover] = useState(0);

  const reset = () => {
    setRating(0);
    setHover(0);
  };

  return {
    value: rating,
    hover,
    setRating,
    setHover,
    reset,
  };
};
