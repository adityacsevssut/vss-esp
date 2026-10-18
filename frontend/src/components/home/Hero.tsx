'use client';

import Link from 'next/link';
import { TypeAnimation } from 'react-type-animation';

export default function Hero() {
  return (
    <div className="relative w-full bg-black overflow-hidden" style={{ height: '100vh' }}>

      {/* ── HIGH-DEFINITION CINEMATIC VIDEO BACKGROUND ── */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/esports_poster.jpg"
      >
        <source src="/videos/esports_hero.mp4" type="video/mp4" />
      </video>

      {/* ── OVERLAY ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-black/90 pointer-events-none" />

      {/* ── HERO CONTENT — moved lower with top spacing ── */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">

        <h1 className="text-4xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-4 sm:mb-5 leading-none">
          <span className="block drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
            <span className="text-white">VSSUT </span><span className="text-brand-primary">BURLA</span>
          </span>
          <span className="block text-2xl sm:text-5xl lg:text-6xl mt-2 sm:mt-4 min-h-[1.2em]
                           bg-gradient-to-r from-amber-300 via-white to-amber-200
                           bg-clip-text text-transparent
                           drop-shadow-[0_0_24px_rgba(251,191,36,0.3)]">
            <TypeAnimation
              sequence={[
                'ESPORTS',     2200,
                'GAMING',      2200,
                'TOURNAMENTS', 2200,
              ]}
              wrapper="span"
              speed={45}
              repeat={Infinity}
            />
          </span>
        </h1>

        <p
          className="text-white/90 font-medium max-w-full mx-auto mb-7 sm:mb-9 px-2 whitespace-nowrap tracking-tight sm:tracking-normal text-center"
          style={{ fontSize: 'clamp(10.5px, 2.7vw, 18px)' }}
        >
          Join the battle, compete with the best, and rise to glory.
        </p>

        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4">
          <Link
            href="/games/valorant"
            className="px-6 py-3 bg-white text-gray-900 rounded-lg font-bold text-sm
                       hover:bg-gray-100 transition-all hover:-translate-y-0.5
                       shadow-lg shadow-black/30 flex justify-center items-center"
          >
            Join Valorant
          </Link>
          <Link
            href="/games/bgmi"
            className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white
                       border border-white/25 rounded-lg font-bold text-sm
                       hover:bg-white/20 transition-all hover:-translate-y-0.5
                       flex justify-center items-center"
          >
            Explore BGMI
          </Link>
          <Link
            href="/games/free-fire"
            className="px-6 py-3 bg-brand-primary text-white rounded-lg font-bold text-sm
                       hover:bg-brand-hover transition-all hover:-translate-y-0.5
                       shadow-lg shadow-brand-primary/30 flex justify-center items-center"
          >
            Play FreeFire
          </Link>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#featured-games"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/50 hover:text-white transition-colors animate-bounce cursor-pointer p-2"
        aria-label="Scroll to featured games"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </a>
    </div>
  );
}
