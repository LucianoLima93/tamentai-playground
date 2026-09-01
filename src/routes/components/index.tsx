import { createFileRoute, redirect } from '@tanstack/react-router'
import { getFirstSlug } from '../../components/ComponentsGallery/registry'

export const Route = createFileRoute('/components/')({
  beforeLoad: () => {
    throw redirect({
      to: '/components/$componentId',
      params: { componentId: getFirstSlug() },
    })
  },
})
