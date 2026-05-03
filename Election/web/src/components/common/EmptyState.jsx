import Button from './Button'

export default function EmptyState({
  icon = '📭',
  title = 'No content',
  message = 'There is nothing to display here.',
  action = null,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 animate-slideUp">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-center mb-6 max-w-md">{message}</p>
      {action && (
        <Button variant="primary" size="md" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  )
}
