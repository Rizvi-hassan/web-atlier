import Lenis from '@studio-freight/lenis';
import { useEffect, useState } from 'react'

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger'
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import NewsLetter from './components/NewsLetter';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true)
  const [isLoaderExiting, setIsLoaderExiting] = useState(false)

  useEffect(() => {
    const startExitTimer = setTimeout(() => {
      setIsLoaderExiting(true)
    }, 2600)

    const unmountLoaderTimer = setTimeout(() => {
      setLoading(false)
    }, 3300)

    return () => {
      clearTimeout(startExitTimer)
      clearTimeout(unmountLoaderTimer)
    }
  }, [])

  useEffect(() => {
    const lenis = new Lenis();

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, [])

  return (
    <main className='relative'>
      <Navbar />
      <Hero />
      <NewsLetter />

      {loading && (
        <div
          className={`fixed inset-0 z-90 bg-black transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isLoaderExiting ? '-translate-y-full' : 'translate-y-0'
            }`}
        >
          <img
            src='/images/logo.png'
            alt='Loading logo'
            className='absolute left-1/2 top-1/2 w-28 -translate-x-1/2 -translate-y-1/2'
          />
        </div>

      )}
    </main>
  )
}

export default App
