'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Box, BoxProps } from '@mui/material';

interface ScaleInViewProps extends BoxProps {
  children: React.ReactNode;
  initialScale?: number;
  duration?: number;
  delay?: number;
  threshold?: number;
}

const ScaleInView: React.FC<ScaleInViewProps> = ({
  children,
  initialScale = 0.8,
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
        transform: isVisible ? 'scale(1)' : `scale(${initialScale})`,
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

export default ScaleInView;
