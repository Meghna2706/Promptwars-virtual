export default function LoadingState({
  message = 'Loading...',
  size = 'md',
}) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 animate-slideUp">
      <div className={`${sizeClasses[size]} animate-spin-slow mb-4`}>
        <div className="w-full h-full border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
      {message && <p className="text-gray-600 text-center">{message}</p>}
    </div>
  )
}
