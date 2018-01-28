import Sequelize from 'sequelize'
import {database} from '../database'

let sourceModel = database.define('source', {
  sourceId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  sourceName: {
    type: Sequelize.STRING(255),
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
  tableName: 'source',
  freezeTableName: true,
  paranoid: true
})

export default sourceModel


