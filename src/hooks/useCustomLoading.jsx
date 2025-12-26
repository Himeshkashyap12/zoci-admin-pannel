import { useEffect, useRef } from "react";

const useInfiniteScrollObserver = (onLoadMore, options = {}) => {
  const observerRef = useRef(null);
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (!onLoadMore) return;

    const { root = null, rootMargin = "50px", threshold = 0, enabled = true } = options;
    if (!enabled) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {        
        if (entry.isIntersecting) {
          onLoadMore();
        }
      });
    }, { root, rootMargin, threshold });

    observerRef.current = observer;    
    const currentSentinel = sentinelRef.current;
    if (currentSentinel) observer.observe(currentSentinel);

    return () => {
      if (currentSentinel) observer.unobserve(currentSentinel);
      observer.disconnect();
    };
  }, [onLoadMore, JSON.stringify(options)]); // re-create if onLoadMore or options change

  return sentinelRef;
};

export default useInfiniteScrollObserver;
