export default function Input({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error = '',
  disabled = false,
  label = '',
  className = '',
  name = '',
  ...props
}) {
  const handleChange = (e) => {
    if (typeof onChange === 'function') {
      onChange(e.target.value)
    }
  }

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={`w-full px-4 py-2 border-2 rounded-lg transition-smooth focus:outline-none min-h-11 ${
          error
            ? 'border-error focus:ring-2 focus:ring-error focus:border-transparent'
            : 'border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent'
        } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'} ${className}`}
        {...props}
      />
      {error && <p className="text-error text-sm mt-1">{error}</p>}
    </div>
  )
}
