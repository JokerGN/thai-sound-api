import Sequelize from 'sequelize'
import soundModel from './sound.model'
import typeModel from '../type/type.model'

soundModel.addScope('soundanalysis', {
  includeIgnoreAttributes: false,
  attributes: [
    [Sequelize.literal('COUNT(*)'),'total_sound'],
    [Sequelize.col('typeName'),'type_name']
  ],
  include: [
    {
      as: 'type',
      model: typeModel,
      required: true
    }
  ],
  group: [Sequelize.col('sound.typeId')]
})
