import Router from 'koa-router'
import FeelingRepository from '../resouce/feeling/feeling.repository'

const Feeling = new Router()

Feeling.post('/add_feeling', async function (context, next) {
  let data = context.request.body
  context.body = await FeelingRepository.findOrCreate({feelingName: data.feeling})
})

export default Feeling
