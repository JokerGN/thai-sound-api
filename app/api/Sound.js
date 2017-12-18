import Router from 'koa-router'

const Sound = new Router()

Sound.get('/', async function (context, next) {
  context.body = 'hello'
})

export default Sound
