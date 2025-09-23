import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import ThemeProvider from '@/components/ThemeProvider';
import { AuthProvider } from '@/contexts/AuthContext';
import SEOHead from '@/components/SEOHead';
import PerformanceMonitor from '@/components/PerformanceMonitor';
import { SEO } from '@/constants/theme';
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: SEO.defaultTitle,
  description: SEO.defaultDescription,
  keywords: SEO.keywords,
  authors: [{ name: SEO.siteName }],
  creator: SEO.siteName,
  publisher: SEO.siteName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { rel: "icon", url: "/favicon.ico", type: "image/x-icon" },
      {
        rel: "icon",
        url: "/favicon-16x16.png",
        type: "image/png",
        sizes: "16x16",
      },
      {
        rel: "icon",
        url: "/favicon-32x32.png",
        type: "image/png",
        sizes: "32x32",
      },
    ],
    apple: {
      rel: "apple-touch-icon",
      url: "/apple-touch-icon.png",
      type: "image/png",
      sizes: "180x180",
    },
  },
  openGraph: {
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
    url: SEO.siteUrl,
    type: "website",
    locale: "en_US",
    siteName: SEO.siteName,
    images: [
      {
        url: `${SEO.siteUrl}/og.png`,
        type: "image/png",
        width: 1200,
        height: 630,
        alt: SEO.defaultTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
    images: [`${SEO.siteUrl}/og.png`],
  },
  alternates: {
    canonical: SEO.siteUrl,
  },
  category: 'Transportation',
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="emotion-insertion-point" content="" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#52A4C1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Event Force" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body className={`${outfit.className}`} suppressHydrationWarning={true}>
        <ThemeProvider>
          <AuthProvider>
            {children}
            <PerformanceMonitor />
          </AuthProvider>
        </ThemeProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/service-worker.js')
                    .then(function(registration) {
                      console.log('Service Worker registered successfully:', registration.scope);
                      
                      // Check for updates
                      registration.addEventListener('updatefound', function() {
                        const newWorker = registration.installing;
                        if (newWorker) {
                          newWorker.addEventListener('statechange', function() {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                              // New content is available, prompt user to refresh
                              if (confirm('New version available! Refresh to update?')) {
                                window.location.reload();
                              }
                            }
                          });
                        }
                      });
                      
                      // Cache support pages on registration
                      if (registration.active) {
                        registration.active.postMessage({ type: 'CACHE_SUPPORT_PAGES' });
                      }
                    })
                    .catch(function(error) {
                      console.error('Service Worker registration failed:', error);
                    });
                });
                
                // Handle service worker updates
                navigator.serviceWorker.addEventListener('controllerchange', function() {
                  window.location.reload();
                });
                
                // Handle offline/online events
                window.addEventListener('online', function() {
                  console.log('Connection restored');
                  // Optionally show a notification or update UI
                });
                
                window.addEventListener('offline', function() {
                  console.log('Connection lost');
                  // Optionally show offline indicator
                });
              } else {
                console.log('Service Worker not supported');
              }
            `,
          }}
        />
      </body>
    </html>
  );
}