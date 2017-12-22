import Sequelize from 'sequelize'
import {database} from '../database'

let userModel = database.define('user', {
  userId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  password: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  roleId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'role',
      key: 'roleId'
    }
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
  tableName: 'user',
  freezeTableName: true,
  paranoid: true
})

export default userModel
