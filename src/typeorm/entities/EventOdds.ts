import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm'

/**
 * Cuota normalizada por selección (ej.: 1X2 -> home/draw/away)
 * Unicidad: bookmaker + eventExternalId + market + selection
 */
@Entity('event_odds')
@Index(['bookmaker', 'eventExternalId', 'market', 'selection'], { unique: true })
export class EventOdds {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'nvarchar', length: 50 })
  bookmaker!: string

  @Column({ name: 'event_external_id', type: 'nvarchar', length: 100 })
  eventExternalId!: string

  @Column({ type: 'nvarchar', length: 64 })
  sport!: string

  @Column({ type: 'nvarchar', length: 200 })
  league!: string

  @Column({ name: 'home_team', type: 'nvarchar', length: 200 })
  homeTeam!: string

  @Column({ name: 'away_team', type: 'nvarchar', length: 200 })
  awayTeam!: string

  @Column({ type: 'datetime2' })
  kickoff!: Date

  @Column({ type: 'nvarchar', length: 64 })
  market!: string 

  @Column({ type: 'nvarchar', length: 64 })
  selection!: string

  @Column('decimal', { precision: 8, scale: 3 })
  odds!: string

  @Column('decimal', { precision: 8, scale: 3, nullable: true })
  margin?: string

  @Column({ name: 'source_url', type: 'nvarchar', length: 500, nullable: true })
  sourceUrl?: string

  @CreateDateColumn({ name: 'created_at', type: 'datetime2' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime2' })
  updatedAt!: Date
}
