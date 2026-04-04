import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef } from 'react'

const bentoItems = [
    {
        head: "New Arrivals", tag: 'Collections',
        img: 'https://images.ctfassets.net/p85mj7v2zszd/4U1zo0JwKnGWE18I56rJkg/4426dd35f9e56dcecc5f1bad531aefae/Menu_NEW_IN_desk.jpg?w=2000&h=1250&fm=avif'
    },
    {
        head: 'Greatest Hits', tag: 'Ferrari Museum',
        img: 'https://cdn.ferrari.com/cms/network/media/img/resize/6992ff26e4cf11001f727949-museum-greatest-hits-latest-v3?width=1440&height=900'
    },
    {
        head: 'Restored, just a richi raced it', tag: 'Magazine',
        img: 'https://ferrari.scene7.com/is/image/ferrari/YB68_250Testarossa_desk?fmt=avif-alpha&wid=1920&hei=1080&fit=constrain'
    },
    {
        head: 'Replica 2026',
        tag: 'Scuderia Ferrari F1',
        img: 'https://images.ctfassets.net/p85mj7v2zszd/4gPGGhmfYhxJXeULHEFLSK/45e58011eab538a6f5a794bb8fca226e/Menu_NEW_IN_desk.jpg?w=1440&h=900&fm=avif'
    },
    {
        head: 'A 50-year love affair', tag: 'Ferrari and Pininfarina',
        img: 'https://ferrari.scene7.com/is/image/ferrari/Landscape-606_029080?fmt=avif-alpha&wid=768&hei=1024&fit=constrain'
    },
]

const BentoCard = ({ item }) => {
    const imgRef = useRef(null)
    const textRef = useRef(null)
    useGSAP(() => {
        gsap.to(imgRef.current, {
            // scale: 1.2,
            objectPosition: '0% 0%',
            scrollTrigger: {
                trigger: imgRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        })

        gsap.fromTo(
            textRef.current,
            { x: -100, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: imgRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                }
            }
        )
    }, [])


    return (
        <div className='w-full h-screen relative'>
            <img ref={imgRef} src={item.img} alt={item.head} className='absolute left-0 top-0 size-full object-cover ' style={{ objectPosition: '0% 100%' }} />
            <div ref={textRef} className='absolute bottom-6 left-6 right-6 sm:right-auto max-w-xl'>
                <p className='inline-block mb-3 rounded-full bg-red-500/90 px-4 py-1 font-circular-web text-xs font-semibold uppercase tracking-[0.22em] text-white'>
                    {item.tag}
                </p>
                <h3 className='font-michroma text-2xl sm:text-3xl lg:text-4xl font-bold uppercase leading-tight text-white drop-shadow-[0_3px_14px_rgba(0,0,0,0.55)]'>
                    {item.head}
                </h3>
            </div>
        </div>
    )
}

const Bento = () => {
    return (
        <section className='w-screen min-h-screen'>
            {bentoItems.map((item, index) => (
                <BentoCard key={index} item={item} />
            ))}
        </section>
    )
}



export default Bento