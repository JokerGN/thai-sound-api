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
  await UserRepository.updateBy({email: data.email}, updateData)
  .spread((updated, sound) => {
    if (sound) {
      context.body = {
        status: 200,
        message: 'update completed'
      }
    } else {
      context.status = 403
      context.body = {
        status: 403,
        message: 'Not found record'
      }
    }
  })
})

User.post('/get_user_id', async function (context, next) {
  let data = context.request.body
  context.body = await UserRepository.findBy({userId: data.Id})
})

User.post('/delete', async function (context,next) {
  let data = context.request.body
  if (await UserRepository.deleteBy({email: data.email})) {
    context.body = {
          status: 200,
          message: "Delete user success"
        }
  } else {
    context.status = 403
    context.body = {
      status : context.status,
      message: "This record is not on the server"
    }
  }
})

User.post('/change_status', async function (context, next) {
  let data = context.request.body
  await UserRepository.findBy({email: data.email})
  .spread((user) => {
    if (user) {
      if (user.status == 'block') {
        UserRepository.updateBy({email: data.email}, {status: 'active'})
      } else {
        UserRepository.updateBy({email: data.email}, {status: 'block'})
      }
      context.status = 200
      context.body = {
        status: context.status,
        message: 'Status change'
      }
    } else {
      context.status = 404
      context.body = {
        status: context.status,
        message: 'User not found'
      }
    }
  })
})

export default User
