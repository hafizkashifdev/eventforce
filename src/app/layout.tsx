import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import ThemeProvider from '@/components/ThemeProvider';
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Event Force - Premium Transportation & Event Logistics",
  description: "From luxury VIP vehicles to large-scale event logistics, we provide seamless, reliable, and premium transportation solutions that elevate every occasion across Saudi Arabia.",
  keywords: ["transportation", "luxury cars", "event logistics", "Saudi Arabia", "VIP transport", "car rental", "event planning"],
  authors: [{ name: "Event Force" }],
  creator: "Event Force",
  publisher: "Event Force",
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
      rel: "apple-touch-icon.png",
      url: "/apple-touch-icon.png",
      type: "image/png",
      sizes: "180x180",
    },
  },
  openGraph: {
    title: "Event Force - Premium Transportation & Event Logistics",
    description: "From luxury VIP vehicles to large-scale event logistics, we provide seamless, reliable, and premium transportation solutions that elevate every occasion across Saudi Arabia.",
    url: `https://eventforcesa.netlify.app/.netlify.app/`,
    type: "website",
    locale: "en_US",
    siteName: "Event Force",
    images: [
      {
        url: `https://eventforcesa.netlify.app/.netlify.app/og.png`,
        type: "image/png",
        width: 1200,
        height: 630,
        alt: "Event Force - Premium Transportation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Event Force - Premium Transportation & Event Logistics",
    description: "From luxury VIP vehicles to large-scale event logistics, we provide seamless, reliable, and premium transportation solutions that elevate every occasion across Saudi Arabia.",
    images: ["https://eventforce.sa/og.png"],
  },
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
      </head>
      <body className={`${outfit.className}`} suppressHydrationWarning={true}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}