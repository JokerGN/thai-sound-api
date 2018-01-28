import Router from 'koa-router'
import UserRepository from '../resouce/user/user.repository'

const User = new Router()

User.get('/showall', async function (context, next) {
  context.body = await UserRepository.findAndCountAllBy({},{})
})

User.post('/update', async function (context, next) {
  let data = context.request.body
  let updateData = {
    firstName: data.firstName,
    lastName: data.lastName,
    citizenId: data.citizenId,
    address: data.address
  }
  context.body = await UserRepository.updateBy({email: data.email}, updateData)
})

User.post('/delete', async function (context,next) {
  let data = context.request.body
  context.body = await UserRepository.deleteBy({email: data.email})
})

export default User
