export default function Card({
  children,
  className = '',
  hover = false,
  gradient = false,
}) {
  const baseStyles = 'rounded-2xl shadow-md p-6 transition-smooth'
  const hoverStyles = hover ? 'hover:shadow-lg hover:-translate-y-1' : ''
  const gradientStyles = gradient ? 'bg-gradient-primary text-white' : 'bg-white'

  return (
    <div className={`${baseStyles} ${hoverStyles} ${gradientStyles} ${className}`}>
      {children}
    </div>
  )
}
