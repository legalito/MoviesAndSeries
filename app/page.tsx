import Image from 'next/image'
import Hero from '../components/Hero/hero';
import Popular from '../components/Popular/popular';
import Release from '../components/Releases/release';
import FindPerGenre from '../components/FindPerGenre/findpergenre';
export default function Home() {
  return (
    <main>
      <Hero type="movie" />
      <Popular type="movie" />
      <Release  />
      <FindPerGenre type="movie" />
    </main>
  )
}
