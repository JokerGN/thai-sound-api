import Router from 'koa-router'
import TypeRepository from '../resouce/type/type.repository'

const Type = new Router()

Type.post('/add_type', async function (context, next) {
  let data = context.request.body
  context.body = await TypeRepository.findOrCreate({typeName: data.type})
})

Type.get('/get_type', async function (context, next) {
  context.body = await TypeRepository.findAndCountAllBy({}, {})
})

export default Type
