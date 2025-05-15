/**
 * This file provides named exports for framer-motion components
 * to work around the "export *" issue in Next.js 14 client components
 */

// Import specific components from framer-motion with named exports
import {
  motion,
  AnimatePresence,
  useAnimation,
  useMotionValue,
  useTransform,
  useScroll,
  useInView,
  animate,
  m,
  LazyMotion,
  domAnimation,
  MotionConfig
} from 'framer-motion';

// Re-export them individually to avoid "export *" pattern
export {
  motion,
  AnimatePresence,
  useAnimation,
  useMotionValue,
  useTransform,
  useScroll,
  useInView,
  animate,
  m,
  LazyMotion,
  domAnimation,
  MotionConfig
};
