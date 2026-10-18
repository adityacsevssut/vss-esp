'use client';

import Link from 'next/link';
import { TypeAnimation } from 'react-type-animation';

export default function Hero() {
  return (
    <div className="relative w-full" style={{ height: '100vh' }}>

      {/* ── VIDEO BACKGROUND ── */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/esports_poster.jpg"
      >
        <source src="/videos/esports_hero.mp4" type="video/mp4" />
      </video>

      {/* ── OVERLAY ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80" />

      {/* ── HERO CONTENT — centered ── */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-8">

        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-5 leading-none">
          <span className="block drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
            <span className="text-white">VSSUT </span><span className="text-brand-primary">BURLA</span>
          </span>
          <span className="block text-3xl sm:text-5xl lg:text-6xl mt-3 sm:mt-4 min-h-[1.2em]
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

        <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto mb-10 leading-relaxed font-light tracking-wide">
          The official esports community of Veer Surendra Sai University of Technology.
          <br className="hidden sm:block" />
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
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/40 animate-bounce">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}
