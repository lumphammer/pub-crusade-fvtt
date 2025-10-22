import { useCallback, useEffect, useRef, useState } from "react";

type UseScrollAndFocusArgs = {
  selector?: string;
};

export const useScrollAndFocus = ({
  selector = "input[role=text-input]",
}: UseScrollAndFocusArgs = {}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const [shouldScroll, setShouldScroll] = useState(false);

  const triggerScroll = useCallback(() => {
    setShouldScroll(true);
  }, []);

  useEffect(() => {
    if (shouldScroll) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShouldScroll(false);
      // find the last input element and scroll it into view
      const inputs = scrollerRef.current?.querySelectorAll(selector);
      const lastInput = inputs?.[inputs.length - 1] as HTMLInputElement;
      lastInput?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        lastInput?.focus();
      }, 200);
    }
  }, [selector, shouldScroll]);

  return {
    scrollerRef,
    triggerScroll,
  };
};
