'use client';

import { useState, useEffect } from 'react';
import {
  User,
  Phone,
  Mail,
  GraduationCap,
  Gamepad2,
  Hash,
  Shield,
  CreditCard,
  Check,
  ChevronRight,
  ChevronLeft,
  X,
  AlertCircle,
  Sparkles,
  Award,
  Lock,
} from 'lucide-react';

interface PlayerDetails {
  fullName: string;
  mobileNumber: string;
  email: string;
  registrationNumber: string;
  inGameName: string;
  uid: string;
}

interface RegistrationData {
  teamName: string;
  igl: PlayerDetails;
  player2: PlayerDetails;
  player3: PlayerDetails;
  player4: PlayerDetails;
  substitute: PlayerDetails;
}

const emptyPlayer = (): PlayerDetails => ({
  fullName: '',
  mobileNumber: '',
  email: '',
  registrationNumber: '',
  inGameName: '',
  uid: '',
});

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  tournamentTitle: string;
  entryFee: string;
  onSuccess?: () => void;
}

export default function RegistrationModal({
  isOpen,
  onClose,
  tournamentTitle,
  entryFee,
  onSuccess,
}: RegistrationModalProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<RegistrationData>({
    teamName: '',
    igl: emptyPlayer(),
    player2: emptyPlayer(),
    player3: emptyPlayer(),
    player4: emptyPlayer(),
    substitute: emptyPlayer(),
  });
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [upiId, setUpiId] = useState('');

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setStep(1);
        setData({
          teamName: '',
          igl: emptyPlayer(),
          player2: emptyPlayer(),
          player3: emptyPlayer(),
          player4: emptyPlayer(),
          substitute: emptyPlayer(),
        });
        setErrors({});
        setUpiId('');
        setPaymentProcessing(false);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const steps = [
    { num: 1, label: 'Team' },
    { num: 2, label: 'IGL' },
    { num: 3, label: 'Player 2' },
    { num: 4, label: 'Player 3' },
    { num: 5, label: 'Player 4' },
    { num: 6, label: 'Substitute' },
    { num: 7, label: 'Payment' },
  ];

  const playerKeyMap: Record<number, keyof RegistrationData> = {
    2: 'igl',
    3: 'player2',
    4: 'player3',
    5: 'player4',
    6: 'substitute',
  };

  const playerLabelMap: Record<number, string> = {
    2: 'In-Game Leader (IGL)',
    3: 'Player 2 Details',
    4: 'Player 3 Details',
    5: 'Player 4 Details',
    6: 'Substitute Player (Optional)',
  };

  const updatePlayer = (key: keyof RegistrationData, field: keyof PlayerDetails, val: string) => {
    setData((prev) => ({ ...prev, [key]: { ...(prev[key] as PlayerDetails), [field]: val } }));
    setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (step === 1) {
      if (!data.teamName.trim()) e.teamName = 'Please enter a team name';
      else if (data.teamName.trim().length < 3) e.teamName = 'Must be at least 3 characters';
    } else if (step >= 2 && step <= 6) {
      const p = data[playerKeyMap[step]] as PlayerDetails;
      const isSub = step === 6;
      const anyFilled = Boolean(
        p.fullName || p.mobileNumber || p.email || p.registrationNumber || p.inGameName || p.uid
      );

      if (!isSub || anyFilled) {
        if (!p.fullName.trim()) e.fullName = 'Full name is required';
        if (!p.mobileNumber.trim()) e.mobileNumber = 'Mobile number is required';
        else if (!/^[6-9]\d{9}$/.test(p.mobileNumber)) e.mobileNumber = 'Enter a valid 10-digit number';
        if (!p.email.trim()) e.email = 'Email address is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) e.email = 'Enter a valid email address';
        if (!p.registrationNumber.trim()) e.registrationNumber = 'Registration number is required';
        if (!p.inGameName.trim()) e.inGameName = 'In-game name is required';
        if (!p.uid.trim()) e.uid = 'Game UID is required';
      }
    } else if (step === 7) {
      if (!upiId.trim()) e.upiId = 'Please enter your UPI ID';
      else if (!/^[\w.\-_]{2,}@[a-zA-Z]{2,}$/.test(upiId.trim())) e.upiId = 'Invalid UPI ID format (e.g. name@okhdfcbank)';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validate()) return;
    if (step === 7) {
      setPaymentProcessing(true);
      setTimeout(() => { setPaymentProcessing(false); setStep(8); }, 2000);
      return;
    }
    setStep((s) => s + 1);
  };

  const back = () => setStep((s) => s - 1);

  const PlayerForm = ({ stepNum }: { stepNum: number }) => {
    const key = playerKeyMap[stepNum];
    const p = data[key] as PlayerDetails;
    const isSub = stepNum === 6;

    return (
      <div className="space-y-4">
        {isSub && (
          <div className="flex items-start gap-2.5 bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-xs text-emerald-800 leading-relaxed">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              Substitute player is optional. If your team does not have a 5th player, click <strong>Continue</strong> to proceed directly to payment.
            </span>
          </div>
        )}

        {/* Card 1: Official & Contact Details */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs">
          <div className="flex items-center gap-2 pb-3 mb-3.5 border-b border-slate-100">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Student & Contact Information
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Full Name {!isSub && <span className="text-red-500">*</span>}
              </label>
              <div className="relative flex items-center">
                <User className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={p.fullName}
                  onChange={(e) => updatePlayer(key, 'fullName', e.target.value)}
                  className={`w-full pl-9 pr-3.5 py-2.5 bg-slate-50/70 hover:bg-slate-100/60 focus:bg-white border ${
                    errors.fullName ? 'border-red-400 bg-red-50/30' : 'border-slate-200'
                  } focus:border-brand-primary focus:ring-3 focus:ring-brand-primary/10 rounded-xl text-sm text-slate-900 placeholder-slate-400 outline-none transition-all`}
                />
              </div>
              {errors.fullName && (
                <p className="text-[11px] text-red-500 font-medium mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Mobile Number {!isSub && <span className="text-red-500">*</span>}
              </label>
              <div
                className={`flex rounded-xl overflow-hidden border ${
                  errors.mobileNumber ? 'border-red-400 bg-red-50/30' : 'border-slate-200'
                } focus-within:border-brand-primary focus-within:ring-3 focus-within:ring-brand-primary/10 transition-all bg-slate-50/70 focus-within:bg-white`}
              >
                <span className="px-3 py-2.5 bg-slate-100 text-slate-600 text-xs font-semibold border-r border-slate-200 flex items-center gap-1.5 select-none shrink-0">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="9876543210"
                  value={p.mobileNumber}
                  onChange={(e) =>
                    updatePlayer(key, 'mobileNumber', e.target.value.replace(/\D/g, '').slice(0, 10))
                  }
                  className="w-full px-3 py-2.5 bg-transparent text-sm text-slate-900 placeholder-slate-400 outline-none"
                />
              </div>
              {errors.mobileNumber && (
                <p className="text-[11px] text-red-500 font-medium mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.mobileNumber}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Email Address {!isSub && <span className="text-red-500">*</span>}
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                <input
                  type="email"
                  placeholder="player@example.com"
                  value={p.email}
                  onChange={(e) => updatePlayer(key, 'email', e.target.value)}
                  className={`w-full pl-9 pr-3.5 py-2.5 bg-slate-50/70 hover:bg-slate-100/60 focus:bg-white border ${
                    errors.email ? 'border-red-400 bg-red-50/30' : 'border-slate-200'
                  } focus:border-brand-primary focus:ring-3 focus:ring-brand-primary/10 rounded-xl text-sm text-slate-900 placeholder-slate-400 outline-none transition-all`}
                />
              </div>
              {errors.email && (
                <p className="text-[11px] text-red-500 font-medium mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* University Registration Number */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                University Registration Number {!isSub && <span className="text-red-500">*</span>}
              </label>
              <div className="relative flex items-center">
                <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  placeholder="e.g. 2402040005"
                  value={p.registrationNumber}
                  onChange={(e) => updatePlayer(key, 'registrationNumber', e.target.value)}
                  className={`w-full pl-9 pr-3.5 py-2.5 bg-slate-50/70 hover:bg-slate-100/60 focus:bg-white border ${
                    errors.registrationNumber ? 'border-red-400 bg-red-50/30' : 'border-slate-200'
                  } focus:border-brand-primary focus:ring-3 focus:ring-brand-primary/10 rounded-xl text-sm text-slate-900 placeholder-slate-400 outline-none transition-all`}
                />
              </div>
              {errors.registrationNumber && (
                <p className="text-[11px] text-red-500 font-medium mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.registrationNumber}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Card 2: Gaming Credentials */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs">
          <div className="flex items-center gap-2 pb-3 mb-3.5 border-b border-slate-100">
            <span className="w-2 h-2 rounded-full bg-purple-600" />
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Gaming Credentials
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* In-Game Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                In-Game Name (IGN) {!isSub && <span className="text-red-500">*</span>}
              </label>
              <div className="relative flex items-center">
                <Gamepad2 className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  placeholder="e.g. Hunter_99"
                  value={p.inGameName}
                  onChange={(e) => updatePlayer(key, 'inGameName', e.target.value)}
                  className={`w-full pl-9 pr-3.5 py-2.5 bg-slate-50/70 hover:bg-slate-100/60 focus:bg-white border ${
                    errors.inGameName ? 'border-red-400 bg-red-50/30' : 'border-slate-200'
                  } focus:border-brand-primary focus:ring-3 focus:ring-brand-primary/10 rounded-xl text-sm text-slate-900 placeholder-slate-400 outline-none transition-all`}
                />
              </div>
              {errors.inGameName && (
                <p className="text-[11px] text-red-500 font-medium mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.inGameName}
                </p>
              )}
            </div>

            {/* UID */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Game UID {!isSub && <span className="text-red-500">*</span>}
              </label>
              <div className="relative flex items-center">
                <Hash className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  placeholder="e.g. 1092837465"
                  value={p.uid}
                  onChange={(e) => updatePlayer(key, 'uid', e.target.value.replace(/\D/g, ''))}
                  className={`w-full pl-9 pr-3.5 py-2.5 bg-slate-50/70 hover:bg-slate-100/60 focus:bg-white border ${
                    errors.uid ? 'border-red-400 bg-red-50/30' : 'border-slate-200'
                  } focus:border-brand-primary focus:ring-3 focus:ring-brand-primary/10 rounded-xl text-sm text-slate-900 placeholder-slate-400 outline-none transition-all`}
                />
              </div>
              {errors.uid && (
                <p className="text-[11px] text-red-500 font-medium mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.uid}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget && step !== 8) onClose();
      }}
    >
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/90 max-w-xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Step indicator bar */}
        {step < 8 && (
          <div className="px-5 sm:px-6 pt-5 pb-3 border-b border-slate-100 bg-slate-50/40">
            <div className="flex items-center justify-between relative">
              {steps.map((s, i) => {
                const isDone = step > s.num;
                const isActive = step === s.num;
                return (
                  <div key={s.num} className="flex flex-col items-center flex-1 relative z-10">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isDone
                          ? 'bg-emerald-600 text-white'
                          : isActive
                          ? 'bg-emerald-600 text-white ring-4 ring-emerald-600/15'
                          : 'bg-white text-slate-400 border border-slate-200'
                      }`}
                    >
                      {isDone ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : s.num}
                    </div>
                    <span
                      className={`text-[10px] mt-1.5 font-semibold tracking-tight whitespace-nowrap ${
                        isActive ? 'text-emerald-700' : isDone ? 'text-slate-700' : 'text-slate-400'
                      }`}
                    >
                      {s.label}
                    </span>

                    {/* Connecting line */}
                    {i < steps.length - 1 && (
                      <div
                        className={`absolute top-3.5 left-[calc(50%+14px)] w-[calc(100%-28px)] h-[2px] -z-10 transition-colors ${
                          step > s.num ? 'bg-emerald-600' : 'bg-slate-200'
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Modal Header */}
        {step < 8 && (
          <div className="px-6 pt-4 pb-2 flex items-start justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold uppercase tracking-wider mb-1.5">
                <Shield className="w-3 h-3 text-emerald-600" />
                <span>{tournamentTitle}</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                {step === 1 && 'Register Your Team'}
                {step >= 2 && step <= 6 && playerLabelMap[step]}
                {step === 7 && 'Complete Registration'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {step === 1 && 'Choose a team name for brackets, schedule, and match lobby.'}
                {step >= 2 && step <= 6 && `Step ${step} of 7 — Enter verified student and game credentials.`}
                {step === 7 && 'Review tournament entry and complete verification payment.'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {/* Step 1 — Team Name */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Team Identity
                  </h4>
                </div>

                <div>
                  <label htmlFor="teamName" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Team Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <Shield className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                    <input
                      id="teamName"
                      type="text"
                      placeholder="e.g. Phoenix Vipers"
                      value={data.teamName}
                      maxLength={30}
                      autoFocus
                      onChange={(e) => {
                        setData((p) => ({ ...p, teamName: e.target.value }));
                        setErrors((p) => { const n = { ...p }; delete n.teamName; return n; });
                      }}
                      className={`w-full pl-10 pr-16 py-3 bg-slate-50/70 hover:bg-slate-100/60 focus:bg-white border ${
                        errors.teamName ? 'border-red-400 bg-red-50/30' : 'border-slate-200'
                      } focus:border-brand-primary focus:ring-3 focus:ring-brand-primary/10 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 outline-none transition-all`}
                    />
                    <span className="absolute right-3 px-2 py-0.5 rounded-md bg-slate-200 text-slate-500 text-[11px] font-semibold">
                      {data.teamName.length}/30
                    </span>
                  </div>
                  {errors.teamName && (
                    <p className="text-[11px] text-red-500 font-medium mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.teamName}
                    </p>
                  )}
                </div>

                <div className="flex items-start gap-2.5 bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-xs text-slate-600 mt-4 leading-relaxed">
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    Make sure your team name is appropriate and unique. This name will appear on official stream broadcasts, schedule fixtures, and leaderboards.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Steps 2–6 — Player details */}
          {step >= 2 && step <= 6 && <PlayerForm stepNum={step} />}

          {/* Step 7 — Payment */}
          {step === 7 && (
            <div className="space-y-4">
              {/* Order summary card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-200">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Entry Summary
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Tournament</span>
                    <span className="font-semibold text-slate-900">{tournamentTitle}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Registered Team</span>
                    <span className="font-semibold text-emerald-700">{data.teamName}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Squad Roster</span>
                    <span className="font-semibold text-slate-900">4 Main + 1 Substitute</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                    <span className="font-bold text-slate-900">Total Entry Fee</span>
                    <span className="text-xl font-extrabold text-emerald-700">{entryFee}</span>
                  </div>
                </div>
              </div>

              {/* UPI section */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100">
                  <CreditCard className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Instant UPI Payment
                  </span>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap mb-3.5">
                  {['Google Pay', 'PhonePe', 'Paytm', 'BHIM', 'Any UPI'].map((app) => (
                    <span
                      key={app}
                      className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 text-xs font-semibold"
                    >
                      {app}
                    </span>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Your UPI ID / VPA <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <CreditCard className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="e.g. 9876543210@okhdfcbank"
                      value={upiId}
                      onChange={(e) => {
                        setUpiId(e.target.value);
                        setErrors((p) => { const n = { ...p }; delete n.upiId; return n; });
                      }}
                      className={`w-full pl-10 pr-3.5 py-2.5 bg-slate-50/70 hover:bg-slate-100/60 focus:bg-white border ${
                        errors.upiId ? 'border-red-400 bg-red-50/30' : 'border-slate-200'
                      } focus:border-brand-primary focus:ring-3 focus:ring-brand-primary/10 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 outline-none transition-all`}
                    />
                  </div>
                  {errors.upiId && (
                    <p className="text-[11px] text-red-500 font-medium mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.upiId}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-3.5 text-xs text-slate-500">
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Encrypted & verified via tournament escrow. Slot reserved instantly.</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 8 — Success */}
          {step === 8 && (
            <div className="py-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-600 flex items-center justify-center mb-4 shadow-lg shadow-emerald-600/30">
                <Check className="w-8 h-8 text-white" strokeWidth={3} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                Registration Confirmed!
              </h3>
              <p className="text-sm text-slate-600 mt-1 max-w-sm">
                Team <strong>{data.teamName}</strong> has been successfully registered for <strong>{tournamentTitle}</strong>.
              </p>

              <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 my-6 text-left space-y-2 text-sm">
                <div className="flex justify-between items-center text-slate-600">
                  <span>Registration ID</span>
                  <span className="font-mono font-bold text-emerald-700">VSS-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Entry Amount</span>
                  <span className="font-semibold text-slate-900">{entryFee} (Paid)</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Status</span>
                  <span className="font-bold text-emerald-700">Verified & Slot Reserved</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  onSuccess?.();
                  onClose();
                }}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all cursor-pointer shadow-sm hover:shadow-md"
              >
                Done
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer with buttons */}
        {step < 8 && (
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between gap-3">
            <div>
              {step > 1 && (
                <button
                  type="button"
                  onClick={back}
                  disabled={paymentProcessing}
                  className="px-4 py-2.5 border border-slate-200 hover:bg-white text-slate-700 font-semibold text-xs sm:text-sm rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={next}
              disabled={paymentProcessing}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-sm hover:shadow-md disabled:opacity-60"
            >
              {paymentProcessing ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing…
                </span>
              ) : step === 7 ? (
                <>
                  Pay {entryFee} & Register
                  <Check className="w-4 h-4" />
                </>
              ) : (
                <>
                  Continue
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
