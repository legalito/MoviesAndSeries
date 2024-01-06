import Image from 'next/image'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from '../components/Hero/hero';
import Popular from '../components/Popular/popular';
import Release from '../components/Releases/release';
export default function Home() {
  return (
    <main>
      <nav>
        <Image src="/hbo-max-ctr.png" width={100} height={100} alt="logo" className='logo'  />
        <div>
          <p>Movies</p>
          <p>TV show</p>
          <p>Animations</p>
          <p>Upgrade</p>
        </div>
        <Image src="/search.png" width={30} height={30} alt="search" className='search'  />
      </nav>
      <Hero />
      <Popular />
      <Release />
    </main>
  )
}
