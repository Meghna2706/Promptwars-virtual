export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  fullWidth = false,
  ...props 
}) {
  const baseStyles = 'font-semibold rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-secondary focus:ring-primary',
    secondary: 'bg-secondary text-white hover:bg-primary focus:ring-secondary',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary',
    success: 'bg-success text-white hover:bg-emerald-600 focus:ring-success',
  }

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const widthClass = fullWidth ? 'w-full' : ''

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass}`}
      {...props}
    >
      {children}
    </button>
  )
}
