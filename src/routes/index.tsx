import { createFileRoute } from '@tanstack/react-router'
import { HeroSection } from '../components/Home/HeroSection'
import { BentoGrid } from '../components/Home/BentoGrid'
import { PlaygroundLinks } from '../components/Home/PlaygroundLinks'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div>
      <HeroSection />
      <BentoGrid />
      <PlaygroundLinks />
    </div>
  )
}
