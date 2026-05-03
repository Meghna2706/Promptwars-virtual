import Card from '../common/Card'

export default function GuideStep({
  stepNumber,
  title,
  description,
  icon,
}) {
  return (
    <Card hover className="animate-slideUp">
      <div className="flex gap-4">
        {/* Step Badge */}
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-primary text-white font-bold text-lg shadow-md">
            {stepNumber}
          </div>
        </div>

        {/* Step Content */}
        <div className="flex-1">
          <div className="flex items-start gap-2 mb-2">
            <span className="text-2xl">{icon}</span>
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          </div>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </Card>
  )
}
