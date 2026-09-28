import { useEffect, useState } from "react";

export const useHeroCarousel = (length: number) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex((prev) => (length > 0 ? prev % length : 0));
  }, [length]);

  useEffect(() => {
    if (length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % length);
    }, 6000);

    return () => clearInterval(interval);
  }, [length]);

  const next = () => {
    if (length > 1) {
      setActiveIndex((prev) => (prev + 1) % length);
    }
  };
  const prev = () =>
    length > 1 && setActiveIndex((index) => (index - 1 + length) % length);

  return {
    activeIndex,
    setActiveIndex,
    next,
    prev,
  };
};