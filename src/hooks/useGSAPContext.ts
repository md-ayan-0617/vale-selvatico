import { useLayoutEffect, useRef, type DependencyList } from 'react';
import gsap from 'gsap';

export const useGSAPContext = (
  effect: (ctx: gsap.Context) => void | (() => void),
  scopeOrDeps?: React.RefObject<any> | DependencyList,
  deps: DependencyList = []
) => {
  const ctxRef = useRef<gsap.Context | null>(null);
  const isArray = Array.isArray(scopeOrDeps);
  const actualScope = isArray ? undefined : (scopeOrDeps as React.RefObject<any> | undefined);
  const actualDeps = isArray ? scopeOrDeps : deps;

  useLayoutEffect(() => {
    const scopeElement = actualScope?.current || undefined;
    const ctx = gsap.context((self) => {
      effect(self);
    }, scopeElement);

    ctxRef.current = ctx;

    return () => {
      ctx.revert();
      ctxRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, actualDeps);

  return ctxRef;
};
