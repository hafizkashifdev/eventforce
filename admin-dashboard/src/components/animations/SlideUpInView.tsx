'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Box, BoxProps } from '@mui/material';

interface SlideUpInViewProps extends BoxProps {
  children: React.ReactNode;
  initialY?: number;
  duration?: number;
  delay?: number;
  threshold?: number;
}

const SlideUpInView: React.FC<SlideUpInViewProps> = ({
  children,
  initialY = 30,
  duration = 0.6,
  delay = 0,
  threshold = 0.1,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay * 1000);
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [delay, threshold]);

  return (
    <Box
      ref={elementRef}
      sx={{
        transform: isVisible ? 'translateY(0)' : `translateY(${initialY}px)`,
        opacity: isVisible ? 1 : 0,
        transition: `all ${duration}s ease-out`,
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default SlideUpInView;
