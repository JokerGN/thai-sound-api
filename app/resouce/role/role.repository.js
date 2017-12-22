import {Promise} from 'sequelize'
import roleModel from './role.model'
import BaseRepository from '../base.repository'
class RoleRepository extends BaseRepository {

}

export default new RoleRepository(roleModel, null)
