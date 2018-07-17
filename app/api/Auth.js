import Router from 'koa-router'
import JWT from 'jsonwebtoken'
import UserRepository from '../resouce/user/user.repository'
import transporter from '../lib/nodemailer'
import { error } from 'util'
import registerConstraints from '../lib/validate/registerValidate'
import loginConstraints from '../lib/validate/loginValidate'
import validate from 'validate.js'
import template from '../static/mail_template'
import 'dotenv/config'

const Auth = new Router()

const sercetkey = 'thai-sound'

Auth.post('/register', async function (context, next) {
  let data = context.request.body
  let error = validate(data, registerConstraints, {format: 'flat'})
  if (!error) {
    let token = JWT.sign(data.email, sercetkey)
    await UserRepository.findOrCreate({email: data.email},
      {
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        citizenId: data.citizenId,
        address: data.address,
        token: token,
        loginAt: '0000-00-00 00:00:00'
      })
    .spread((user, created) => {
      if (created) {
        let confirmUrl = process.env.BASE_URI+"auth/confirm/"+token
        let message = {
          to: data.email,
          subject: 'ยืนยันการสมัครสมาชิก Thaisound',
          text: 'ยืนยันการสมัครสมาชิก',
          html: `${template}<a href='${confirmUrl}'>ยืนยันการสมัครสมาชิก</a>`
        }
        transporter.sendMail(message, (error, info) => {
          if (error) {
            console.log(error)
          } else {
            console.log(info.response)
          }
        })
        context.status = 200
        context.message = JSON.stringify({
          created: created
        })
        context.body = {
          status: context.status,
          message: {
            created: created
          }
        }
      } else {
        context.status = 403
        context.message = JSON.stringify({
            created: created
        })
        context.body = {
          status: context.status,
          message: {
            created: created
          }
        }
      }
    })
  } else {
    context.status = 403
    context.message = JSON.stringify({
      error: error
    })
    context.body = {
      status: context.status,
      message: error
    }
  }
})

Auth.get('/confirm/:token', async function (context, next) {
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
        context.redirect('http://www.thai-sound-rmcs.com')
      } else {
        context.body = UserRepository.updateBy({email: decodedToken}, {status: 'active'})
        context.redirect('http://www.thai-sound-rmcs.com')
      }
    })
  }
})

Auth.post('/login', async function (context, next) {
  let data = context.request.body
  let error = validate(data, loginConstraints, {format: 'flat'})
  if (!error) {
    await UserRepository.findBy({email: data.email, password: data.password})
    .spread(async function (user) {
      if (user) {
        await UserRepository.updateBy({email: data.email}, {loginAt: new Date()})
        context.body = user
      } else {
        context.status = 404
        context.message = 'User not found'
      }
    })
  } else {
    context.status = 401
    context.message = JSON.stringify({
      error: error
    })
    context.body = {
      status: context.status,
      message: error
    }
  }
})

export default Auth

