import Router from 'koa-router'
import JWT from 'jsonwebtoken'
import UserRepository from '../resouce/user/user.repository'
import transporter from '../lib/nodemailer'
import { error } from 'util'
import registerConstraints from '../lib/validate/registerValidate'
import loginConstraints from '../lib/validate/loginValidate'
import validate from 'validate.js'
import 'dotenv/config'

const Auth = new Router()

const sercetkey = 'thai-sound'

Auth.post('/register', async function (context, next) {
  let content =  "เรียน ผู้ที่สนใจ<br />ขอขอบคุณทุกท่านที่สนใจในระบบเสียงดิจิทัลที่ส่งผลทางด้านอารมณ์ความรู้สึกในบริบทของคนไทย (Thai Affective Digitized Sounds Bank System) ซึ่ง Thai-Sounds นี้ ประกอบไปด้วยระบบเสียงดิจิทัลส่งผลทางด้านอารมณ์ความรู้สึกในบริบทของคนไทยที่มีการจัดหมวดหมู่ของอารมณ์ความรู้สึก โดยออกเป็น 3 ด้าน ได้แก่ อารมณ์ความรู้สึกด้านความพึงพอใจ (Valence) อารมณ์ความรู้สึกด้านการตื่นตัว (Arousal) และอารมณ์ความรู้สึกด้านการมีอิทธิพล (Dominance) ที่ใช้เป็นสิ่งเร้าสำหรับในงานวิจัยเพื่อตรวจสอบอารมณ์ความรู้สึก"+
  "Thai-Sounds นี้ ถูกพัฒนาขึ้นเพื่อใช้ประโยชน์ทางด้านวิชาการ การพัฒนางานวิจัย และการศึกษาสาขาต่างๆ เพื่อสาธารณะประโยชน์ เพิ่มศักยภาพในการศึกษาวิจัยทางด้านอารมณ์ความรู้สึก โดยที่ไม่มุ่งเน้นทางการค้า"+
  "สำหรับผู้ที่สนใจนำ Thai-Sounds ไปใช้ประโยชน์ตามวัตถุประสงค์ดังกล่าวข้างต้น สามารถลงทะเบียนเพื่อดาวน์โหลดรูปภาพได้ที่แบบฟอร์มขอดาวน์โหลด Thai-Sounds ทั้งนี้ ผู้ที่สนใจดาวน์โหลด Thai-Sounds ไปใช้ทางศูนย์ฯ ขอความกรุณาอย่าเผยแพร่ ระบบเสียงดิจิทัล แต่ควรใช้รหัสระบบเสียงดิจิทัล ในการเผยแพร่แทน เพื่อมิให้เกิดความคุ้นเคยหรือเคยชินต่อระบบเสียงดิจิทัล ที่เป็นสิ่งเร้าในงานวิจัย รวมทั้งไม่ควรส่งต่อระบบเสียงดิจิทัลที่ท่านดาวน์โหลดให้กับผู้อื่น หากท่านใดสนใจ ให้ติดต่อขอดาวน์โหลดกับทางศูนย์ฯ ได้ด้วยตนเอง โดยไม่มีค่าใช้จ่ายใดๆ ทั้งสิ้น"+
  "ขอบคุณอีกครั้งสำหรับความสนใจของคุณ"+
  "ศูนย์ความเป็นเลิศด้านวิทยาการปัญญา วิทยาลัยวิทยาการวิจัยและวิทยาการปัญญา มหาวิทยาลัยบูรพา"
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
          html: `${content}<br /><a href='${confirmUrl}'>ยืนยันการสมัครสมาชิก</a>`
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
        context.redirect('http://thai-sound.chaluline.com')
      } else {
        context.body = UserRepository.updateBy({email: decodedToken}, {status: 'active'})
        context.redirect('http://thai-sound.chaluline.com')
      }
    })
  }
})

Auth.post('/login', async function (context, next) {
  let data = context.request.body
  let error = validate(data, loginConstraints, {format: 'flat'})
  if (!error) {
    await UserRepository.updateBy({email: data.email}, {loginAt: new Date()})
    context.body = await UserRepository.findBy({email: data.email})
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

