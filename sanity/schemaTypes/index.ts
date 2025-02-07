import { type SchemaTypeDefinition } from 'sanity'
import {  furnitureSchema } from './furniture'
import {  orderSchema } from './order'
import { customerSchema } from './customer'
import { rentalCustomer } from './rentalCustomer'
import { rentalOrder } from './rentalOrder'



export const schema: { types: SchemaTypeDefinition[] } = {
  types: [furnitureSchema, orderSchema, customerSchema, rentalCustomer, rentalOrder],
}
