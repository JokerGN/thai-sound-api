import Router from 'koa-router'
import Multer from 'koa-multer'
import Send from 'koa-send'
import storage from '../lib/filestorage'
import SoundRepository from '../resouce/sound/sound.repository'

const Sound = new Router()
const Upload = Multer({storage: storage}).single('sound')

Sound.get('/showall', async function (context, next) {
  let data = context.request.query
  let scope = {}
  if (!data) {
    scope = {
      scope: 'sounddetail'
    }
  } else {
    scope = {
      scope: 'sounddetail',
      offset: parseInt(data.offset),
      limit: parseInt(data.limit)
    }
  }
  context.body = await SoundRepository.findAndCountAllBy({}, scope)
})

Sound.post('/add_sound', Upload, async function (context, next) {
  let data = context.req.body
  let soundData = {
    soundUrl: context.req.file.path,
    soundName: context.req.file.filename,
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
  await SoundRepository.findOrCreate({soundUrl: context.req.file.path, deletedAt: {ne: null}},soundData)
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
    offset: parseInt(data.offset),
    limit: parseInt(data.limit)
  }
  let where = {
    typeId: data.typeId,
    feelingId: data.feelingId
  }

  context.body = await SoundRepository.findAndCountAllBy(where, scope)
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
