import {Promise} from 'sequelize'
import feelingModel from './feeling.model'
import BaseRepository from '../base.repository'
class FeelingRepository extends BaseRepository {

}

export default new FeelingRepository(feelingModel, null)
