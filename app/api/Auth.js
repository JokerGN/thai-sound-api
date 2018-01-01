import Router from 'koa-router'
import JWT from 'jsonwebtoken'
import UserRepository from '../resouce/user/user.repository'
import RoleRepository from '../resouce/role/role.repository'
import transporter from '../lib/nodemailer'
import { error } from 'util';

const Auth = new Router()

const sercetkey = 'thai-sound'

Auth.post('/gettoken', async function (context, next) {
  let data = context.request.body
  let token = JWT.sign(data, sercetkey)
  context.body = await RoleRepository.findOrCreate({role: data.role},{token: token})
})

Auth.post('/register', async function (context, next) {
  let data = context.request.body
  let token = JWT.sign(data.email, sercetkey)
  await UserRepository.findOrCreate({email: data.email},
    {
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      citizenId: data.citizenId,
      address: data.address,
      token: token
    })
  .spread((user, created) => {
    context.body = user.get({ plain: true })
    if (created) {
      let confirmUrl = 'http://www.chaluline.com:3001/confirm?token='+token
      let message = {
        to: data.email,
        subject: 'test confirm register',
        text: 'test register confirmation',
        html: `<a href='${confirmUrl}'>ยืนยันการสมัครสมาชิก</a>`
      }
      transporter.sendMail(message, (error, info) => {
        if (error) {
          console.log(error)
        } else {
          console.log(info.response)
        }
      })
    }
  })
})

Auth.post('/confirm/:token', async function (context, next) {
  let reciveToken = context.params.token
  let decodedToken = null
  JWT.verify(reciveToken, sercetkey, function (err, decoded) {
    if (err) {
      let error = {
        name: err.name,
        message: err.message
      }
      context.body = error
    } else{
      decodedToken = decoded
    }
  })
  if (decodedToken) {
    await UserRepository.findBy({email: decodedToken})
    .spread((user) => {
      if (user.status == 'active' || user.status == 'block') {
        let message = {
          userStatus: user.status,
          message: 'this user already active or block'
        }
        context.body = message
      } else {
        context.body = UserRepository.updateBy({email: decodedToken}, {status: 'active'})
      }
    })
  }
})

export default Auth

