import Sequelize from 'sequelize'
import {database} from '../database'
import typeModel from '../type/type.model'
import feelingModel from '../feeling/feeling.model'

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
  soundName: {
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
  feelingId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'feeling',
      key: 'feelingId'
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
  femaleMean: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  teenageMean: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  oldmanMean: {
    type: Sequelize.DOUBLE,
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
  tableName: 'sound',
  freezeTableName: true,
  paranoid: true
})

typeModel.hasMany(soundModel, {as: 'sound', foreignKey: 'typeId'})
feelingModel.hasMany(soundModel, {as: 'sound', foreignKey: 'feelingId'})
soundModel.belongsTo(typeModel, {as: 'type', foreignKey: 'typeId'})
soundModel.belongsTo(feelingModel, {as: 'feeling', foreignKey: 'feelingId'})

export default soundModel


