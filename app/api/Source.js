import Router from 'koa-router'
import SourceRepository from '../resouce/source/source.repository'

const Source = new Router()

Source.get('/showall', async function (context, next) {
  context.body = SourceRepository.findAndCountAllBy({}, {})
})
