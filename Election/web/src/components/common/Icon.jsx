import * as LucideIcons from 'lucide-react'

export default function Icon({
  name,
  size = 24,
  color = 'currentColor',
  className = '',
}) {
  const IconComponent = LucideIcons[name]

  if (!IconComponent) {
    return <span className={`text-2xl ${className}`}>?</span>
  }

  return (
    <IconComponent
      size={size}
      color={color}
      className={className}
      strokeWidth={2}
    />
  )
}
