import Sequelize from 'sequelize'
import {database} from '../database'

let userModel = database.define('user', {
  userId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  firstName: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  email: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  password: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  citizenId: {
    type: Sequelize.STRING(13),
    allowNull: false
  },
  address: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  role: {
    type: Sequelize.ENUM,
    values: ['admin','user'],
    defaultValue: ['user']
  },
  status: {
    type: Sequelize.ENUM,
    values: ['active', 'wait_for_active', 'block'],
    defaultValue: ['wait_for_active']
  },
  token: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  loginAt: {
    type: Sequelize.DATE
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
