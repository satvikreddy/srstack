import { createBuilder } from 'fluent-convex'
import type { DataModel } from '../_generated/dataModel'
import { WithZod } from 'fluent-convex/zod'

export const convex = createBuilder<DataModel>()

export const convexQuery = convex.query().extend(WithZod)

export const convexMutation = convex.mutation().extend(WithZod)
