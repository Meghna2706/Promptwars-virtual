import { Link } from 'react-router-dom'

export default function FeatureCard({ 
  title, 
  description, 
  icon, 
  link,
  color = 'blue'
}) {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 hover:border-blue-300 hover:shadow-lg',
    cyan: 'bg-cyan-50 border-cyan-200 hover:border-cyan-300 hover:shadow-lg',
    green: 'bg-green-50 border-green-200 hover:border-green-300 hover:shadow-lg',
    amber: 'bg-amber-50 border-amber-200 hover:border-amber-300 hover:shadow-lg',
  }

  const iconClasses = {
    blue: 'text-blue-500',
    cyan: 'text-cyan-500',
    green: 'text-green-500',
    amber: 'text-amber-500',
  }

  return (
    <Link to={link}>
      <div className={`${colorClasses[color]} p-6 rounded-lg border-2 cursor-pointer transition duration-200`}>
        <div className={`${iconClasses[color]} text-4xl mb-4`}>{icon}</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
        <div className="mt-4 text-primary font-semibold text-sm flex items-center gap-1">
          Explore →
        </div>
      </div>
    </Link>
  )
}
