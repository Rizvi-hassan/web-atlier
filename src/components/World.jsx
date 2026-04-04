import React, { useRef } from 'react'
import AnimatedTitle from './AnimatedTitle'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const World = () => {
    useGSAP(() => {
        const clipAnimation = gsap.timeline({
            scrollTrigger: {
                trigger: '#clip',
                start: 'center center',
                end: "+=800 center",
                scrub: 0.5,
                pin: true,
                pinSpacing: true,
            }
        })

        clipAnimation.to('.mask-clip-path', {
            width: '100vw',
            height: '100vh',
            borderRadius: 0
        })
    }, [])
    return (
        <section className='w-screen min-h-screen relative'>
            <AnimatedTitle title={"Explo<b>r</b>e the <b>F</b>errari <b>W</b>orld"} containerClass={'text-black'} />

            <div className='about-subtext relative  text-center w-full'>
                <p>Enter the world of Ferrari</p>
                <p>Ferrari is a brand that represents the pinnacle of automotive engineering and performance.</p>
            </div>

            <div className='h-dvh w-full mt-10' id='clip'>
                <div className='mask-clip-path about-image'>
                    <img
                        src='/images/ferarriWorld.jpeg'
                        alt='Background'
                        className='aboslute left-0 top-0 size-full object-center object-cover'
                    />
                </div>
            </div>
        </section>
    )
}

export default World