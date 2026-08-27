// @ts-nocheck
// This route is intentionally hidden from the router (underscore prefix).
// Kept for reference but not registered in the route tree.
import { createFileRoute } from '@tanstack/react-router'
import { PlaygroundTabs } from '../components/Playground/PlaygroundTabs'

export const Route = createFileRoute('/_playground')({
  component: PlaygroundTabs,
})
