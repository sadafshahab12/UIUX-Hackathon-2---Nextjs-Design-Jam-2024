import { type SchemaTypeDefinition } from 'sanity'
import {  furnitureSchema } from './furniture'
import { user } from './user'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [furnitureSchema, user],
}
