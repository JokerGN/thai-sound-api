import Sequelize from 'sequelize'
import {database} from '../database'

let roleModel = database.define('role', {
  roleId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  role: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  token: {
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
  tableName: 'role',
  freezeTableName: true,
  paranoid: true
})

export default roleModel


