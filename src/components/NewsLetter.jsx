import React, { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import AnimatedTitle from './AnimatedTitle'

gsap.registerPlugin(TextPlugin)

const news = [
    {
        head: 'ITALY HALF MARATHON 2026: 15,000 REGISTERED RUNNERS',
        desc: 'In a weekend that will remain etched in the memories of thousands of participants and spectators, the 2026 edition of the Italy Half Marathon - Enzo Ferrari Memorial has come to a close.',
        img: 'https://ferrari.scene7.com/is/image/ferrari/mezza-maratona-gtw2?fmt=avif-alpha&wid=530&hei=597&fit=constrain'
    },
    {
        head: 'FERRARI AND PIRELLI CELEBRATE 70 YEARS OF PARTNERSHIP',
        desc: 'Ferrari and Pirelli are celebrating 70 years of partnership in 2024, a milestone that underscores their shared commitment to excellence, innovation, and performance in the world of motorsport.',
        img: 'https://ferrari.scene7.com/is/image/ferrari/ferrari-luce-magazine-news-RULLO2?fmt=avif-alpha&wid=530&hei=597&fit=constrain'
    },
    {
        head: 'FERRARI UNVEILS 2026 LIVERY OF 499P SET TO DEFEND FIA WEC WORLD TITLES',
        desc: "Ferrari has officially launched the 2026 season, which will see the Prancing Horse return to the FIA World Endurance Championship to defend the Manufacturers' and Drivers' world titles secured in an unforgettable and already historic 2025 campaign.",
        img: 'https://ferrari.scene7.com/is/image/ferrari/ferrari-unveils-2026-livery-of-499p-GTW2?fmt=avif-alpha&wid=530&hei=597&fit=constrain'
    }
]

const NewsLetter = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const headingRef = useRef(null)
    const descriptionRef = useRef(null)
    const imageRef = useRef(null)
    const containerRef = useRef(null)

    const animateSlide = (nextIndex) => {
        const tl = gsap.timeline()

        // Fade out image
        tl.to(imageRef.current, {
            opacity: 0,
            duration: 0.4,
            ease: 'power2.out'
        }, 0)

        // Animate out current text
        tl.to(
            headingRef.current,
            {
                opacity: 0,
                y: -20,
                duration: 0.4,
                ease: 'power2.out'
            },
            0
        )

        tl.to(
            descriptionRef.current,
            {
                opacity: 0,
                y: -20,
                duration: 0.4,
                ease: 'power2.out'
            },
            0.1
        )

        // Update index and content after animation
        tl.call(() => {
            setCurrentIndex(nextIndex)
        })

        // We'll handle the incoming animation in useEffect when content updates
    }

    useEffect(() => {
        const currentNews = news[currentIndex]
        const tl = gsap.timeline()

        // Update content
        headingRef.current.textContent = currentNews.head
        descriptionRef.current.textContent = currentNews.desc
        imageRef.current.src = currentNews.img

        // Animate in incoming image with fade
        tl.fromTo(
            imageRef.current,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 0.6,
                ease: 'power2.inOut'
            },
            0
        )

        // Animate in heading character by character
        tl.fromTo(
            headingRef.current,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power2.out'
            },
            0.2
        )

        // Animate in description
        tl.fromTo(
            descriptionRef.current,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power2.out'
            },
            0.35
        )

        return () => {
            tl.kill()
        }
    }, [currentIndex])

    const handleNext = () => {
        animateSlide((currentIndex + 1) % news.length)
    }

    const handlePrev = () => {
        animateSlide((currentIndex - 1 + news.length) % news.length)
    }

    return (
        <div ref={containerRef} className='relative w-screen py-20 px-4'>
            <div className='max-w-7xl mx-auto'>

                <AnimatedTitle title={"Disc<b>o</b>ver th<b>e</b> world`s F<b>e</b>rarri News"} containerClass={'text-black'}/>
                
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center justify-items-center lg:justify-items-start mt-10'>
                    {/* Image Section */}
                    <div className='relative overflow-hidden rounded-xl h-96 lg:h-125'>
                        <img
                            ref={imageRef}
                            src={news[currentIndex].img}
                            alt={news[currentIndex].head}
                            className='w-full h-full object-cover'
                        />
                    </div>

                    {/* Text Section */}
                    <div className='flex flex-col gap-6'>
                        <h2
                            ref={headingRef}
                            className='font-michroma text-2xl sm:text-3xl lg:text-4xl font-bold uppercase leading-tight text-blue-200'
                        >
                            {news[currentIndex].head}
                        </h2>

                        <p
                            ref={descriptionRef}
                            className='font-circular-web text-sm sm:text-base text-blue-75 leading-relaxed'
                        >
                            {news[currentIndex].desc}
                        </p>

                        {/* Navigation Controls */}
                        <div className='flex gap-4 pt-4'>
                            <button
                                onClick={handlePrev}
                                className='flex items-center justify-center w-12 h-12 border border-blue-300 rounded-lg hover:bg-blue-300 transition-colors duration-300'
                                aria-label='Previous news'
                            >
                                <svg
                                    className='w-5 h-5 text-blue-300 hover:text-blue-200'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M15 19l-7-7 7-7'
                                    />
                                </svg>
                            </button>

                            <button
                                onClick={handleNext}
                                className='flex items-center justify-center w-12 h-12 border border-blue-300 rounded-lg hover:bg-blue-300 transition-colors duration-300'
                                aria-label='Next news'
                            >
                                <svg
                                    className='w-5 h-5 text-blue-300 hover:text-blue-200'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M9 5l7 7-7 7'
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Slide Indicator */}
                        <div className='flex gap-2 pt-2'>
                            {news.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => animateSlide(idx)}
                                    className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-blue-300' : 'w-2 bg-blue-75'
                                        }`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewsLetter