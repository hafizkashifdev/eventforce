// Event Force Theme Constants
export const THEME = {
  colors: {
    primary: '#52A4C1',
    primaryDark: '#4A8FA8',
    secondary: '#1976d2',
    accent: '#f57c00',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
    info: '#2196f3',
    purple: '#9c27b0',
    darkPurple: '#7b1fa2',
    green: '#2e7d32',
    darkGreen: '#1b5e20',
    grey: {
      50: '#f8f9fa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
      disabled: '#999999',
    },
    background: {
      default: '#ffffff',
      paper: '#f8f9fa',
      dark: '#000000',
    }
  },
  
  gradients: {
    primary: 'linear-gradient(135deg, #52A4C1 0%, #1976d2 100%)',
    hero: 'linear-gradient(135deg, #1976d2 0%, #52A4C1 100%)',
    support: 'linear-gradient(135deg, #52A4C1 0%, #1976d2 100%)',
    help: 'linear-gradient(135deg, #1976d2 0%, #52A4C1 100%)',
    terms: 'linear-gradient(135deg, #333 0%, #666 100%)',
    privacy: 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)',
    faq: 'linear-gradient(135deg, #9c27b0 0%, #673ab7 100%)',
  },
  
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    xxl: '4rem',
  },
  
  breakpoints: {
    xs: '0px',
    sm: '600px',
    md: '900px',
    lg: '1200px',
    xl: '1536px',
  },
  
  typography: {
    fontFamily: {
      primary: 'var(--font-outfit), Arial, Helvetica, sans-serif',
      secondary: 'Poppins, sans-serif',
      display: 'Montserrat, sans-serif',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '50%',
  },
  
  transitions: {
    fast: '0.15s ease-in-out',
    normal: '0.3s ease-in-out',
    slow: '0.5s ease-in-out',
  },
  
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
  }
} as const;

// Animation constants
export const ANIMATIONS = {
  duration: {
    fast: 0.3,
    normal: 0.5,
    slow: 0.8,
  },
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  },
} as const;

// Image optimization constants
export const IMAGE_CONFIG = {
  quality: 85,
  formats: ['image/webp', 'image/avif'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  placeholder: 'blur' as const,
  loading: 'lazy' as const,
  priority: true,
} as const;

// SEO constants
export const SEO = {
  siteName: 'Event Force',
  siteUrl: 'https://eventforcesa.netlify.app',
  defaultTitle: 'Event Force - Premium Transportation & Event Logistics',
  defaultDescription: 'From luxury VIP vehicles to large-scale event logistics, we provide seamless, reliable, and premium transportation solutions that elevate every occasion across Saudi Arabia.',
  keywords: [
    'transportation',
    'luxury cars',
    'event logistics',
    'Saudi Arabia',
    'VIP transport',
    'car rental',
    'event planning',
    'chauffeur service',
    'premium transportation'
  ] as string[],
  social: {
    twitter: '@eventforce_sa',
    facebook: 'eventforce.sa',
    instagram: 'eventforce_sa',
  },
  contact: {
    phone: '+966 59 427 9012',
    email: 'Reservations@eventforce.sa.com',
    address: 'Saudi Arabia',
  }
} as const;

