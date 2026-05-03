import useEligibilityChecker from '../hooks/useEligibilityChecker'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Card from '../components/common/Card'
import Container from '../components/layout/Container'

export default function EligibilityPage() {
  const {
    formData,
    result,
    hasSubmitted,
    loading,
    error,
    handleInputChange,
    handleSubmit,
    handleReset,
  } = useEligibilityChecker()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-success text-white py-8 shadow-lg">
        <Container>
          <h1 className="text-4xl font-bold mb-2">Eligibility Checker</h1>
          <p className="text-emerald-100">Check if you're eligible to vote</p>
        </Container>
      </div>

      {/* Content */}
      <div className="py-12">
        <Container maxWidth="max-w-2xl">
          {!result ? (
            <Card className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Voter Eligibility Form</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Age */}
                <Input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={(val) => handleInputChange({ target: { name: 'age', value: val } })}
                  label="Age *"
                  placeholder="Enter your age"
                  error={hasSubmitted && !formData.age ? 'Age is required' : ''}
                />
                <p className="text-gray-600 text-sm">You must be at least 18 years old</p>

                {/* Citizenship */}
                <div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isCitizen"
                      checked={formData.isCitizen}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-success rounded"
                    />
                    <span className="text-gray-700 font-semibold">I am a U.S. citizen *</span>
                  </label>
                </div>

                {/* Residency */}
                <Input
                  type="number"
                  name="residencyMonths"
                  value={formData.residencyMonths}
                  onChange={(val) => handleInputChange({ target: { name: 'residencyMonths', value: val } })}
                  label="Days lived in current state *"
                  placeholder="Enter number of days (minimum 30)"
                  error={hasSubmitted && !formData.residencyMonths ? 'Residency is required' : ''}
                />
                <p className="text-gray-600 text-sm">You must have lived in your state for at least 30 days</p>

                {/* Mental Competency */}
                <div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="mentallyCompetent"
                      checked={formData.mentallyCompetent}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-success rounded"
                    />
                    <span className="text-gray-700 font-semibold">I am mentally competent *</span>
                  </label>
                  <p className="text-gray-600 text-sm mt-2">You must be mentally competent to vote. This is self-certified.</p>
                </div>

                {/* Felony Status */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-3">Felony Status *</label>
                  <label className="flex items-center gap-3 cursor-pointer mb-3">
                    <input
                      type="radio"
                      name="hasActiveFelony"
                      value={false}
                      checked={formData.hasActiveFelony === false}
                      onChange={() => handleInputChange({ target: { name: 'hasActiveFelony', value: false, type: 'radio' } })}
                      className="w-5 h-5"
                    />
                    <span className="text-gray-700">No active felony conviction</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="hasActiveFelony"
                      value={true}
                      checked={formData.hasActiveFelony === true}
                      onChange={() => handleInputChange({ target: { name: 'hasActiveFelony', value: true, type: 'radio' } })}
                      className="w-5 h-5"
                    />
                    <span className="text-gray-700">I have an active felony conviction</span>
                  </label>
                </div>

                {/* Validation Error */}
                {hasSubmitted && (!formData.age || formData.residencyMonths === '') && (
                  <div className="p-4 bg-red-50 border-2 border-error rounded-lg">
                    <p className="text-error font-semibold">Please fill in all required fields</p>
                  </div>
                )}
                
                {/* API Error */}
                {error && (
                  <div className="p-4 bg-red-50 border-2 border-error rounded-lg">
                    <p className="text-error font-semibold">{error}</p>
                  </div>
                )}

                {/* Submit Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="flex-1"
                    disabled={loading}
                    loading={loading}
                  >
                    Check Eligibility
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={handleReset}
                    disabled={loading}
                  >
                    Clear
                  </Button>
                </div>

                <p className="text-gray-500 text-xs text-center">
                  💡 This checker is for informational purposes only. Consult official election resources for accurate information.
                </p>
              </form>
            </Card>
          ) : (
            // Results
            <div className="space-y-6 animate-slideUp">
              {/* Status Card */}
              <Card
                className={`p-8 text-center ${
                  result.isEligible
                    ? 'bg-gradient-success text-white'
                    : 'bg-gradient-to-r from-red-50 to-red-100 border-2 border-error'
                }`}
              >
                <div className="text-6xl mb-4">
                  {result.isEligible ? '✓' : '✗'}
                </div>
                <h2 className={`text-3xl font-bold ${
                  result.isEligible ? 'text-white' : 'text-error'
                }`}>
                  {result.message}
                </h2>
              </Card>

              {/* Requirements Met */}
              <Card>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Requirements Met</h3>
                <ul className="space-y-2">
                  {result.requirements.map((req, idx) => (
                    <li key={idx} className="text-success font-semibold text-sm flex items-center gap-2">
                      <span>✓</span> {req}
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Issues */}
              {result.issues.length > 0 && (
                <Card className="border-2 border-error">
                  <h3 className="text-xl font-bold text-error mb-4">Eligibility Issues</h3>
                  <ul className="space-y-3">
                    {result.issues.map((issue, idx) => (
                      <li key={idx} className="text-error text-sm flex items-start gap-2">
                        <span className="font-bold">✗</span> {issue}
                      </li>
                    ))}
                  </ul>
                </Card>
              )}

              {/* Next Steps */}
              <Card className="bg-blue-50 border-2 border-primary">
                <h3 className="text-lg font-bold text-primary mb-3">Next Steps</h3>
                <ul className="space-y-2 text-primary text-sm">
                  <li>• Check your voter registration status at vote.org</li>
                  <li>• Find your polling location at ballotpedia.org</li>
                  <li>• Review voting deadlines for your state</li>
                  <li>• Prepare required identification documents</li>
                </ul>
              </Card>

              {/* Action Button */}
              <Button
                variant="primary"
                size="lg"
                onClick={handleReset}
                className="w-full"
              >
                Check Again
              </Button>
            </div>
          )}
        </Container>
      </div>
    </div>
  )
}
