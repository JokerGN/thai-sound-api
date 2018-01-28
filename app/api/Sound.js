import Router from 'koa-router'
import Multer from 'koa-multer'
import asyncBusboy from 'async-busboy'
import storage from '../lib/filestorage'

const Sound = new Router()
const Upload = Multer({storage: storage}).single('sound')

Sound.get('/', async function (context, next) {
  context.body = 'hello'
})

Sound.post('/add_sound', Upload, async function (context, next) {
  let data = context.request.body
  console.log(data)
})

export default Sound
