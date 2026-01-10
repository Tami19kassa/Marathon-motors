import { type SchemaTypeDefinition } from 'sanity'
import { vehicleType } from './vehicle'
import { newsType } from './news'
import { eventType } from './event'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [vehicleType, newsType, eventType],
}