import React, { useEffect, useRef } from 'react';
import { motion, useInView, useSpring } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
}

function AnimatedCounter({ value, duration = 2 }: AnimatedCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref);
  
  const springValue = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  return (
    <motion.span ref={ref}>
      {springValue.get().toFixed(0)}
    </motion.span>
  );
}

export default AnimatedCounter;