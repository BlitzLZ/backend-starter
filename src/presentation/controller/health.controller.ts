import { Request, Response } from 'express'
import { EventOdds } from '../../typeorm/entities/EventOdds'

interface data {
  service: string
  version: string
  env: string
  uptime_sec: number
  startedAt?: Date
}

interface ApiResponse {
  status: 'OK' | 'NOT_OK'
  statusCode: number
  message: string
  data: data | null
  computed_time_ms?: number
}

export const healthController = {
  status: async (req: Request, res: Response) => {
    //const { appClient, startedAt } = req.app.locals.scraper

    const start = Date.now()
    try {
      const pkg = require('../../../package.json')
      
      const startedAtRaw = res.app?.locals?.scraper?.startedAt

      const data = {
        service: process.env.SERVICE_NAME || 'scraper-service',
        version: pkg.version,
        env: process.env.NODE_ENV || 'development',
        uptime_sec: process.uptime(),
        startedAt: startedAtRaw ? new Date(startedAtRaw) : undefined,
      }

      const response: ApiResponse = {
        status: 'OK',
        statusCode: 200,
        message: 'Service healthy',
        data,
        computed_time_ms: Date.now() - start,
      }
      return res.status(200).json(response)
    } catch (e: any) {
      const response: ApiResponse = {
        status: 'NOT_OK',
        statusCode: 500,
        message: e?.message || 'Internal Server Error',
        data: null,
        computed_time_ms: Date.now() - start,
      }
      return res.status(500).json(response)
    }
  },
  statusDb: async (req: Request, res: Response) => {
    const ds = res.app.locals.dataSource
    const dbConnected = !!ds?.isInitialized

    return res.status(200).json({
      status: dbConnected ? 'OK' : 'DEGRADED',
      statusCode: 200,
      message: 'Healthcheck',
      data: {
        appClient: res.app.locals.scraper.appClient,
        startedAt: res.app.locals.scraper.startedAt,
        env: process.env.NODE_ENV || 'development',
        db: { engine: 'postgres', connected: dbConnected },
        uptime_sec: process.uptime(),
      },
    })
  },

  dbTestInsert: async (req: Request, res: Response) => {
const ds = req.app.locals.dataSource
    if (!ds?.isInitialized) return res.status(503).json({ message: 'DB not initialized' })

    const repo = ds.getRepository(EventOdds)

    // Clave única según tu @Index en EventOdds
    const key = {
      bookmaker: 'TestBook',
      eventExternalId: 'DEMO-001',
      market: '1x2',
      selection: 'home',
    }

    // 1) Si ya existe, devuélvelo
    const existing = await repo.findOne({ where: key })
    if (existing) return res.json({ existed: true, row: existing })

    // 2) Si no existe, crea uno con datos random
    const now = Date.now()
    const entity = repo.create({
      ...key,
      sport: 'football',
      league: 'Demo League',
      homeTeam: 'John Doe FC',
      awayTeam: 'AC Random',
      kickoff: new Date(now + 60 * 60 * 1000),
      odds: (1 + Math.random() * 2).toFixed(3),
      margin: '0.000',
      sourceUrl: 'https://example.com/demo',
    })

    const saved = await repo.save(entity)
    return res.status(201).json({ existed: false, row: saved })
  }
}
