import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import healthrouter from './presentation/router/health.router'

require('dotenv').config()
const expressApp = express()

expressApp.use(cors())
expressApp.use(
  helmet({
    contentSecurityPolicy: false,
    xDownloadOptions: false,
  })
)
expressApp.use(express.json())


// Rutas
expressApp.use(healthrouter)

export { expressApp }
