'use client';

import { useEffect } from 'react';

interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
}

const PerformanceMonitor: React.FC = () => {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return;

    // Performance observer for Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const metric = entry as PerformanceEntry & { value?: number };
        
        // Log performance metrics
        if (metric.value !== undefined) {
          console.log(`${metric.name}: ${metric.value.toFixed(2)}ms`);
          
          // Send to analytics (replace with your analytics service)
          if (typeof window !== 'undefined' && 'gtag' in window) {
            (window as any).gtag('event', 'web_vitals', {
              event_category: 'Performance',
              event_label: metric.name,
              value: Math.round(metric.value),
            });
          }
        }
      }
    });

    // Observe different performance entry types
    try {
      observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift'] });
    } catch (error) {
      console.warn('Performance Observer not supported:', error);
    }

    // Monitor resource loading
    const resourceObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const resource = entry as PerformanceResourceTiming;
        
        // Log slow resources (> 1 second)
        if (resource.duration > 1000) {
          console.warn(`Slow resource: ${resource.name} took ${resource.duration.toFixed(2)}ms`);
        }
      }
    });

    try {
      resourceObserver.observe({ entryTypes: ['resource'] });
    } catch (error) {
      console.warn('Resource Performance Observer not supported:', error);
    }

    // Monitor navigation timing
    const navigationObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const nav = entry as PerformanceNavigationTiming;
        
        const metrics: PerformanceMetrics = {
          ttfb: nav.responseStart - nav.requestStart,
          fcp: 0, // Will be set by paint observer
          lcp: 0, // Will be set by LCP observer
          fid: 0, // Will be set by FID observer
          cls: 0, // Will be set by CLS observer
        };

        console.log('Navigation timing:', {
          domContentLoaded: nav.domContentLoadedEventEnd - nav.domContentLoadedEventStart,
          loadComplete: nav.loadEventEnd - nav.loadEventStart,
          ttfb: metrics.ttfb,
        });
      }
    });

    try {
      navigationObserver.observe({ entryTypes: ['navigation'] });
    } catch (error) {
      console.warn('Navigation Performance Observer not supported:', error);
    }

    // Cleanup observers
    return () => {
      observer.disconnect();
      resourceObserver.disconnect();
      navigationObserver.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceMonitor;

