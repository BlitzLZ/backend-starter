import { Router } from 'express'
import { healthController } from '../controller/health.controller'

// Si quieres condicionar acceso por entorno, puedes importar isDev/isProd...
// import { isDev, isProd, isStaging, isTest } from '../../utils/env'

const healthrouter = Router()

// GET /health
healthrouter.get('/health', healthController.status)
healthrouter.get('/health/db', healthController.statusDb)
healthrouter.get('/health/db/test/insert', healthController.dbTestInsert)


export default healthrouter