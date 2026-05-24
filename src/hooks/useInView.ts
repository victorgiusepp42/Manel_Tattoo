import { useEffect, useState, type RefObject } from "react";

type Options = {
  rootMargin?: string;
  once?: boolean;
};

/** IntersectionObserver leve — útil para lazy preload sem bloquear scroll. */
export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  { rootMargin = "240px", once = true }: Options = {},
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setInView(true);
        if (once) io.disconnect();
      },
      { rootMargin },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin, once]);

  return inView;
}
