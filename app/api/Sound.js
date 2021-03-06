import Router from 'koa-router'
import Multer from 'koa-multer'
import Send from 'koa-send'
import storage from '../lib/filestorage'
import SoundRepository from '../resouce/sound/sound.repository'

const Sound = new Router()
const Upload = Multer({storage: storage}).single('sound')

Sound.get('/showall', async function (context, next) {
  context.body = await SoundRepository.findAndCountAllBy({}, {scope: 'sounddetail'})
})

Sound.post('/add_sound', async function (context, next) {
  let data = context.request.body
  let soundData = {
    soundUrl: data.soundUrl,
    soundName: data.soundName,
    sourceId: data.sourceId,
    typeId: data.typeId,
    feelingId: data.feelingId,
    mean: data.mean,
    sd: data.sd,
    maleMean: data.maleMean,
    femaleMean: data.femaleMean,
    teenageMean: data.teenageMean,
    oldmanMean: data.oldmanMean
  }
  await SoundRepository.findOrCreate({soundUrl: data.soundUrl, deletedAt: {ne: null}},soundData)
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

Sound.post('/upload', Upload, async function (context, next) {
  let path = context.req.file.path.replace('\\','/')
  await SoundRepository.findBy({soundUrl: path, deletedAt: {ne: null}})
  .spread((sound) => {
    if (!sound) {
      context.body = {
        status: 200,
        message: path
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

Sound.post('/get_sound_id', async function (context, next) {
  let data = context.request.body
  context.body = await SoundRepository.findBy({soundId: data.soundId})
})

Sound.post('/update', async function (context, next) {
  let data = context.request.body
  let soundData = {
    sourceId: data.sourceId,
    typeId: data.typeId,
    feelingId: data.feelingId,
    mean: data.mean,
    sd: data.sd,
    maleMean: data.maleMean,
    femaleMean: data.femaleMean,
    teenageMean: data.teenageMean,
    oldmanMean: data.oldmanMean
  }
  await SoundRepository.updateBy({soundId: data.soundId}, soundData)
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

Sound.post('/delete_sound', async function (context, next) {
  let data = context.request.body
  if (await SoundRepository.deleteBy({soundId: data.soundId})) {
    context.body = {
          status: 200,
          message: "Delete sound success"
        }
  } else {
    context.status = 403
    context.body = {
      status : context.status,
      message: "This file is not on the server"
    }
  }
})

Sound.post('/search_sound', async function (context, next) {
  let data = context.request.body
  let scope = {
    scope: 'sounddetail',
  }
  let where = {
    typeId: data.typeId,
    feelingId: data.feelingId
  }

  context.body = await SoundRepository.findAndCountAllBy(where, scope)
})

Sound.get('/sound_analysis', async function (context, next) {
  let scope = {
    scope: 'soundanalysis'
  }
  context.body = await SoundRepository.findBy({}, scope)
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
