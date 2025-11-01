"use client";

import * as React from "react";

type UseMobileOptions = {
  defaultValue?: boolean;
  initializeWithValue?: boolean;
};

function useMobile(
  breakpoint: number = 768,
  options: UseMobileOptions = {}
): boolean {
  const { defaultValue = false, initializeWithValue = true } = options;

  const getMatches = React.useCallback(
    (breakpoint: number): boolean => {
      if (typeof window === "undefined") {
        return defaultValue;
      }
      return window.innerWidth < breakpoint;
    },
    [defaultValue]
  );

  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(breakpoint);
    }
    return defaultValue;
  });

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    if (!initializeWithValue) {
      setIsMobile(window.innerWidth < breakpoint);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint, initializeWithValue]);

  return isMobile;
}

export { useMobile };
export type { UseMobileOptions };
