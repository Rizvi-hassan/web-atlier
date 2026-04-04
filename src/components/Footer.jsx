import React from 'react'

const quickLinks = ['Racing', 'Sports Cars', 'Collection', 'Experience']
const socialLinks = ['Instagram', 'YouTube', 'X', 'LinkedIn']

const Footer = () => {
    const year = new Date().getFullYear()

    return (
        <footer className='relative w-screen overflow-hidden bg-black text-white'>
            <div className='pointer-events-none absolute inset-0 opacity-30'>
                <div className='absolute -top-20 left-1/3 h-72 w-72 rounded-full bg-red-500/35 blur-3xl' />
                <div className='absolute bottom-0 right-8 h-56 w-56 rounded-full bg-white/10 blur-3xl' />
            </div>

            <div className='relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 sm:px-10 md:grid-cols-3'>
                <div className='space-y-4'>
                    <p className='font-circular-web text-xs uppercase tracking-[0.28em] text-red-500'>Maranello Atelier</p>
                    <h3 className='font-michroma text-2xl uppercase leading-tight sm:text-3xl'>
                        Built for speed, designed for legacy.
                    </h3>
                    <p className='max-w-sm font-circular-web text-sm text-white/75'>
                        Explore a curated Ferrari universe of racing stories, iconic machines, and modern performance culture.
                    </p>
                </div>

                <div className='space-y-4'>
                    <p className='font-circular-web text-xs uppercase tracking-[0.25em] text-white/60'>Quick Links</p>
                    <ul className='space-y-2'>
                        {quickLinks.map((link) => (
                            <li key={link}>
                                <a href='#' className='font-jura text-base uppercase tracking-wide text-white/85 transition-colors duration-300 hover:text-red-500'>
                                    {link}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='space-y-4'>
                    <p className='font-circular-web text-xs uppercase tracking-[0.25em] text-white/60'>Connect</p>
                    <p className='font-circular-web text-sm text-white/75'>
                        contact@maranello-atelier.com
                    </p>
                    <div className='flex flex-wrap gap-3'>
                        {socialLinks.map((social) => (
                            <a
                                key={social}
                                href='#'
                                className='rounded-full border border-white/25 px-4 py-2 font-jura text-xs uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:border-red-500 hover:bg-red-500 hover:text-white'
                            >
                                {social}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <div className='relative border-t border-white/15 px-6 py-5 sm:px-10'>
                <div className='mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 sm:flex-row sm:items-center'>
                    <p className='font-circular-web text-xs uppercase tracking-[0.2em] text-white/60'>
                        Copyright {year} Maranello Atelier
                    </p>
                    <p className='font-circular-web text-xs uppercase tracking-[0.2em] text-white/45'>
                        Crafted in motion
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer