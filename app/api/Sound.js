import Router from 'koa-router'
import Multer from 'koa-multer'
import Send from 'koa-send'
import asyncBusboy from 'async-busboy'
import storage from '../lib/filestorage'
import SoundRepository from '../resouce/sound/sound.repository'

const Sound = new Router()
const Upload = Multer({storage: storage}).single('sound')

Sound.get('/showall', async function (context, next) {
  context.body = await SoundRepository.findAndCountAllBy({},{})
})

Sound.post('/add_sound', Upload, async function (context, next) {
  let data = context.req.body
  let soundData = {
    soundUrl: context.req.file.path,
    sourceId: data.sourceId,
    typeId: data.typeId,
    mean: data.mean,
    sd: data.sd,
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
      context.body = sound
    } else {
      context.status = 403
      context.body = {
        "status": context.status,
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
