import Container from '../layout/Container'
import Button from '../common/Button'

export default function HeroSection({
  title,
  subtitle,
  description,
  buttons = [],
  backgroundGradient = 'bg-gradient-primary',
  icon = null,
}) {
  return (
    <section className={`${backgroundGradient} text-white py-16 sm:py-24`}>
      <Container>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-slideUp">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">{title}</h1>
            {subtitle && <p className="text-xl opacity-90 mb-2">{subtitle}</p>}
            {description && <p className="text-lg opacity-80 mb-8">{description}</p>}
            {buttons.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-4">
                {buttons.map((btn, idx) => (
                  <Button
                    key={idx}
                    onClick={btn.onClick}
                    variant={btn.variant || 'secondary'}
                    size="lg"
                  >
                    {btn.label}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Right Icon */}
          {icon && (
            <div className="hidden md:flex justify-center animate-slideDown">
              <div className="text-9xl">{icon}</div>
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
