import React, { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedTitle from './AnimatedTitle'

gsap.registerPlugin(ScrollTrigger)

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
    const [activeCard, setActiveCard] = useState(0)
    const contentRefs = useRef([])
    const imageRefs = useRef([])
    const containerRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Create scroll trigger for each news item
            contentRefs.current.forEach((content, index) => {
                if (!content) return

                ScrollTrigger.create({
                    trigger: content,
                    start: 'top center',
                    end: 'bottom center',
                    onEnter: () => setActiveCard(index),
                    onEnterBack: () => setActiveCard(index),
                })
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    useEffect(() => {
        // Fade in/out images based on active card
        imageRefs.current.forEach((img, index) => {
            if (!img) return

            gsap.to(img, {
                opacity: index === activeCard ? 1 : 0.3,
                scale: index === activeCard ? 1 : 0.95,
                duration: 0.5,
                ease: 'power2.out'
            })
        })

        // Highlight active content
        contentRefs.current.forEach((content, index) => {
            if (!content) return

            gsap.to(content, {
                opacity: index === activeCard ? 1 : 0.5,
                duration: 0.4,
                ease: 'power2.out'
            })
        })
    }, [activeCard])

    return (
        <div ref={containerRef} className='relative w-screen py-20 px-4 bg-gradient-to-b from-white to-gray-50'>
            <div className='max-w-7xl mx-auto'>
                <AnimatedTitle
                    title={"Disc<b>o</b>ver th<b>e</b> world`s F<b>e</b>rarri News"}
                    containerClass={'text-black mb-20'}
                />

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start'>
                    {/* Sticky Image Section */}
                    <div className='relative lg:sticky lg:top-20 h-[500px] lg:h-[600px]'>
                        <div className='relative w-full h-full rounded-2xl overflow-hidden'>
                            {news.map((item, index) => (
                                <img
                                    key={index}
                                    ref={(el) => (imageRefs.current[index] = el)}
                                    src={item.img}
                                    alt={item.head}
                                    className='absolute inset-0 w-full h-full object-cover transition-opacity duration-500'
                                    style={{
                                        opacity: index === activeCard ? 1 : 0,
                                        zIndex: index === activeCard ? 10 : 1
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Scrolling Content Section */}
                    <div className='flex flex-col gap-20 lg:gap-32'>
                        {news.map((item, index) => (
                            <div
                                key={index}
                                ref={(el) => (contentRefs.current[index] = el)}
                                className='flex flex-col gap-6 min-h-[400px] transition-opacity duration-300'
                            >
                                <div className='flex items-center gap-4'>
                                    <div className='flex items-center justify-center w-10 h-10 rounded-full bg-blue-300 text-blue-900 font-bold text-sm'>
                                        {index + 1}
                                    </div>
                                    <div className='h-px flex-1 bg-gradient-to-r from-blue-300 to-transparent' />
                                </div>

                                <h2 className='font-michroma text-2xl sm:text-3xl lg:text-4xl font-bold uppercase leading-tight text-blue-200'>
                                    {item.head}
                                </h2>

                                <p className='font-circular-web text-base sm:text-lg text-blue-75 leading-relaxed'>
                                    {item.desc}
                                </p>

                                <div className='flex gap-3 pt-4'>
                                    <button className='px-6 py-3 bg-blue-300 text-blue-900 font-semibold rounded-lg hover:bg-blue-400 transition-colors duration-300'>
                                        Read More
                                    </button>
                                    <button className='px-6 py-3 border border-blue-300 text-blue-200 font-semibold rounded-lg hover:bg-blue-300 hover:text-blue-900 transition-colors duration-300'>
                                        Share
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Progress Indicator */}
                <div className='fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg z-50'>
                    {news.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                contentRefs.current[idx]?.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'center'
                                })
                            }}
                            className={`h-2 rounded-full transition-all duration-300 ${idx === activeCard ? 'w-8 bg-blue-300' : 'w-2 bg-blue-75'
                                }`}
                            aria-label={`Go to news ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default NewsLetter