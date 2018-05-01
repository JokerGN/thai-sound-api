import {Promise} from 'sequelize'
import soundModel from './sound.model'
import BaseRepository from '../base.repository'
import './soundWithDetail.scope'
import './soundAnalysis.scope'
class SoundRepository extends BaseRepository {

}

export default new SoundRepository(soundModel, null)
