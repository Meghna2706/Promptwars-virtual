export default function Container({
  children,
  className = '',
  maxWidth = 'max-w-6xl',
}) {
  return (
    <div className={`${maxWidth} mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  )
}
