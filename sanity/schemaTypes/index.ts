import { type SchemaTypeDefinition } from 'sanity'
import {  furnitureSchema } from './furniture'
import {  orderSchema } from './order'
import { customerSchema } from './customer'



export const schema: { types: SchemaTypeDefinition[] } = {
  types: [furnitureSchema, orderSchema, customerSchema],
}
