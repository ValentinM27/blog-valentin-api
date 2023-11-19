import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Paragraph extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public subtitle: string

  @column()
  public content: string

  @column()
  public articleId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
