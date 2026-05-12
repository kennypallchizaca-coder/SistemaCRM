import { useCallback, useEffect, useRef, useState } from 'react';

type ScrollDirection = 'left' | 'right';

const EDGE_TOLERANCE_PX = 4;
const SINGLE_ITEM_NUDGE_PX = 14;
const SINGLE_ITEM_NUDGE_DURATION_MS = 320;
const LOOP_SLIDE_DURATION_MS = 480;
const LOOP_EASING = 'cubic-bezier(0.22, 1, 0.36, 1)';

export function getLoopedItems<T>(items: T[], offset: number): T[] {
  if (items.length <= 1) return items;

  const normalizedOffset = ((offset % items.length) + items.length) % items.length;
  if (normalizedOffset === 0) return items;

  return [...items.slice(normalizedOffset), ...items.slice(0, normalizedOffset)];
}

export function useCarouselControls<T extends HTMLElement>(itemCount = 0) {
  const scrollRef = useRef<T>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const isAnimatingRef = useRef(false);
  const timersRef = useRef<number[]>([]);
  const [loopOffset, setLoopOffset] = useState(0);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((timerId) => window.clearTimeout(timerId));
    timersRef.current = [];
  }, []);

  const getCardStep = useCallback((element: T): number => {
    const firstCard = element.firstElementChild as HTMLElement | null;
    const styles = window.getComputedStyle(element);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || '0') || 0;
    return firstCard
      ? firstCard.getBoundingClientRect().width + gap
      : element.clientWidth * 0.85;
  }, []);

  const nudgeSingleItem = useCallback((direction: ScrollDirection) => {
    const element = scrollRef.current;
    if (!element || isAnimatingRef.current) return;

    clearTimers();
    isAnimatingRef.current = true;
    setIsAnimating(true);
    element.animate(
      [
        { transform: 'translate3d(0, 0, 0)' },
        { transform: `translate3d(${direction === 'left' ? SINGLE_ITEM_NUDGE_PX : -SINGLE_ITEM_NUDGE_PX}px, 0, 0)` },
        { transform: 'translate3d(0, 0, 0)' },
      ],
      {
        duration: SINGLE_ITEM_NUDGE_DURATION_MS,
        easing: LOOP_EASING,
      }
    );

    timersRef.current = [
      window.setTimeout(() => {
        isAnimatingRef.current = false;
        setIsAnimating(false);
      }, SINGLE_ITEM_NUDGE_DURATION_MS),
    ];
  }, [clearTimers]);

  const rotateItems = useCallback((direction: ScrollDirection) => {
    if (itemCount <= 1) {
      nudgeSingleItem(direction);
      return;
    }

    if (isAnimatingRef.current) return;

    const element = scrollRef.current;
    if (!element) return;

    const previousRects = new Map<string, DOMRect>();
    Array.from(element.children).forEach((child, index) => {
      const childElement = child as HTMLElement;
      previousRects.set(childElement.dataset.carouselId ?? String(index), childElement.getBoundingClientRect());
    });

    clearTimers();
    isAnimatingRef.current = true;
    setIsAnimating(true);
    setLoopOffset((currentOffset) => (
      direction === 'left'
        ? (currentOffset - 1 + itemCount) % itemCount
        : (currentOffset + 1) % itemCount
    ));

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        Array.from(element.children).forEach((child, index) => {
          const childElement = child as HTMLElement;
          const carouselId = childElement.dataset.carouselId ?? String(index);
          const previousRect = previousRects.get(carouselId);
          if (!previousRect) return;

          const nextRect = childElement.getBoundingClientRect();
          const deltaX = previousRect.left - nextRect.left;
          const deltaY = previousRect.top - nextRect.top;

          childElement.animate(
            [
              { transform: `translate3d(${deltaX}px, ${deltaY}px, 0)` },
              { transform: 'translate3d(0, 0, 0)' },
            ],
            {
              duration: LOOP_SLIDE_DURATION_MS,
              easing: LOOP_EASING,
              fill: 'both',
            }
          );
        });
      });
    });

    timersRef.current = [
      window.setTimeout(() => {
        isAnimatingRef.current = false;
        setIsAnimating(false);
      }, LOOP_SLIDE_DURATION_MS),
    ];
  }, [clearTimers, itemCount, nudgeSingleItem]);

  const scroll = useCallback((direction: ScrollDirection) => {
    const element = scrollRef.current;
    if (!element) return;

    const maxScrollLeft = element.scrollWidth - element.clientWidth;
    if (maxScrollLeft <= EDGE_TOLERANCE_PX) {
      rotateItems(direction);
      return;
    }

    const cardStep = getCardStep(element);
    const scrollAmount = Math.min(Math.max(cardStep, 240), element.clientWidth * 0.9);
    const isAtStart = element.scrollLeft <= EDGE_TOLERANCE_PX;
    const isAtEnd = element.scrollLeft >= maxScrollLeft - EDGE_TOLERANCE_PX;

    if (direction === 'left' && isAtStart) {
      element.scrollTo({ left: maxScrollLeft, behavior: 'smooth' });
      return;
    }

    if (direction === 'right' && isAtEnd) {
      element.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }

    element.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  }, [getCardStep, rotateItems]);

  useEffect(() => {
    return clearTimers;
  }, [clearTimers]);

  return {
    scrollRef,
    scroll,
    loopOffset,
    isAnimating,
  };
}
