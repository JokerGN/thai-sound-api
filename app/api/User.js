import Router from 'koa-router'
import UserRepository from '../resouce/user/user.repository'

const User = new Router()

User.get('/showall', async function (context, next) {
  context.body = await UserRepository.findAndCountAllBy({},{})
})

export default User
