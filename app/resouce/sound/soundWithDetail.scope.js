import Sequelize from 'sequelize'
import soundModel from './sound.model'
import typeModel from '../type/type.model'
import feelingModel from '../feeling/feeling.model'
import sourceModel from '../source/source.model'

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
    },
    {
      as: 'source',
      model: sourcemModel,
      required: true
    }
  ]
})
