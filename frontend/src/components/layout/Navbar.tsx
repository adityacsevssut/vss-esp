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
  User,
  LogOut,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

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
    { label: 'Home', href: '/' },
    { label: 'Freefire', href: '/games/free-fire' },
    { label: 'BGMI', href: '/games/bgmi' },
    { label: 'Valorant', href: '/games/valorant' },
  ];

  const isUserLoggedIn = mounted && isAuthenticated && !!user;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${isTransparent
          ? 'bg-transparent border-none border-b-0 shadow-none'
          : 'bg-white/95 backdrop-blur-md border-b border-brand-border shadow-sm'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-1.5 sm:gap-2 group">
                <span
                  className={`font-black italic text-3xl sm:text-4xl transition-colors duration-300 ${isTransparent ? 'text-brand-primary drop-shadow-[0_0_12px_rgba(22,163,74,0.4)]' : 'text-brand-primary'
                    }`}
                >
                  VE
                </span>
                <span
                  className={`font-bold text-xl sm:text-2xl tracking-tight transition-colors duration-300 ${isTransparent ? 'text-white drop-shadow-md' : 'text-text-main'
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
                    className={`font-medium transition-colors duration-300 ${isActive
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

            {/* Right Controls: Login button / Rounded Profile Icon + Mobile Hamburger */}
            <div className="flex items-center gap-2">
              <div className="relative" ref={dropdownRef}>
                {isUserLoggedIn ? (
                  /* ================= LOGGED IN: ROUNDED PROFILE ICON ================= */
                  <button
                    type="button"
                    id="navbar-profile-button"
                    onClick={() => setIsOpen((prev) => !prev)}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    aria-label={`Logged in as ${user.name}. Open user profile menu`}
                    className="cursor-pointer focus:outline-none active:scale-95 transition-transform"
                  >
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-brand-primary text-white font-bold text-sm sm:text-base select-none shadow-sm">
                      <span>{user.name.trim().charAt(0).toUpperCase()}</span>
                    </div>
                  </button>
                ) : (
                  /* ================= NOT LOGGED IN: LOGIN BUTTON ================= */
                  <button
                    type="button"
                    id="navbar-login-button"
                    onClick={() => setIsOpen((prev) => !prev)}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    className={`px-3.5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-base rounded-full font-medium transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer active:scale-95 ${isTransparent
                      ? 'bg-white/15 backdrop-blur-sm border border-white/30 text-white hover:bg-white/25 shadow-lg'
                      : 'bg-brand-primary hover:bg-brand-hover text-white shadow-sm shadow-brand-primary/20'
                      }`}
                  >
                    <span>Log in</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                )}

                {/* Pop-up Bar for Login or Profile */}
                {isOpen && (
                  isUserLoggedIn ? (
                    /* Profile Dropdown */
                    <div
                      id="profile-dropdown-menu"
                      className={`absolute right-0 top-full mt-2 w-64 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in duration-150 border ${isTransparent
                        ? 'bg-zinc-950/95 backdrop-blur-xl border-white/15 text-white shadow-black/80'
                        : 'bg-white border-gray-100 text-text-main shadow-xl'
                        }`}
                    >
                      {/* User Header Summary */}
                      <div className={`p-3 rounded-xl mb-1.5 ${isTransparent ? 'bg-white/5 border border-white/10' : 'bg-slate-50 border border-gray-100'
                        }`}>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-brand-primary text-white font-bold text-base shrink-0">
                            {user.name.trim().charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-bold truncate leading-tight">{user.name}</p>
                            <p className={`text-xs truncate ${isTransparent ? 'text-zinc-400' : 'text-text-secondary'}`}>
                              {user.email}
                            </p>
                            <div className="mt-1 flex items-center gap-1.5">
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-brand-primary/15 text-brand-primary">
                                {user.role === 'partner' ? 'Partner' : 'Player'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Dropdown Menu Links */}
                      <div className="space-y-0.5">
                        <Link
                          href="/profile"
                          id="profile-menu-profile"
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isTransparent
                            ? 'text-white/90 hover:bg-white/10 hover:text-brand-primary'
                            : 'text-text-main hover:bg-brand-light hover:text-brand-primary'
                            }`}
                        >
                          <User className="w-4 h-4 text-brand-primary shrink-0" />
                          <span>My Profile</span>
                        </Link>
                      </div>

                      <div className={`my-1.5 border-t ${isTransparent ? 'border-white/10' : 'border-gray-100'}`} />

                      {/* Sign Out Button */}
                      <button
                        type="button"
                        id="profile-menu-logout"
                        onClick={() => {
                          logout();
                          setIsOpen(false);
                        }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer text-red-500 hover:bg-red-50 hover:text-red-600 ${isTransparent ? 'hover:bg-red-950/40' : ''
                          }`}
                      >
                        <LogOut className="w-4 h-4 shrink-0" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  ) : (
                    /* Log In Options Dropdown */
                    <div
                      id="login-popup-bar"
                      className={`absolute right-0 top-full mt-2 w-44 sm:w-48 rounded-xl shadow-xl p-1.5 z-50 animate-in fade-in duration-100 ${isTransparent
                        ? 'bg-zinc-900/95 backdrop-blur-md border border-white/15 text-white shadow-black/50'
                        : 'bg-white border border-gray-100 text-text-main shadow-lg'
                        }`}
                    >
                      <Link
                        href="/login/player"
                        id="login-player-option"
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isTransparent
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
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isTransparent
                          ? 'text-white/90 hover:bg-white/10 hover:text-brand-primary'
                          : 'text-text-main hover:bg-brand-light hover:text-brand-primary'
                          }`}
                      >
                        <Handshake className="w-4 h-4 text-brand-primary shrink-0" />
                        <span>Partner Login</span>
                      </Link>
                    </div>
                  )
                )}
              </div>

              {/* Hamburger Button (Mobile only) */}
              <button
                type="button"
                aria-label="Toggle navigation menu"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className={`md:hidden p-2 rounded-lg transition-colors cursor-pointer ${isTransparent
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

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div
            className={`md:hidden px-4 pt-2 pb-4 space-y-1 border-b ${isTransparent
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
                  className={`block px-3.5 py-2.5 rounded-lg text-base font-medium transition-colors ${isActive
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

            {/* Mobile Auth / Profile section */}
            {isUserLoggedIn ? (
              <div className={`mt-3 pt-3 border-t ${isTransparent ? 'border-white/10' : 'border-gray-100'}`}>
                <div className="flex items-center gap-3 px-3 py-2">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center bg-brand-primary text-white font-bold text-sm shrink-0">
                    {user.name.trim().charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm font-bold truncate ${isTransparent ? 'text-white' : 'text-text-main'}`}>{user.name}</p>
                    <p className="text-xs text-brand-primary font-medium">{user.role === 'partner' ? 'Partner' : 'Player'}</p>
                  </div>
                </div>
                <div className="mt-1 space-y-1">
                  <Link
                    href="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${isTransparent
                      ? 'text-white/80 hover:bg-white/10 hover:text-white'
                      : 'text-text-secondary hover:bg-brand-light hover:text-brand-primary'
                      }`}
                  >
                    <User className="w-4 h-4 text-brand-primary" />
                    <span>My Profile</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 ${isTransparent ? 'hover:bg-red-950/40' : ''
                      }`}
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className={`mt-3 pt-3 border-t space-y-1 ${isTransparent ? 'border-white/10' : 'border-gray-100'}`}>
                <Link
                  href="/login/player"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${isTransparent
                    ? 'text-brand-primary hover:bg-white/10'
                    : 'text-brand-primary hover:bg-brand-light'
                    }`}
                >
                  <Gamepad2 className="w-4 h-4" />
                  <span>Player Login</span>
                </Link>
                <Link
                  href="/login/partner"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${isTransparent
                    ? 'text-white/80 hover:bg-white/10 hover:text-white'
                    : 'text-text-secondary hover:bg-brand-light'
                    }`}
                >
                  <Handshake className="w-4 h-4" />
                  <span>Partner Login</span>
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Spacer so content on non-home pages never gets covered by the fixed navbar */}
      {!isHomePage && <div className="h-16 w-full shrink-0" aria-hidden="true" />}
    </>
  );
}
