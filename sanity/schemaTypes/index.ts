import { type SchemaTypeDefinition } from 'sanity'
import {  furnitureSchema } from './furniture'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [furnitureSchema],
}
