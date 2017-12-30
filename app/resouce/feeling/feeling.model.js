import Sequelize from 'sequelize'
import {database} from '../database'

let feelingModel = database.define('feeling', {
  feelingId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  feelingName: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false
  },
  updatedAt: {
    type: Sequelize.DATE
  },
  deletedAt: {
    type: Sequelize.DATE
  }
}, {
  tableName: 'feeling',
  freezeTableName: true,
  paranoid: true
})

export default feelingModel


