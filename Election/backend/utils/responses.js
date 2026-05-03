// Standard success response
export function successResponse(data, message = 'Success') {
  return {
    success: true,
    message: message,
    data: data,
    timestamp: new Date().toISOString()
  }
}

// Standard error response
export function errorResponse(message, status = 500, error = null) {
  return {
    success: false,
    message: message,
    error: error,
    timestamp: new Date().toISOString()
  }
}

// Validation error response
export function validationErrorResponse(errors) {
  return {
    success: false,
    message: 'Validation failed',
    errors: errors,
    timestamp: new Date().toISOString()
  }
}
