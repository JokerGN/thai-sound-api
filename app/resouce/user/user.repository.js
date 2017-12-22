import {Promise} from 'sequelize'
import userModel from './user.model'
import BaseRepository from '../base.repository'
class UserRepository extends BaseRepository {

}

export default new UserRepository(userModel, null)
