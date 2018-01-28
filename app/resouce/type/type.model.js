import Sequelize from 'sequelize'
import {database} from '../database'

let typeModel = database.define('type', {
  typeId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  typeName: {
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
  tableName: 'type',
  freezeTableName: true,
  paranoid: true
})

export default typeModel


