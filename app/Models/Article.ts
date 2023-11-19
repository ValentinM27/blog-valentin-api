import { DateTime } from 'luxon'
import { BaseModel, HasMany, ManyToMany, column, hasMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Paragraph from './Paragraph'
import Tag from './Tag'

export default class Article extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @manyToMany(() => Tag)
  public tags: ManyToMany<typeof Tag>

  @column()
  public summary: string

  @column()
  public pictureUrl: string

  @hasMany(() => Paragraph)
  public paragraphs: HasMany<typeof Paragraph>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
