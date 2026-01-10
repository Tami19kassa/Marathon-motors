export const newsType = {
  name: 'news',
  title: 'Company News',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'publishedAt', type: 'datetime' },
    { name: 'image', type: 'image' },
    { name: 'content', type: 'text' },
  ]
}

export const eventType = {
  name: 'event',
  title: 'Upcoming Events',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'date', type: 'date' },
    { name: 'location', type: 'string' },
    { name: 'image', type: 'image' },
  ]
}