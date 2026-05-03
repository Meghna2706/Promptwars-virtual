import Card from '../common/Card'

export default function FeatureCard({
  icon,
  title,
  description,
  className = '',
}) {
  return (
    <Card hover className={`flex flex-col items-center text-center ${className}`}>
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </Card>
  )
}
