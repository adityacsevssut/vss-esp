'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Gamepad2, Handshake, Mail, Lock, Eye, EyeOff, User } from 'lucide-react';

export type AuthRole = 'player' | 'partner';
export type AuthMode = 'login' | 'signup';

interface AuthCardProps {
  initialRole?: AuthRole;
  initialMode?: AuthMode;
}

export default function AuthCard({ 
  initialRole = 'player',
  initialMode = 'login' 
}: AuthCardProps) {
  const [role, setRole] = useState<AuthRole>(initialRole);
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const isPlayer = role === 'player';
  const isSignUp = mode === 'signup';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) return;
    if (isSignUp && !name) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage(isSignUp ? 'Account created successfully! Logging you in...' : 'Logged in successfully! Redirecting...');
    }, 600);
  };

  const handleGoogleAuth = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage('Google authentication successful! Redirecting...');
    }, 600);
  };

  const handleRoleChange = (newRole: AuthRole) => {
    setRole(newRole);
    if (newRole === 'partner') {
      setMode('login');
    }
    setSuccessMessage('');
    setName('');
    setIdentifier('');
    setPassword('');
  };

  const handleModeToggle = (newMode: AuthMode) => {
    setMode(newMode);
    setSuccessMessage('');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Role Toggle */}
      <div className="bg-gray-100 p-1 rounded-xl flex items-center mb-6">
        <button
          type="button"
          onClick={() => handleRoleChange('player')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
            isPlayer
              ? 'bg-white text-text-main shadow-sm'
              : 'text-text-secondary hover:text-text-main'
          }`}
        >
          <Gamepad2 className="w-4 h-4 text-brand-primary" />
          <span>Player</span>
        </button>

        <button
          type="button"
          onClick={() => handleRoleChange('partner')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
            !isPlayer
              ? 'bg-white text-text-main shadow-sm'
              : 'text-text-secondary hover:text-text-main'
          }`}
        >
          <Handshake className="w-4 h-4 text-brand-primary" />
          <span>Partner</span>
        </button>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-brand-border p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-text-main mb-6">
          {isPlayer 
            ? (isSignUp ? 'Player Sign Up' : 'Player Login') 
            : (isSignUp ? 'Partner Registration' : 'Partner Login')}
        </h1>

        {successMessage && (
          <div className="mb-5 p-3 rounded-lg bg-brand-light text-brand-primary text-sm font-medium">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name field for sign up */}
          {isSignUp && (
            <div>
              <label className="block text-xs font-semibold text-text-main mb-1.5">
                {isPlayer ? 'Full Name or In-Game Name' : 'Organization Name'}
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={isPlayer ? 'e.g. John Doe or ShadowNinja' : 'Company or Club Name'}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-text-main placeholder-gray-400 focus:outline-none focus:border-brand-primary focus:bg-white"
                />
              </div>
            </div>
          )}

          {/* Email / Username field */}
          <div>
            <label className="block text-xs font-semibold text-text-main mb-1.5">
              {isSignUp 
                ? 'Email Address' 
                : (isPlayer ? 'Email or Username' : 'Organization Email')}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type={isSignUp ? 'email' : (isPlayer ? 'text' : 'email')}
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder={isSignUp ? 'Enter your email' : (isPlayer ? 'Enter email or username' : 'Enter work email')}
                className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-text-main placeholder-gray-400 focus:outline-none focus:border-brand-primary focus:bg-white"
              />
            </div>
          </div>

          {/* Password field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-text-main">
                Password
              </label>
              {!isSignUp && (
                <a 
                  href="#forgot" 
                  onClick={(e) => { e.preventDefault(); alert('Please contact admin to reset your credentials.'); }}
                  className="text-xs text-brand-primary hover:underline"
                >
                  Forgot?
                </a>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isSignUp ? 'Create a password' : 'Enter password'}
                className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-text-main placeholder-gray-400 focus:outline-none focus:border-brand-primary focus:bg-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember me (login only) */}
          {!isSignUp && (
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-brand-primary border-gray-300 accent-brand-primary"
                />
                <span className="text-xs text-text-secondary">Remember me</span>
              </label>
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-brand-primary hover:bg-brand-hover text-white rounded-lg font-semibold text-sm transition-colors cursor-pointer disabled:opacity-50 mt-2"
          >
            {isLoading 
              ? (isSignUp ? 'Creating account...' : 'Signing in...') 
              : (isSignUp ? 'Sign Up' : 'Sign In')}
          </button>

          {/* Google Auth Divider & Button — players only */}
          {isPlayer && (
            <>
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-2 text-text-secondary">or</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleAuth}
                className="w-full py-2.5 px-4 border border-gray-200 hover:bg-gray-50 text-text-main rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>{isSignUp ? 'Sign up with Google' : 'Continue with Google'}</span>
              </button>
            </>
          )}
        </form>

        {/* Card Footer */}
        <div className="mt-6 pt-5 border-t border-gray-100 text-center text-xs text-text-secondary space-y-2">
          {/* Toggle between Login and Sign Up (Players only) */}
          {isPlayer && (
            isSignUp ? (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => handleModeToggle('login')}
                  className="font-semibold text-brand-primary hover:underline cursor-pointer"
                >
                  Sign In
                </button>
              </p>
            ) : (
              <p>
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={() => handleModeToggle('signup')}
                  className="font-semibold text-brand-primary hover:underline cursor-pointer"
                >
                  Sign Up
                </button>
              </p>
            )
          )}

          {/* Toggle between Player and Partner */}
          <div>
            {isPlayer ? (
              <button
                type="button"
                onClick={() => {
                  handleRoleChange('partner');
                  handleModeToggle('login');
                }}
                className="text-text-secondary hover:text-brand-primary cursor-pointer"
              >
                Are you a partner? Partner Login
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  handleRoleChange('player');
                  handleModeToggle('login');
                }}
                className="text-text-secondary hover:text-brand-primary cursor-pointer"
              >
                Are you a player? Player Login
              </button>
            )}
          </div>

          <div className="pt-3">
            <Link 
              href="/" 
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 border border-gray-200 hover:border-gray-300 rounded-lg text-text-secondary hover:text-text-main text-xs font-semibold transition-colors hover:bg-gray-50"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
