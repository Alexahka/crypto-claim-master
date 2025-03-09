
import { useEffect, useState } from 'react';

// Animation states for components
export type AnimationState = 'initial' | 'animate' | 'exit';

// Hook for delayed visibility (used for staggered animations)
export const useDelayedAppear = (delay: number = 0): boolean => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  return isVisible;
};

// Hook for component mount animation
export const useMountAnimation = (initialDelay: number = 0): AnimationState => {
  const [animationState, setAnimationState] = useState<AnimationState>('initial');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationState('animate');
    }, initialDelay);
    
    return () => clearTimeout(timer);
  }, [initialDelay]);
  
  return animationState;
};

// Motion variants for staggered child animations
export const staggeredChildVariants = {
  initial: { opacity: 0, y: 20 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
      ease: [0.4, 0.0, 0.2, 1],
    },
  }),
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

// Utility for creating wave animation timing
export const createWaveAnimation = (total: number, delay: number = 0.05) => {
  return Array.from({ length: total }).map((_, i) => ({
    delay: i * delay + 0.1,
  }));
};
