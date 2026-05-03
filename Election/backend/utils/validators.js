// Validate email format
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate age
export function isValidAge(age) {
  const ageNum = parseInt(age)
  return !isNaN(ageNum) && ageNum >= 0 && ageNum <= 150
}

// Validate message
export function isValidMessage(message) {
  return typeof message === 'string' && message.trim().length > 0 && message.trim().length <= 1000
}

// Validate form data
export function isValidEligibilityData(data) {
  const { age, isCitizen, residencyMonths, mentallyCompetent, hasActiveFelony } = data
  
  return (
    isValidAge(age) &&
    typeof isCitizen === 'boolean' &&
    typeof residencyMonths === 'number' &&
    residencyMonths >= 0 &&
    typeof mentallyCompetent === 'boolean' &&
    typeof hasActiveFelony === 'boolean'
  )
}
