const convertErrorResponse = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    const status = err.statusCode || err.status || 500
    ctx.response.status = status
    ctx.response.body = {
      error: err.message,
      status
    }
  }
}

module.exports = convertErrorResponse
