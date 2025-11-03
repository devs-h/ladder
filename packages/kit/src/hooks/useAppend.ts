import { useEffect, useRef } from "react";

export function useAppend<T extends HTMLElement>({ el }: { el?: HTMLElement }) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!el) return;

    ref.current?.append(el);
  }, [el]);
  return ref;
}
