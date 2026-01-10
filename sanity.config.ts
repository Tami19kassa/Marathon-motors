'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // This imports your vehicle, news, and event schemas
  schema,
  plugins: [
    // FIX: We removed the '{structure}' argument.
    // Now Sanity will simply list all your available content types automatically.
    structureTool(),
    
    // Vision is a tool that lets you query your content with GROQ in the studio
    visionTool({defaultApiVersion: apiVersion}),
  ],
})