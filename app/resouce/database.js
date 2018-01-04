import Sequelize from 'sequelize'
import 'babel-polyfill'

export const database = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  port: process.env.DB_PORT,
  pool: {
    min: 0,
    max: 15
  },
  logging: false
})
