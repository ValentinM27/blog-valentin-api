import { DateTime } from 'luxon'
import { BaseModel, ManyToMany, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Article from './Article'

export default class Tag extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public content: string

  @manyToMany(() => Article)
  public articles: ManyToMany<typeof Article>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
