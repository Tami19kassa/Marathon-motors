import { defineField, defineType } from 'sanity'

export const vehicleType = defineType({
  name: 'vehicle',
  title: 'Vehicle Showroom',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'category', type: 'string', options: { list: ['EV', 'SUV', 'Sedan'] } }),
    defineField({ name: 'tagline', type: 'string', title: 'Marketing Tagline' }),
    defineField({ 
      name: 'modelFile', 
      title: '3D Model (.glb)', 
      type: 'file', 
      options: { accept: '.glb' } 
    }),
    defineField({ name: 'mainImage', type: 'image', options: { hotspot: true } }),
    defineField({ 
      name: 'transparentPng', 
      type: 'image', 
      title: 'Cutout Image (PNG with no background)',
      options: { hotspot: true }
    }),
    defineField({
        name: 'specs',
        type: 'object',
        fields: [
            defineField({ name: 'range', type: 'string', title: 'Range / Fuel Econ' }),
            defineField({ name: 'acceleration', type: 'string', title: '0-100 km/h' }),
            defineField({ name: 'topSpeed', type: 'string' }),
            defineField({ name: 'battery', type: 'string', title: 'Battery / Engine' }),
        ]
    }),
  ],
})