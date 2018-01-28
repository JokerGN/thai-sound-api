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

export default Feeling
