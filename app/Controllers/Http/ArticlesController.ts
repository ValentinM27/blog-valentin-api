import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

import Article from 'App/Models/Article'
import Tag from 'App/Models/Tag'

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

      const newArticle = await Article.create(payload)

      if (payload.paragraphs) {
        await newArticle.related('paragraphs').createMany(payload.paragraphs)
      }

      if (payload.tags) {
        const existingTags = await Tag.all()
        const existingTagsContent = existingTags.map((e: Tag) => e.content)

        // Nouveaux tags
        const tagsToSave: Tag[] = payload.tags.filter(
          (tag) => !existingTagsContent.includes(tag.content)
        )

        const newTags: number[] = (await newArticle.related('tags').createMany(tagsToSave)).map(
          (tag) => tag.id
        )

        // Tags existanst
        const tagsToSync: string[] = payload.tags
          .filter((tag) => existingTagsContent.includes(tag.content))
          .map((tag) => tag.content)

        // Listes des id à rattacher
        const tagsToSyncId: number[] = existingTags
          .filter((tag) => tagsToSync.includes(tag.content))
          .map((tag) => tag.id)
          .concat(newTags)

        await newArticle.related('tags').sync(tagsToSyncId)
      }

      return newArticle
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
