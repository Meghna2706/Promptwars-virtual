import Card from '../common/Card'

export default function TimelineEvent({
  date,
  title,
  description,
  icon,
  isLast = false,
}) {
  return (
    <div className="flex gap-6 mb-8 animate-slideUp">
      {/* Timeline Connector */}
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg mb-2 shadow-md">
          {icon}
        </div>
        {!isLast && (
          <div className="w-1 h-16 bg-gradient-primary rounded-full"></div>
        )}
      </div>

      {/* Event Content */}
      <Card hover className="flex-1">
        <p className="text-sm font-semibold text-primary mb-1">{date}</p>
        <h4 className="text-lg font-bold text-gray-900 mb-2">{title}</h4>
        <p className="text-gray-600">{description}</p>
      </Card>
    </div>
  )
}
