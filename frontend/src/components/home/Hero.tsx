'use client';

import Link from 'next/link';
import { TypeAnimation } from 'react-type-animation';

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Decorative background grid */}
      <div 
        className="absolute inset-0 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm20 20h20v20H20V20zM0 20h20v20H0V20z' fill='%2316a34a' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E")` }}
      ></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-6 sm:pt-28 sm:pb-8 flex flex-col items-center text-center">
        
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-6 leading-none">
          <span className="block bg-gradient-to-r from-brand-primary to-green-400 bg-clip-text text-transparent pb-1 sm:pb-2">
            VSSUT BURLA
          </span>
          <span className="block text-4xl sm:text-6xl lg:text-7xl text-text-main mt-2 sm:mt-4 min-h-[1.2em]">
            <TypeAnimation
              sequence={[
                'ESPORTS',
                2000,
                'GAMING',
                2000,
                'TOURNAMENTS',
                2000
              ]}
              wrapper="span"
              speed={40}
              repeat={Infinity}
            />
          </span>
        </h1>
        
        <p className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          The official esports community of Veer Surendra Sai University of Technology. Join the battle, compete with the best, and rise to glory.
        </p>

        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 max-w-xl mx-auto">
          <Link 
            href="/games/valorant" 
            className="px-5 py-2.5 bg-brand-primary text-white rounded-lg font-bold text-sm hover:bg-brand-hover transition-all hover:-translate-y-0.5 shadow-md shadow-brand-primary/20 flex justify-center items-center"
          >
            Join Valorant
          </Link>
          <Link 
            href="/games/bgmi" 
            className="px-5 py-2.5 bg-transparent text-brand-primary border-2 border-brand-primary rounded-lg font-bold text-sm hover:bg-brand-primary/5 transition-all hover:-translate-y-0.5 flex justify-center items-center"
          >
            Explore BGMI
          </Link>
          <Link 
            href="/games/free-fire" 
            className="px-5 py-2.5 bg-brand-deep text-white rounded-lg font-bold text-sm hover:bg-green-900 transition-all hover:-translate-y-0.5 shadow-md shadow-brand-deep/20 flex justify-center items-center"
          >
            Play FreeFire
          </Link>
        </div>

      </div>
    </div>
  );
}
