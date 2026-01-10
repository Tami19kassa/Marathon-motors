import { type SchemaTypeDefinition } from 'sanity'
import { vehicleType } from './vehicle'
import { newsType } from './news'
import { eventType } from './event'
import { testimonialType } from './testimonial'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [vehicleType, newsType, eventType, testimonialType],
}