'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { FleetGridSkeleton, HeroSkeleton, PageContentSkeleton } from './LoadingSkeleton';

// Lazy load heavy components with optimized loading
export const LazyFleetSection = dynamic(() => import('./FleetSection'), {
  loading: () => <FleetGridSkeleton count={4} />,
  ssr: false,
});

export const LazyFleetPage = dynamic(() => import('./FleetPage'), {
  loading: () => <PageContentSkeleton />,
  ssr: false,
});

export const LazyTestimonialsSection = dynamic(() => import('./TestimonialsSection'), {
  loading: () => <PageContentSkeleton />,
  ssr: false,
});

export const LazyBenefitsSection = dynamic(() => import('./BenefitsSection'), {
  loading: () => <PageContentSkeleton />,
  ssr: false,
});

export const LazyContactSection = dynamic(() => import('./ContactSection'), {
  loading: () => <PageContentSkeleton />,
  ssr: false,
});

// Lazy load booking page components
export const LazyBookingPage = dynamic(() => import('@/app/(pages)/booking/page'), {
  loading: () => <PageContentSkeleton />,
  ssr: false,
});

// Lazy load other heavy pages
export const LazyOurFleetPage = dynamic(() => import('@/app/(pages)/our-fleet/page'), {
  loading: () => <PageContentSkeleton />,
  ssr: false,
});

// Wrapper components with Suspense
export const SuspenseFleetSection = () => (
  <Suspense fallback={<FleetGridSkeleton count={4} />}>
    <LazyFleetSection />
  </Suspense>
);

export const SuspenseFleetPage = () => (
  <Suspense fallback={<PageContentSkeleton />}>
    <LazyFleetPage />
  </Suspense>
);

export const SuspenseTestimonialsSection = () => (
  <Suspense fallback={<PageContentSkeleton />}>
    <LazyTestimonialsSection />
  </Suspense>
);

export const SuspenseBenefitsSection = () => (
  <Suspense fallback={<PageContentSkeleton />}>
    <LazyBenefitsSection />
  </Suspense>
);

export const SuspenseContactSection = () => (
  <Suspense fallback={<PageContentSkeleton />}>
    <LazyContactSection />
  </Suspense>
);

