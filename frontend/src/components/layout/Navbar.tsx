'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChevronDown,
  Gamepad2,
  Handshake,
  Menu,
  X,
} from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const isHomePage = pathname === '/';
  const [isOverHero, setIsOverHero] = useState(isHomePage);

  // Reset dropdown and mobile menu when route changes
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
    setIsMobileMenuOpen(false);
  }

  // Track scroll position: keep navbar transparent with no lower border over the hero section until entering featured games
  useEffect(() => {
    if (!isHomePage) {
      setIsOverHero(false);
      return;
    }

    const handleScroll = () => {
      const featuredSection = document.getElementById('featured-games');
      const navbarHeight = 64; // height of fixed navbar

      if (featuredSection) {
        const rect = featuredSection.getBoundingClientRect();
        // As long as rect.top > navbarHeight, the navbar is still over the Hero.
        setIsOverHero(rect.top > navbarHeight);
      } else {
        setIsOverHero(window.scrollY < window.innerHeight - navbarHeight);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
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
        setIsMobileMenuOpen(false);
      }
    }

    if (isOpen || isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isMobileMenuOpen]);

  // Navbar is transparent with no lower border over the Hero section, switches to light when entering Featured Games
  const isTransparent = isHomePage && isOverHero;

  const navLinks = [
    { label: 'Home',     href: '/' },
    { label: 'Freefire', href: '/games/free-fire' },
    { label: 'BGMI',     href: '/games/bgmi' },
    { label: 'Valorant', href: '/games/valorant' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          isTransparent
            ? 'bg-transparent border-none border-b-0 shadow-none'
            : 'bg-white/95 backdrop-blur-md border-b border-brand-border shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-1.5 sm:gap-2 group">
                <span
                  className={`font-black italic text-3xl sm:text-4xl transition-colors duration-300 ${
                    isTransparent ? 'text-brand-primary drop-shadow-[0_0_12px_rgba(22,163,74,0.4)]' : 'text-brand-primary'
                  }`}
                >
                  VE
                </span>
                <span
                  className={`font-bold text-xl sm:text-2xl tracking-tight transition-colors duration-300 ${
                    isTransparent ? 'text-white drop-shadow-md' : 'text-text-main'
                  }`}
                >
                  Vss<span className="text-brand-primary">Esp</span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8 text-lg">
              {navLinks.map(({ label, href }) => {
                const isActive =
                  href === '/' ? pathname === '/' : pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`font-medium transition-colors duration-300 ${
                      isActive
                        ? 'text-brand-primary font-semibold'
                        : isTransparent
                        ? 'text-white/80 hover:text-white'
                        : 'text-text-secondary hover:text-brand-primary'
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>

            {/* Right Controls: Login button + Mobile Hamburger */}
            <div className="flex items-center gap-2">
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  id="navbar-login-button"
                  onClick={() => setIsOpen((prev) => !prev)}
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  className={`px-3.5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-base rounded-full font-medium transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer active:scale-95 ${
                    isTransparent
                      ? 'bg-white/15 backdrop-blur-sm border border-white/30 text-white hover:bg-white/25 shadow-lg'
                      : 'bg-brand-primary hover:bg-brand-hover text-white shadow-sm shadow-brand-primary/20'
                  }`}
                >
                  <span>Log in</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Pop-up Bar */}
                {isOpen && (
                  <div
                    id="login-popup-bar"
                    className={`absolute right-0 top-full mt-2 w-44 sm:w-48 rounded-xl shadow-xl p-1.5 z-50 animate-in fade-in duration-100 ${
                      isTransparent
                        ? 'bg-zinc-900/95 backdrop-blur-md border border-white/15 text-white shadow-black/50'
                        : 'bg-white border border-gray-100 text-text-main shadow-lg'
                    }`}
                  >
                    <Link
                      href="/login/player"
                      id="login-player-option"
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isTransparent
                          ? 'text-white/90 hover:bg-white/10 hover:text-brand-primary'
                          : 'text-text-main hover:bg-brand-light hover:text-brand-primary'
                      }`}
                    >
                      <Gamepad2 className="w-4 h-4 text-brand-primary shrink-0" />
                      <span>Player Login</span>
                    </Link>

                    <Link
                      href="/login/partner"
                      id="login-partner-option"
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isTransparent
                          ? 'text-white/90 hover:bg-white/10 hover:text-brand-primary'
                          : 'text-text-main hover:bg-brand-light hover:text-brand-primary'
                      }`}
                    >
                      <Handshake className="w-4 h-4 text-brand-primary shrink-0" />
                      <span>Partner Login</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* Hamburger Button (Mobile only) */}
              <button
                type="button"
                aria-label="Toggle navigation menu"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className={`md:hidden p-2 rounded-lg transition-colors cursor-pointer ${
                  isTransparent
                    ? 'text-white hover:bg-white/10'
                    : 'text-text-main hover:bg-gray-100'
                }`}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer - Simple, Clean & Fast */}
        {isMobileMenuOpen && (
          <div
            className={`md:hidden px-4 pt-2 pb-4 space-y-1 border-b ${
              isTransparent
                ? 'bg-zinc-950/95 backdrop-blur-md border-white/10'
                : 'bg-white/98 backdrop-blur-md border-brand-border shadow-lg'
            }`}
          >
            {navLinks.map(({ label, href }) => {
              const isActive =
                href === '/' ? pathname === '/' : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3.5 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'text-brand-primary bg-brand-primary/10 font-semibold'
                      : isTransparent
                      ? 'text-white/80 hover:bg-white/10 hover:text-white'
                      : 'text-text-secondary hover:bg-brand-light hover:text-brand-primary'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        )}
      </nav>

      {/* Spacer so content on non-home pages never gets covered by the fixed navbar */}
      {!isHomePage && <div className="h-16 w-full shrink-0" aria-hidden="true" />}
    </>
  );
}
