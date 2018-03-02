import Router from 'koa-router'
import Multer from 'koa-multer'
import Send from 'koa-send'
import storage from '../lib/filestorage'
import SoundRepository from '../resouce/sound/sound.repository'

const Sound = new Router()
const Upload = Multer({storage: storage}).single('sound')

Sound.get('/showall', async function (context, next) {
  let scope = {
    scope: 'sounddetail'
  }
  context.body = await SoundRepository.findAndCountAllBy({}, scope)
})

Sound.post('/get_sound_id', async function (context, next) {
  let data = context.request.body
  context.body = await SoundRepository.findBy({soundId: data.soundId})
})

Sound.post('/add_sound', Upload, async function (context, next) {
  let data = context.req.body
  let soundData = {
    soundUrl: context.req.file.path,
    sourceId: data.sourceId,
    typeId: data.typeId,
    feelingId: data.feelingId,
    maleMean: data.maleMean,
    maleSD: data.maleSD,
    femaleMean: data.femaleMean,
    femaleSD: data.femaleSD,
    teenageMean: data.teenageMean,
    teenageSD: data.teenageSD,
    oldmanMean: data.oldmanMean,
    oldmanSD: data.oldmanSD,
  }
  await SoundRepository.findOrCreate({soundUrl: context.req.file.path},soundData)
  .spread((sound, created) => {
    if (created) {
      context.body = {
        status: 200,
        message: sound
      }
    } else {
      context.status = 403
      context.body = {
        status : context.status,
        message: "This file already in server"
      }
    }
  })
})

Sound.post('/download', async function (context, next) {
  let data = context.request.body
  await Send(context, `./${data.url}`)
})

Sound.get('/uploads/:filename', async function (context, next) {
  let soundUrl = context.params.filename
  await Send(context, `./uploads/${soundUrl}`)
})

export default Sound
