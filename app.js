const Koa = require('koa')
require('./config/mongo').connect()

const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa-cors')
const convertErrorResponse = require('./utils/convertErrorResponse')

const controllers = require('./controllers')

// error handler
onerror(app)

// middlewares
app.use(convertErrorResponse)
app.use(cors({ methods: '*' }))
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json({}))
app.use(logger())

// controllers
controllers.forEach((controller) => {
  app.use(controller.routes(), controller.allowedMethods())
})

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
