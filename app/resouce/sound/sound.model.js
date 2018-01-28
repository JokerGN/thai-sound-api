import Sequelize from 'sequelize'
import {database} from '../database'

let soundModel = database.define('sound', {
  soundId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  soundUrl: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  sourceId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'source',
      key: 'sourceId'
    }
  },
  typeId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'type',
      key: 'typeId'
    }
  },
  mean: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  sd: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  maleMean: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  maleSD: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  femaleMean: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  femaleSD: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false
  },
  teenageMean: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  teenageSD: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  oldmanMean: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  oldmanSD: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  updatedAt: {
    type: Sequelize.DATE
  },
  deletedAt: {
    type: Sequelize.DATE
  }
}, {
  tableName: 'sound',
  freezeTableName: true,
  paranoid: true
})

export default soundModel


