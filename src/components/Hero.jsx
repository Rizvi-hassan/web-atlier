import React, { useState, useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const tags = [
    { head: 'new Arrivals', tag: 'Coll<b>e</b>ctions', desc: 'Discover the latest additions to our exclusive collection. From cutting-edge designs to timeless classics, explore the new arrivals that define style and innovation.' },
    { head: 'start your engines', tag: 'S<b>p</b>orts Cars', desc: 'Unleash the power of high-performance sports cars.' },
    { head: 'scuderia ferrari', tag: 'Ra<b>c</b>ing', desc: 'Experience the thrill of Formula 1 with our exclusive Ferrari collection.' },
]

const toHtml = (value) => ({ __html: value ?? '' });

const Hero = () => {
    const [currentIdx, setCurrentIdx] = useState(1);
    const [oddIdx, setOddIdx] = useState(2);
    const [evenIdx, setEvenIdx] = useState(1);
    const [isOddActive, setIsOddActive] = useState(false);
    const [hasClicked, setHasClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedVideos, setLoadedVideos] = useState(0);

    const totalVideos = 3;
    const oddVideoRef = useRef(null)
    const evenVideoRef = useRef(null)

    const nextVideoIndex = (currentIdx % totalVideos) + 1;
    const handleMiniVdClick = () => {
        if (isOddActive) {
            setEvenIdx(nextVideoIndex);
        } else {
            setOddIdx(nextVideoIndex);
        }
        setHasClicked(true);
        setCurrentIdx(nextVideoIndex);
    }

    const getVideoSrc = (index) => `videos/video_${index}.mp4`

    const handleVideoLoad = () => { setLoadedVideos(prev => prev + 1) }

    useGSAP(() => {
        if (hasClicked) {
            let tl = gsap.timeline();

            if (!isOddActive) {
                gsap.set(oddVideoRef.current, { visibility: 'visible' });

                tl.fromTo(oddVideoRef.current, {
                    width: '256px',
                    height: '256px',
                    borderRadius: '8px'
                }, {
                    scale: 1,
                    width: '100%',
                    height: '100%',
                    borderRadius: '0px',
                    duration: 1,
                    ease: 'power1.inOut',
                    onStart: () => oddVideoRef.current.play(),
                })
                tl.set(evenVideoRef.current, {
                    width: '256px',
                    height: '256px',
                    borderRadius: '8px',
                    visibility: 'hidden',
                    zIndex: 20,
                    onComplete: () => {
                        evenVideoRef.current.pause();
                        setIsOddActive(true);
                    }
                }, ">")
                tl.set(oddVideoRef.current, { zIndex: 0 })

            } else {
                gsap.set(evenVideoRef.current, { visibility: 'visible' });

                tl.fromTo(evenVideoRef.current, {
                    width: '256px',
                    height: '256px',
                    borderRadius: '8px'
                }, {
                    scale: 1,
                    width: '100%',
                    height: '100%',
                    borderRadius: '0px',
                    duration: 1,
                    ease: 'power1.inOut',
                    onStart: () => evenVideoRef.current.play(),
                })

                tl.set(oddVideoRef.current, {
                    width: '256px',
                    height: '256px',
                    borderRadius: '8px',
                    visibility: 'hidden',
                    zIndex: 20,
                    onComplete: () => {
                        oddVideoRef.current.pause();
                        setIsOddActive(false);
                    }
                }, ">")
                tl.set(evenVideoRef.current, { zIndex: 0 }, "<")
            }

            gsap.from("#current-video", {
                transformOrigin: "center center",
                scale: 0,
                duration: 1.5,
                ease: 'power1.inOut'
            })
        }
    }, { dependencies: [currentIdx] })

    useGSAP(() => {
        gsap.to('#video-frame', {
            clipPath: 'polygon(0 0, 80% 0, 90% 85%, 5% 95%)',
            borderRadius: '8px',
            scrollTrigger: {
                trigger: '#video-frame',
                start: 'bottom bottom',
                end: 'bottom 20%',
                scrub: true
            }
        })
    }, [])

    useGSAP(() => {
        gsap.from('.hero-heading', {
            x: -500,
            opacity: 0,
            duration: 1,
            ease: 'power1.out',
        })
        gsap.from('.hero-tag', {
            x: 400,
            opacity: 0,
            duration: 1,
            ease: 'power1.out',
        })
    }, [currentIdx])

    return (
        <div className='relative h-dvh w-screen overflow-x-hidden'>
            <div id='video-frame' className='relative mask-clip-path z-10 h-dvh w-screen overflow-hidden bg-blue-75'>
                <div>
                    <div className='abs-center z-50 size-64 cursor-pointer overflow-hidden rounded-lg'>
                        <div onClick={handleMiniVdClick} className='origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100'>
                            <video
                                src={getVideoSrc(nextVideoIndex)}
                                loop
                                muted
                                id='current-video'
                                className='size-64 origin-center sacle-150 object-cover object-center rounded-lg'
                                onLoadedData={handleVideoLoad}
                            />
                        </div>
                    </div>

                    <video
                        ref={oddVideoRef}
                        src={getVideoSrc(oddIdx)}
                        loop
                        muted
                        id='next-video'
                        className='abs-center z-20 size-64 invisible object-cover object-center'
                        onLoadedData={handleVideoLoad}
                    />
                    <video
                        ref={evenVideoRef}
                        src={getVideoSrc(evenIdx)}
                        autoPlay
                        loop
                        muted
                        className='abs-center origin-center size-full object-cover object-center'
                        onLoadedData={handleVideoLoad}
                    />
                </div>

                <h1 className='hero-tag absolute bottom-5 right-5 z-40 special-font !text-red-500'
                    dangerouslySetInnerHTML={toHtml(tags[currentIdx - 1]?.tag)}
                />

                <div className='absolute left-0 top-0 z-40 size-full'>
                    <div className='mt-24 px-5 sm:px-10'>
                        <h1
                            className=' hero-heading  text-blue-100 special-font opacity-100'
                            dangerouslySetInnerHTML={toHtml(tags[currentIdx - 1]?.head)}
                        />
                        {/* <p className='desc mb-5 max-w-72 font-robert-regular text-white'>{tags[currentIdx - 1]?.desc}</p> */}

                    </div>
                </div>

            </div>
            <h1 className='hero-tag absolute bottom-5 right-5 -z-40 special-font text-black'
                    dangerouslySetInnerHTML={toHtml(tags[currentIdx - 1]?.tag)}/>



        </div>
    )

}

export default Hero