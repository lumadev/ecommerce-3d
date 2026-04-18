import { useEffect, useState } from "react";

export const useHeroCarousel = (length: number) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % length);
    }, 6000);

    return () => clearInterval(interval);
  }, [length]);

  const next = () => setActiveIndex((prev) => (prev + 1) % length);
  const prev = () =>
    setActiveIndex((prev) => (prev - 1 + length) % length);

  return {
    activeIndex,
    setActiveIndex,
    next,
    prev,
  };
};