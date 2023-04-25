const SUCCESS_RESPONSE = {
  data: {
    user: 'Aleksandr'
  },
  status: 'success',
  statusCode: 200
}

const FAILURE_RESPONSE = {
  data: {},
  status: 'failure',
  statusCode: 401,
  error: {
    message: 'Email or password are incorrect'
  }
}

export { SUCCESS_RESPONSE, FAILURE_RESPONSE };