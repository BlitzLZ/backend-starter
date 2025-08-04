import { expressApp } from './services.bootstrap'
import { MSSQLDataSource } from './typeorm/data-source'

const dbSql = MSSQLDataSource

// Tipado global de locals definido AQUÍ
declare global {
  namespace Express {
    interface Locals {
      scraper: {
        appClient: string
        startedAt: string
      }
      dataSource: import('typeorm').DataSource | null
    }
  }
}

// Carga env por entorno (opcional)
const env = (process.env.NODE_ENV || 'development').toLowerCase()
require('dotenv').config({ path: `.env.${env}` })

const { SERVICE_HTTP_PORT = 3000, NODE_ENV = 'development' } = process.env

// Locals base
expressApp.locals.scraper = {
  appClient: `ScraperService${NODE_ENV === 'development' ? '_DEV' : ''}`,
  startedAt: new Date().toISOString(),
}
expressApp.locals.dataSource = null

// Arranca servidor primero (para /health)
const server = expressApp.listen(SERVICE_HTTP_PORT, () => {
  console.log(`Scraper Service listening on port ${SERVICE_HTTP_PORT}`)
})

// Inicializa DB (no bloqueante)
dbSql.initialize()
  .then(() => {
    expressApp.locals.dataSource = dbSql
    console.log('Initialized Database Service (TypeORM)')
  })
  .catch((error) => {
    console.error('AppDataSourceError')
    console.error(error)
  })

// Shutdown ordenado
const shutdown = async (sig: string) => {
  console.log(`\n${sig} recibido. Cerrando...`)
  try {
    if (expressApp.locals.dataSource?.isInitialized) {
      await expressApp.locals.dataSource.destroy()
    }
  } catch {}
  server.close(() => process.exit(0))
  setTimeout(() => process.exit(1), 5000).unref()
}

process.on('SIGINT', () => shutdown('SIGINT'))
process.on('SIGTERM', () => shutdown('SIGTERM'))
