import Sequelize from 'sequelize'
import soundModel from './sound.model'
import typeModel from '../type/type.model'
import feelingModel from '../feeling/feeling.model'

soundModel.addScope('sounddetail', {
  include: [
    {
      as: 'type',
      model: typeModel,
      required: true
    },
    {
      as: 'feeling',
      model: feelingModel,
      required: true
    }
  ]
})
