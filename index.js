import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import 'dotenv/config'
import Sound from './app/api/Sound'
import Auth from './app/api/Auth'
import Feeling from './app/api/Feeling'
import User from './app/api/User'
import Type from './app/api/Type'
import Source from './app/api/Source'

const app = new Koa()
const router = new Router()

app.use(bodyParser({
  formLimit: "10mb"
}))
app.use(cors())

router.use('/sound', Sound.routes())
router.use('/auth', Auth.routes())
router.use('/feeling', Feeling.routes())
router.use('/user', User.routes())
router.use('/type', Type.routes())
router.use('/source', Source.routes())

app.use(router.routes())
app.use(router.allowedMethods())

console.log('App listen at PORT '+process.env.PORT)
const server = app.listen(process.env.PORT)
