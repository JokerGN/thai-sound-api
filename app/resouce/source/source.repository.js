import {Promise} from 'sequelize'
import sourceModel from './source.model'
import BaseRepository from '../base.repository'
class SourceRepository extends BaseRepository {

}

export default new SourceRepository(sourceModel, null)
