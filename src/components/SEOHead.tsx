'use client';

import Head from 'next/head';
import { SEO } from '@/constants/theme';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  structuredData?: object;
  noindex?: boolean;
  nofollow?: boolean;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = SEO.defaultTitle,
  description = SEO.defaultDescription,
  keywords = SEO.keywords,
  image = `${SEO.siteUrl}/og.png`,
  url = SEO.siteUrl,
  type = 'website',
  structuredData,
  noindex = false,
  nofollow = false,
}) => {
  const fullTitle = title.includes(SEO.siteName) ? title : `${title} | ${SEO.siteName}`;
  const fullUrl = url.startsWith('http') ? url : `${SEO.siteUrl}${url}`;
  const fullImage = image.startsWith('http') ? image : `${SEO.siteUrl}${image}`;

  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SEO.siteName,
    url: SEO.siteUrl,
    logo: `${SEO.siteUrl}/logo-event-force.png`,
    description: SEO.defaultDescription,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SEO.contact.phone,
      contactType: 'customer service',
      availableLanguage: ['English', 'Arabic'],
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'SA',
      addressLocality: 'Saudi Arabia',
    },
    sameAs: [
      `https://twitter.com/${SEO.social.twitter}`,
      `https://facebook.com/${SEO.social.facebook}`,
      `https://instagram.com/${SEO.social.instagram}`,
    ],
    service: {
      '@type': 'Service',
      name: 'Premium Transportation & Event Logistics',
      description: 'Luxury vehicle rentals, chauffeur services, and event logistics solutions',
      provider: {
        '@type': 'Organization',
        name: SEO.siteName,
      },
    },
  };

  const combinedStructuredData = structuredData 
    ? { ...defaultStructuredData, ...structuredData }
    : defaultStructuredData;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={SEO.siteName} />
      <meta name="robots" content={`${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}`} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#52A4C1" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content={SEO.siteName} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SEO.social.twitter} />
      <meta name="twitter:creator" content={SEO.social.twitter} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:image:alt" content={title} />
      
      {/* Additional Meta Tags */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={SEO.siteName} />
      <meta name="application-name" content={SEO.siteName} />
      <meta name="msapplication-TileColor" content="#52A4C1" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(combinedStructuredData),
        }}
      />
    </Head>
  );
};

export default SEOHead;

