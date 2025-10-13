import { useState, useEffect } from "react";
import { useThrottle } from "@/shared/lib";

type BreakpointConfig = {
  width: number;
  items: number;
};

type UseItemsPerSlideOptions = {
  breakpoints?: BreakpointConfig[];
  defaultItems?: number;
  throttleInterval?: number;
};

export function useItemsPerSlide({
  breakpoints = [
    { width: 1920, items: 5 }, // 3xl
    { width: 1366, items: 4 }, // 2xl
    { width: 1020, items: 3 }, // xl
    { width: 880, items: 4 }, // lg
    { width: 720, items: 4 }, // md
    { width: 520, items: 3 }, // sm
    { width: 360, items: 2 }, // xs
  ],
  defaultItems = 2,
  throttleInterval = 100,
}: UseItemsPerSlideOptions = {}): number {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  const throttledWidth = useThrottle(width, throttleInterval);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sorted = [...breakpoints].sort((a, b) => b.width - a.width);

  for (const bp of sorted) {
    if (throttledWidth >= bp.width) return bp.items;
  }

  return defaultItems;
}
