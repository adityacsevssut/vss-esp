'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChevronDown,
  Gamepad2,
  Handshake,
} from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const isHomePage = pathname === '/';

  // Reset dropdown when route changes
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  // Track scroll position — only matters on homepage
  useEffect(() => {
    if (!isHomePage) return;
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  // Handle click outside and Escape key to close popup
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // On homepage: transparent until scrolled. On other pages: always white/blurred.
  const isTransparent = isHomePage && !scrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isTransparent
          ? 'bg-transparent border-transparent'
          : 'bg-white/90 backdrop-blur-md border-b border-brand-border shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <span
                className={`font-black italic text-4xl transition-colors duration-300 ${
                  isTransparent ? 'text-brand-primary drop-shadow-lg' : 'text-brand-primary'
                }`}
              >
                VE
              </span>
              <span
                className={`font-bold text-2xl tracking-tight transition-colors duration-300 ${
                  isTransparent ? 'text-white drop-shadow-md' : 'text-text-main'
                }`}
              >
                Vss<span className="text-brand-primary">Esp</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-lg">
            {[
              { label: 'Home',        href: '/' },
              { label: 'Tournaments', href: '/tournaments' },
              { label: 'Freefire',    href: '/games/free-fire' },
              { label: 'BGMI',        href: '/games/bgmi' },
              { label: 'Valorant',    href: '/games/valorant' },
            ].map(({ label, href }) => {
              const isActive =
                href === '/' ? pathname === '/' : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`font-medium transition-colors duration-300 ${
                    isActive
                      ? 'text-brand-primary'
                      : isTransparent
                      ? 'text-white/80 hover:text-brand-primary'
                      : 'text-text-secondary hover:text-brand-primary'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              id="navbar-login-button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-expanded={isOpen}
              aria-haspopup="true"
              className={`px-5 sm:px-6 py-2.5 text-sm sm:text-base rounded-full font-medium transition-all flex items-center gap-2 cursor-pointer active:scale-95 ${
                isTransparent
                  ? 'bg-white/15 backdrop-blur-sm border border-white/30 text-white hover:bg-white/25 shadow-lg'
                  : 'bg-brand-primary hover:bg-brand-hover text-white shadow-sm shadow-brand-primary/20'
              }`}
            >
              <span>Log in</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Pop-up Bar */}
            {isOpen && (
              <div
                id="login-popup-bar"
                className="absolute right-0 top-full mt-2 w-44 sm:w-48 bg-white rounded-xl shadow-lg border border-gray-100 p-1.5 z-50 animate-in fade-in duration-100"
              >
                <Link
                  href="/login/player"
                  id="login-player-option"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-text-main hover:bg-brand-light hover:text-brand-primary transition-colors"
                >
                  <Gamepad2 className="w-4 h-4 text-brand-primary shrink-0" />
                  <span>Player Login</span>
                </Link>

                <Link
                  href="/login/partner"
                  id="login-partner-option"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-text-main hover:bg-brand-light hover:text-brand-primary transition-colors"
                >
                  <Handshake className="w-4 h-4 text-brand-primary shrink-0" />
                  <span>Partner Login</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
