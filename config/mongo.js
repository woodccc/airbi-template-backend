/**
 * MongoDB configuration using generators (with the help of co-mongo package).
 * You can require this config file in your controllers and start using named collections directly.
 * See /controllers directory for sample usage.
 */
const mongodb = require('mongodb')

const { connect } = mongodb
const config = require('./config')

mongodb.close = async () => {
  if (mongodb.db) {
    await mongodb.db.close()
  }
}

/**
 * Opens a new connection to the mongo database, closing the existing one if exists.
 */
mongodb.connect = async () => {
  await mongodb.close()
  const db = await connect(config.mongo.url)

  // export default collections
  mongodb.report = db.collection('bi_report')
  mongodb.dataReport = db.collection('bi_data')
  mongodb.category = db.collection('bi_category')
  mongodb.user = db.collection('bi_user')
  mongodb.userGroup = db.collection('bi_user_group')
  mongodb.userRole = db.collection('bi_user_role')
  mongodb.permission = db.collection('bi_permission')
  mongodb.widetable = db.collection('bi_widetable')
}

module.exports = mongodb
