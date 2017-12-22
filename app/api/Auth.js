import Router from 'koa-router'
import JWT from 'jsonwebtoken'
import UserRepository from '../resouce/user/user.repository'
import RoleRepository from '../resouce/role/role.repository'

const Auth = new Router()

const sercetkey = 'thai-sound'

Auth.post('/gettoken', async function (context, next) {
  let data = context.request.body
  let token = JWT.sign(data, sercetkey)
  context.body = await RoleRepository.findOrCreate({role: data.role},{token: token})
})

Auth.post('/register', async function (context, next) {
  let data = context.request.body
  context.body = await UserRepository.findOrCreate({username: data.username}, {password: data.password, roleId: data.role})
})

Auth.post('/login', async function (context, next) {
  let data = context.request.body
  let response = await UserRepository.findBy({username: data.username})
  if (data.password !== response[0].password) {
    context.status = 401
    context.body = {
      status: context.status,
      message: "Unauthorized"
    }
  } else {
    context.status = 200
    context.body = {
      status: context.status,
      message: response
    }
  }
})

export default Auth

