// Design System Tokens
export const designSystem = {
  colors: {
    primary: '#2563eb',
    secondary: '#1e40af',
    accent: '#0ea5e9',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    neutral: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
  },
  gradients: {
    primary: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
    secondary: 'linear-gradient(135deg, #1e40af 0%, #0ea5e9 100%)',
    accent: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
    success: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  },
  typography: {
    h1: { size: '2.25rem', weight: 700, lineHeight: '2.5rem' },
    h2: { size: '1.875rem', weight: 700, lineHeight: '2.25rem' },
    h3: { size: '1.5rem', weight: 600, lineHeight: '2rem' },
    h4: { size: '1.25rem', weight: 600, lineHeight: '1.75rem' },
    body: { size: '1rem', weight: 400, lineHeight: '1.5rem' },
    caption: { size: '0.875rem', weight: 400, lineHeight: '1.25rem' },
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '2.5rem',
    '2xl': '3rem',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
  },
  transitions: {
    fast: '200ms',
    normal: '300ms',
    slow: '500ms',
  },
}

export default designSystem
