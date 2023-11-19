import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

import Article from 'App/Models/Article'

export default class ArticlesController {
  public async getAll(): Promise<Array<Article>> {
    return await Article.all()
  }

  public async getById(ctx: HttpContextContract) {
    return await Article.find(ctx.params.id)
  }

  public async create(ctx: HttpContextContract) {
    try {
      const articleSchema = schema.create({
        title: schema.string(),
        tags: schema.array.optional().anyMembers(),
        summary: schema.string.optional(),
        pictureUrl: schema.string.optional(),
        paragraphs: schema.array.optional().anyMembers(),
      })

      const payload = await ctx.request.validate({ schema: articleSchema })

      return await Article.create(payload)
    } catch (error) {
      return ctx.response.status(400).json(error.message)
    }
  }

  public async delete(ctx: HttpContextContract) {
    try {
      return await (await Article.findOrFail(ctx.params.id)).delete()
    } catch (error) {
      return ctx.response.status(404).json(error.message)
    }
  }
}
