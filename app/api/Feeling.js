import Router from 'koa-router'
import FeelingRepository from '../resouce/feeling/feeling.repository'

const Feeling = new Router()

Feeling.post('/add_feeling', async function (context, next) {
  let data = context.request.body
  let obj = {
    feelingName: data.feeling,
    typeId: data.type
  }
  context.body = await FeelingRepository.findOrCreate(obj)
})

Feeling.post('/get_feeling', async function (context, next) {
  let data = context.request.body
  context.body = await FeelingRepository.findBy({typeId: data.typeId})
})

export default Feeling
