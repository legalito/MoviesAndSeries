import Image from 'next/image'
import Hero from '../../components/Hero/hero';
import Popular from '../../components/Popular/popular';
import Discover from '../../components/Discover/discover';
import FindPerGenre from '../../components/FindPerGenre/findPerGenre';
export default function Home() {
  return (
    <main>
      <Hero type="tv"  />
      <Popular type="tv" />
      <FindPerGenre type="tv"  />
    </main>
  )
}