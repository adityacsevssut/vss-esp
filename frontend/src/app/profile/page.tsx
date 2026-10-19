'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import {
  User as UserIcon,
  Mail,
  Shield,
  Calendar,
  LogOut,
  Pencil,
  X,
  Trophy,
  Check,
  CheckCircle2,
  Phone,
  GraduationCap,
  Building2,
  Hash,
} from 'lucide-react';

export default function ProfilePage() {
  const { user, isAuthenticated, logout, updateUser } = useAuth();
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState('');

  // Complete profile form states
  const isProfileComplete = Boolean(user?.phone && user?.regNumber);
  const [isEditingProfileDetails, setIsEditingProfileDetails] = useState(!isProfileComplete);
  const [phone, setPhone] = useState(user?.phone || '');
  const [collegeName, setCollegeName] = useState(user?.collegeName || 'Veer Surendra Sai University of Technology (VSSUT)');
  const [regNumber, setRegNumber] = useState(user?.regNumber || '');
  const [currentYear, setCurrentYear] = useState(user?.currentYear || '3rd Year');

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50/50">
        <Navbar />
        <main className="flex-grow flex items-center justify-center py-20 px-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-brand-light text-brand-primary flex items-center justify-center mx-auto mb-4">
              <Shield className="w-7 h-7" />
            </div>
            <h1 className="text-xl font-bold text-text-main mb-2">Account Login Required</h1>
            <p className="text-sm text-text-secondary mb-6">
              Please sign in to view your account details and tournament registrations.
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

  const isPartner = user.role === 'partner';

  const handleProfileDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      phone: phone.trim(),
      collegeName: collegeName.trim(),
      regNumber: regNumber.trim(),
      currentYear: currentYear,
    });
    setIsEditingProfileDetails(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <Navbar />

      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-text-main">Account</h1>
          <p className="text-sm text-text-secondary mt-1">
            Manage your personal profile and tournament registrations.
          </p>
        </div>

        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            {/* User Avatar + Basic Info */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-brand-primary text-white font-bold text-2xl flex items-center justify-center shrink-0">
                <span>{user.name.trim().charAt(0).toUpperCase()}</span>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-text-main truncate">{user.name}</h2>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {isPartner ? 'Partner' : 'Player'}
                  </span>
                </div>
                <p className="text-sm text-text-secondary truncate mt-0.5">{user.email}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
              <button
                type="button"
                id="profile-edit-name-btn"
                onClick={() => {
                  setNameInput(user.name);
                  setIsEditingName(true);
                }}
                className="px-3.5 py-2 bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 text-text-main text-xs sm:text-sm font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Pencil className="w-3.5 h-3.5 text-gray-500" />
                <span>Edit Name</span>
              </button>

              <button
                type="button"
                onClick={() => logout()}
                className="px-3.5 py-2 border border-red-200 hover:bg-red-50 text-red-600 text-xs sm:text-sm font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* ================= COMPLETE YOUR PROFILE SECTION ================= */}
        {isEditingProfileDetails && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-text-main flex items-center gap-2">
                  <span>Complete Your Profile</span>
                </h3>
                <p className="text-xs text-text-secondary mt-0.5">
                  Fill in your student credentials and 10-digit Indian mobile number for tournament rosters.
                </p>
              </div>
              {isProfileComplete && (
                <button
                  type="button"
                  onClick={() => setIsEditingProfileDetails(false)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-lg cursor-pointer"
                  title="Close edit form"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <form onSubmit={handleProfileDetailsSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* 10-digit Indian Phone Number */}
              <div>
                <label className="block text-xs font-semibold text-text-main mb-1.5">
                  10-Digit Indian Mobile Number
                </label>
                <div className="flex rounded-xl overflow-hidden border border-gray-200 focus-within:border-brand-primary transition-colors bg-gray-50 focus-within:bg-white">
                  <span className="px-3 py-2.5 bg-gray-100 text-text-secondary text-xs sm:text-sm font-semibold border-r border-gray-200 select-none flex items-center">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="e.g. 9876543210"
                    className="w-full px-3.5 py-2.5 bg-transparent text-sm text-text-main placeholder-gray-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* 10-digit Registration Number */}
              <div>
                <label className="block text-xs font-semibold text-text-main mb-1.5">
                  Registration Number (10 Digits)
                </label>
                <input
                  type="text"
                  required
                  maxLength={10}
                  value={regNumber}
                  onChange={(e) => setRegNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="e.g. 2202040012"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-text-main placeholder-gray-400 focus:outline-none focus:border-brand-primary focus:bg-white transition-colors"
                />
              </div>

              {/* College Name */}
              <div>
                <label className="block text-xs font-semibold text-text-main mb-1.5">
                  College Name
                </label>
                <input
                  type="text"
                  required
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                  placeholder="e.g. VSSUT Burla"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-text-main placeholder-gray-400 focus:outline-none focus:border-brand-primary focus:bg-white transition-colors"
                />
              </div>

              {/* Current Year */}
              <div>
                <label className="block text-xs font-semibold text-text-main mb-1.5">
                  Current Year
                </label>
                <select
                  value={currentYear}
                  onChange={(e) => setCurrentYear(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-text-main focus:outline-none focus:border-brand-primary focus:bg-white transition-colors cursor-pointer"
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="5th Year / Dual Degree">5th Year / Dual Degree</option>
                  <option value="Postgraduate / M.Tech / MCA">Postgraduate / M.Tech / MCA</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end pt-2">
              <button
                type="submit"
                id="save-profile-details-btn"
                className="px-5 py-2.5 bg-brand-primary hover:bg-brand-hover text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm shadow-brand-primary/20 cursor-pointer active:scale-95 flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Save Profile Details</span>
              </button>
            </div>
          </form>
        </div>
      )}

        {/* ================= PERSONAL INFORMATION LIST ================= */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-text-main">Personal Information</h3>
              <p className="text-xs text-text-secondary mt-0.5">Official Student Record</p>
            </div>
            {!isEditingProfileDetails && (
              <button
                type="button"
                id="edit-student-details-btn"
                onClick={() => {
                  setPhone(user.phone || '');
                  setCollegeName(user.collegeName || 'Veer Surendra Sai University of Technology (VSSUT)');
                  setRegNumber(user.regNumber || '');
                  setCurrentYear(user.currentYear || '3rd Year');
                  setIsEditingProfileDetails(true);
                }}
                className="text-xs text-brand-primary hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Pencil className="w-3 h-3" />
                <span>Edit Student Details</span>
              </button>
            )}
          </div>

          <div className="divide-y divide-gray-100 text-sm">
            <div className="px-6 py-3.5 flex items-center justify-between">
              <span className="text-text-secondary font-medium">Full Name</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-text-main">{user.name}</span>
                <button
                  type="button"
                  onClick={() => {
                    setNameInput(user.name);
                    setIsEditingName(true);
                  }}
                  className="text-xs text-brand-primary hover:underline font-semibold"
                >
                  Change
                </button>
              </div>
            </div>

            <div className="px-6 py-3.5 flex items-center justify-between">
              <span className="text-text-secondary font-medium">Email Address</span>
              <span className="font-semibold text-text-main">{user.email}</span>
            </div>

            {/* Indian Phone Number */}
            <div className="px-6 py-3.5 flex items-center justify-between">
              <span className="text-text-secondary font-medium">Mobile Number</span>
              <span className="font-semibold text-text-main">
                {user.phone ? `+91 ${user.phone}` : <span className="text-gray-400 font-normal">Not saved yet</span>}
              </span>
            </div>

            {/* College Name */}
            <div className="px-6 py-3.5 flex items-center justify-between">
              <span className="text-text-secondary font-medium">College Name</span>
              <span className="font-semibold text-text-main">
                {user.collegeName || <span className="text-gray-400 font-normal">Not saved yet</span>}
              </span>
            </div>

            {/* Registration Number */}
            <div className="px-6 py-3.5 flex items-center justify-between">
              <span className="text-text-secondary font-medium">Registration Number</span>
              <span className="font-semibold text-text-main">
                {user.regNumber || <span className="text-gray-400 font-normal">Not saved yet</span>}
              </span>
            </div>

            {/* Current Year */}
            <div className="px-6 py-3.5 flex items-center justify-between">
              <span className="text-text-secondary font-medium">Current Year</span>
              <span className="font-semibold text-text-main">
                {user.currentYear || <span className="text-gray-400 font-normal">Not saved yet</span>}
              </span>
            </div>

            <div className="px-6 py-3.5 flex items-center justify-between">
              <span className="text-text-secondary font-medium">Account Role</span>
              <span className="font-semibold text-text-main capitalize">{user.role}</span>
            </div>

            <div className="px-6 py-3.5 flex items-center justify-between">
              <span className="text-text-secondary font-medium">Registered Date</span>
              <span className="text-text-secondary">{user.joinedAt || 'Active'}</span>
            </div>
          </div>
        </div>

        {/* My Tournaments Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-text-main">My Tournaments</h3>
            <p className="text-xs text-text-secondary mt-0.5">
              Tournaments you have registered for will show up here.
            </p>
          </div>

          <div className="text-center py-8 px-4 rounded-xl border border-dashed border-gray-200 bg-slate-50/50">
            <Trophy className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-text-main">No active tournament registrations</p>
            <p className="text-xs text-text-secondary mt-1 max-w-sm mx-auto">
              You haven&apos;t joined any tournament roster yet.
            </p>
          </div>
        </div>

        {/* Edit Name Modal */}
        {isEditingName && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 max-w-sm w-full p-6 animate-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between mb-4">
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

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (nameInput.trim()) {
                    updateUser({ name: nameInput.trim() });
                  }
                  setIsEditingName(false);
                }}
              >
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-text-main mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    autoFocus
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-text-main placeholder-gray-400 focus:outline-none focus:border-brand-primary focus:bg-white transition-colors"
                  />
                </div>

                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingName(false)}
                    className="px-3.5 py-2 border border-gray-200 hover:bg-gray-50 text-text-secondary text-xs sm:text-sm font-semibold rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-brand-primary hover:bg-brand-hover text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors cursor-pointer"
                  >
                    Save Changes
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
