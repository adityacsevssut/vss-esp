'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import {
  Shield,
  LogOut,
  Pencil,
  X,
  Trophy,
  Check,
  Phone,
  GraduationCap,
  Calendar,
  Building2,
  User,
  Sparkles,
} from 'lucide-react';

const YEAR_OPTIONS = [
  '1st Year',
  '2nd Year',
  '3rd Year',
  '4th Year (Final Year)',
  '5th Year / Dual Degree',
  'Passed Out / Alumni',
];

// Helper to suggest academic year from a VSSUT reg number (first 2 digits = admission year)
export function deriveAcademicYear(regNum: string): string {
  const prefix = regNum.trim().slice(0, 2);
  if (!/^\d{2}$/.test(prefix)) return '';
  const admissionYear = 2000 + parseInt(prefix, 10);
  const now = new Date();
  const calYear = now.getFullYear();
  const month = now.getMonth() + 1; // 1–12
  const academicYearStart = month >= 7 ? calYear : calYear - 1;
  const yearOfStudy = academicYearStart - admissionYear + 1;
  if (yearOfStudy <= 0) return '1st Year';
  if (yearOfStudy === 1) return '1st Year';
  if (yearOfStudy === 2) return '2nd Year';
  if (yearOfStudy === 3) return '3rd Year';
  if (yearOfStudy === 4) return '4th Year (Final Year)';
  if (yearOfStudy === 5) return '5th Year / Dual Degree';
  return 'Passed Out / Alumni';
}

