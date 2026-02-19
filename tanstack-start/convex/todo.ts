import { z } from 'zod'
import { convexMutation, convexQuery } from './lib/builder'
import { todoSchema } from './schema'

export const list = convexQuery
  .handler(async (ctx) => {
    return ctx.db.query('todos').order('desc').collect()
  })
  .public()

export const create = convexMutation
  .input(z.object({ text: todoSchema.shape.text }))
  .handler(async (ctx, { text }) => {
    return ctx.db.insert('todos', {
      text,
      completed: false,
      createdAt: Date.now(),
    })
  })
  .public()

export const toggle = convexMutation
  .input(z.object({ id: z.string() }))
  .handler(async (ctx, { id }) => {
    const todo = await ctx.db.get(id as any)
    if (!todo) throw new Error('Todo not found')
    await ctx.db.patch(id as any, { completed: !todo.completed })
    return null
  })
  .public()

export const remove = convexMutation
  .input(z.object({ id: z.string() }))
  .handler(async (ctx, { id }) => {
    await ctx.db.delete(id as any)
    return null
  })
  .public()
