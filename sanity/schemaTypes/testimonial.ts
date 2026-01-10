import { defineField, defineType } from 'sanity'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Customer Testimonials',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', title: 'Customer Name' }),
    defineField({ name: 'role', type: 'string', title: 'Position/Title', description: 'e.g. CEO of X Corp' }),
    defineField({ name: 'quote', type: 'text', title: 'The Testimonial' }),
    defineField({ name: 'avatar', type: 'image', title: 'Customer Photo' }),
    defineField({ name: 'rating', type: 'number', validation: Rule => Rule.min(1).max(5) }),
  ]
})