export default function ProfileContent() {
  const { user, isAuthenticated, logout, updateUser } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');

  // Edit Name modal state
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState('');

  // Edit Year modal state
  const [isEditingYear, setIsEditingYear] = useState(false);
  const [yearInput, setYearInput] = useState('');

  const isProfileComplete = Boolean(user?.phone && user?.regNumber);

  // Profile editing (initial student details)
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [phone, setPhone] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [currentYear, setCurrentYear] = useState('');
  const [justCompleted, setJustCompleted] = useState(false);

  // Auto-open form if profile is incomplete
  useEffect(() => {
    if (user && !isProfileComplete) {
      setIsEditingProfile(true);
      if (user.currentYear) setCurrentYear(user.currentYear);
      if (user.collegeName) setCollegeName(user.collegeName);
      if (user.phone) setPhone(user.phone);
      if (user.regNumber) setRegNumber(user.regNumber);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Redirect back after completing profile if returnTo is set
  useEffect(() => {
    if (justCompleted && returnTo) {
      const t = setTimeout(() => router.push(returnTo), 1800);
      return () => clearTimeout(t);
    }
  }, [justCompleted, returnTo, router]);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50/50">
        <Navbar />
        <main className="flex-grow flex items-center justify-center py-20 px-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-brand-light text-brand-primary flex items-center justify-center mx-auto mb-4">
              <Shield className="w-7 h-7" />
            </div>
            <h1 className="text-xl font-bold text-text-main mb-2">Login required</h1>
            <p className="text-sm text-text-secondary mb-6">
              Sign in to view your account and tournament registrations.
            </p>
            <div className="flex flex-col gap-2.5">
              <Link
                href="/login/player"
                className="w-full py-2.5 px-4 bg-brand-primary hover:bg-brand-hover text-white rounded-xl font-semibold text-sm transition-colors text-center"
              >
                Log In as Player
              </Link>
              <Link
                href="/login/partner"
                className="w-full py-2.5 px-4 border border-gray-200 hover:bg-gray-50 text-text-main rounded-xl font-semibold text-sm transition-colors text-center"
              >
                Partner Login
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalYear = currentYear || deriveAcademicYear(regNumber) || '1st Year';
    updateUser({
      phone: phone.trim(),
      collegeName: collegeName.trim() || 'Veer Surendra Sai University of Technology (VSSUT)',
      regNumber: regNumber.trim(),
      currentYear: finalYear,
    });
    setIsEditingProfile(false);
    setJustCompleted(true);
  };

  // 50% for account created, +50% for student info
  const completionPct = isProfileComplete ? 100 : 50;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <Navbar />

      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full">

        {/* Page heading */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-text-main">Account</h1>
          <p className="text-sm text-text-secondary mt-1">
            Manage your profile and tournament registrations.
          </p>
        </div>

        {/* ── Profile header card ── */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-sm mb-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-brand-primary text-white font-bold text-2xl flex items-center justify-center shrink-0 select-none shadow-sm">
                {user.name.trim().charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl font-bold text-text-main truncate">{user.name}</h2>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 capitalize">
                    {user.role}
                  </span>
                </div>
                <p className="text-sm text-text-secondary truncate mt-0.5">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100 shrink-0">
              <button
                type="button"
                onClick={() => { setNameInput(user.name); setIsEditingName(true); }}
                className="px-3.5 py-2 bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 text-text-main text-xs sm:text-sm font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Pencil className="w-3.5 h-3.5 text-gray-500" />
                Edit Name
              </button>
              <button
                type="button"
                onClick={() => logout()}
                className="px-3.5 py-2 border border-red-200 hover:bg-red-50 text-red-600 text-xs sm:text-sm font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* ── Profile completion / status banner ── */}
        {justCompleted && returnTo ? (
          /* Just completed + has a return destination */
          <div className="bg-white rounded-2xl border border-emerald-200 p-5 mb-5 flex items-start gap-4 shadow-sm">
            <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-4 h-4 text-emerald-600" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-sm font-semibold text-text-main">Profile complete — taking you back…</p>
              <p className="text-xs text-text-secondary mt-0.5">
                Redirecting you back to the tournament page to complete your registration.
              </p>
            </div>
          </div>
        ) : !isProfileComplete ? (
          /* Incomplete — progress bar at 50% */
          <div className="bg-white rounded-2xl border border-amber-200 p-5 mb-5 shadow-sm">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <p className="text-sm font-semibold text-text-main">Complete your profile</p>
                <p className="text-xs text-text-secondary mt-0.5">
                  Your student details are needed to join tournaments.
                </p>
              </div>
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 shrink-0">
                {completionPct}%
              </span>
            </div>

            {/* Progress bar */}
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden mb-3">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${completionPct}%`,
                  background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
                }}
              />
            </div>

            <div className="flex items-center gap-5 flex-wrap">
              <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                <span className="w-4 h-4 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-emerald-600" strokeWidth={3} />
                </span>
                Account created
              </div>
              <div className="flex items-center gap-1.5 text-xs text-amber-700 font-medium">
                <span className="w-4 h-4 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                </span>
                Student info pending
              </div>
            </div>
          </div>
        ) : (
          /* Complete */
          <div className="bg-emerald-50 rounded-2xl border border-emerald-200 px-5 py-4 mb-5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-sm font-semibold text-emerald-800">Profile complete</p>
              <p className="text-xs text-emerald-700 mt-0.5">
                Your student details are verified and on record.
              </p>
            </div>
          </div>
        )}

        {/* ── Student info edit form — only shown when profile is NOT yet complete ── */}
        {isEditingProfile && !isProfileComplete && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-sm mb-5">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-base font-bold text-text-main flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-brand-primary" />
                  Student Information
                </h3>
                <p className="text-xs text-text-secondary mt-0.5">
                  Required for tournament verification. Mobile and registration number are permanently locked once saved.
                </p>
              </div>
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Mobile Number */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex rounded-xl overflow-hidden border border-slate-200 focus-within:border-brand-primary focus-within:ring-3 focus-within:ring-brand-primary/10 transition-all bg-slate-50 focus-within:bg-white shadow-xs">
                    <div className="px-3 py-2.5 bg-slate-100 text-slate-600 text-xs font-semibold border-r border-slate-200 select-none flex items-center gap-1.5 shrink-0">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>+91</span>
                    </div>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      placeholder="9876543210"
                      className="w-full px-3.5 py-2.5 bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Registration Number */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Registration Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center rounded-xl overflow-hidden border border-slate-200 focus-within:border-brand-primary focus-within:ring-3 focus-within:ring-brand-primary/10 transition-all bg-slate-50 focus-within:bg-white shadow-xs px-3">
                    <GraduationCap className="w-4 h-4 text-slate-400 shrink-0" />
                    <input
                      type="text"
                      required
                      maxLength={10}
                      value={regNumber}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        setRegNumber(val);
                        if (!currentYear && val.length >= 2) {
                          const suggested = deriveAcademicYear(val);
                          if (suggested) setCurrentYear(suggested);
                        }
                      }}
                      placeholder="e.g. 2402040005"
                      className="w-full px-2.5 py-2.5 bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Current Year */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Current Year <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center rounded-xl overflow-hidden border border-slate-200 focus-within:border-brand-primary focus-within:ring-3 focus-within:ring-brand-primary/10 transition-all bg-slate-50 focus-within:bg-white shadow-xs px-3">
                    <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                    <select
                      required
                      value={currentYear}
                      onChange={(e) => setCurrentYear(e.target.value)}
                      className="w-full px-2.5 py-2.5 bg-transparent text-sm text-slate-900 focus:outline-none cursor-pointer"
                    >
                      <option value="">Select current year</option>
                      {YEAR_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* College Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    College Name <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center rounded-xl overflow-hidden border border-slate-200 focus-within:border-brand-primary focus-within:ring-3 focus-within:ring-brand-primary/10 transition-all bg-slate-50 focus-within:bg-white shadow-xs px-3">
                    <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                    <input
                      type="text"
                      required
                      value={collegeName}
                      onChange={(e) => setCollegeName(e.target.value)}
                      placeholder="e.g. VSSUT Burla"
                      className="w-full px-2.5 py-2.5 bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
                  Details will be locked for official tournaments
                </span>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-brand-primary hover:bg-brand-hover text-white rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:shadow-md"
                >
                  <Check className="w-4 h-4" />
                  Save Student Profile
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ── Personal Information ── */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-5">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-text-main">Personal Information</h3>
              <p className="text-xs text-text-secondary mt-0.5">Official Student Record</p>
            </div>
          </div>

          <div className="divide-y divide-gray-100 text-sm">
            {/* Full Name — editable */}
            <div className="px-6 py-3.5 flex items-center justify-between">
              <span className="text-text-secondary">Full Name</span>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-text-main">{user.name}</span>
                <button
                  type="button"
                  onClick={() => { setNameInput(user.name); setIsEditingName(true); }}
                  className="text-xs text-brand-primary hover:underline font-semibold cursor-pointer"
                >
                  Change
                </button>
              </div>
            </div>

            <div className="px-6 py-3.5 flex items-center justify-between">
              <span className="text-text-secondary">Email Address</span>
              <span className="font-semibold text-text-main">{user.email}</span>
            </div>

            <div className="px-6 py-3.5 flex items-center justify-between">
              <span className="text-text-secondary">Mobile Number</span>
              <span className="font-semibold text-text-main">
                {user.phone
                  ? `+91 ${user.phone}`
                  : <span className="text-gray-400 font-normal italic text-xs">Not added</span>}
              </span>
            </div>

            <div className="px-6 py-3.5 flex items-center justify-between">
              <span className="text-text-secondary">College Name</span>
              <span className="font-semibold text-text-main text-right max-w-[60%]">
                {user.collegeName
                  || <span className="text-gray-400 font-normal italic text-xs">Not added</span>}
              </span>
            </div>

            <div className="px-6 py-3.5 flex items-center justify-between">
              <span className="text-text-secondary">Registration Number</span>
              <span className="font-semibold text-text-main">
                {user.regNumber
                  || <span className="text-gray-400 font-normal italic text-xs">Not added</span>}
              </span>
            </div>

            {/* Current Year — editable with Change button just like Full Name */}
            <div className="px-6 py-3.5 flex items-center justify-between">
              <span className="text-text-secondary">Current Year</span>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-text-main">
                  {user.currentYear || (user.regNumber ? deriveAcademicYear(user.regNumber) : null) || (
                    <span className="text-gray-400 font-normal italic text-xs">Not added</span>
                  )}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setYearInput(user.currentYear || (user.regNumber ? deriveAcademicYear(user.regNumber) : '') || '1st Year');
                    setIsEditingYear(true);
                  }}
                  className="text-xs text-brand-primary hover:underline font-semibold cursor-pointer"
                >
                  Change
                </button>
              </div>
            </div>

            <div className="px-6 py-3.5 flex items-center justify-between">
              <span className="text-text-secondary">Account Role</span>
              <span className="font-semibold text-text-main capitalize">{user.role}</span>
            </div>

            <div className="px-6 py-3.5 flex items-center justify-between">
              <span className="text-text-secondary">Registered Date</span>
              <span className="text-text-secondary">{user.joinedAt || 'Active'}</span>
            </div>
          </div>
        </div>

        {/* My Tournaments */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-text-main">My Tournaments</h3>
            <p className="text-xs text-text-secondary mt-0.5">
              Tournaments you have registered for will appear here.
            </p>
          </div>
          <div className="text-center py-8 px-4 rounded-xl border border-dashed border-gray-200 bg-slate-50/50">
            <Trophy className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-text-main">No registrations yet</p>
            <p className="text-xs text-text-secondary mt-1 max-w-xs mx-auto">
              You haven&apos;t joined any tournament roster yet.
            </p>
          </div>
        </div>

        {/* ── Edit Name modal ── */}
        {isEditingName && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 max-w-sm w-full p-6">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-base font-bold text-text-main">Edit Full Name</h3>
                <button
                  type="button"
                  onClick={() => setIsEditingName(false)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-lg cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-text-secondary mb-4">
                Update your display name.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (nameInput.trim()) updateUser({ name: nameInput.trim() });
                  setIsEditingName(false);
                }}
              >
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Full Name
                  </label>
                  <div className="flex items-center rounded-xl overflow-hidden border border-slate-200 focus-within:border-brand-primary focus-within:ring-3 focus-within:ring-brand-primary/10 transition-all bg-slate-50 focus-within:bg-white shadow-xs px-3">
                    <User className="w-4 h-4 text-slate-400 shrink-0" />
                    <input
                      type="text"
                      required
                      autoFocus
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full px-2.5 py-2.5 bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingName(false)}
                    className="px-3.5 py-2 border border-gray-200 hover:bg-gray-50 text-text-secondary text-sm font-semibold rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-brand-primary hover:bg-brand-hover text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer shadow-xs"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ── Edit Current Year modal ── */}
        {isEditingYear && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 max-w-sm w-full p-6">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-base font-bold text-text-main">Change Current Year</h3>
                <button
                  type="button"
                  onClick={() => setIsEditingYear(false)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-lg cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-text-secondary mb-4">
                Update your current academic year of study.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (yearInput.trim()) updateUser({ currentYear: yearInput.trim() });
                  setIsEditingYear(false);
                }}
              >
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Academic Year
                  </label>
                  <div className="flex items-center rounded-xl overflow-hidden border border-slate-200 focus-within:border-brand-primary focus-within:ring-3 focus-within:ring-brand-primary/10 transition-all bg-slate-50 focus-within:bg-white shadow-xs px-3">
                    <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                    <select
                      required
                      value={yearInput}
                      onChange={(e) => setYearInput(e.target.value)}
                      className="w-full px-2.5 py-2.5 bg-transparent text-sm text-slate-900 focus:outline-none cursor-pointer"
                    >
                      {YEAR_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingYear(false)}
                    className="px-3.5 py-2 border border-gray-200 hover:bg-gray-50 text-text-secondary text-sm font-semibold rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-brand-primary hover:bg-brand-hover text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer shadow-xs"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
      <Footer />
    </div>
  );
}
