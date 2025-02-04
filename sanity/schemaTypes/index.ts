import { type SchemaTypeDefinition } from 'sanity'
import {  furnitureSchema } from './furniture'
import {  orderSchema } from './order'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [furnitureSchema, orderSchema],
}
