import {Promise} from 'sequelize'
import typeModel from './type.model'
import BaseRepository from '../base.repository'
class TypeRepository extends BaseRepository {

}

export default new TypeRepository(typeModel, null)
