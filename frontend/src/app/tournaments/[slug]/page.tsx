import { Suspense } from 'react';
import Footer from '@/components/layout/Footer';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import RegisterButton from '@/components/tournaments/RegisterButton';

interface TournamentDetail {
  title: string;
  image: string;
  game: string;
  prizePool: string;
  totalSlots: number;
  remainingSlots: number;
  pricePerTeam: string;
  format: string;
  type: string;
  duration: string;
  rules: string[];
}

// Mock data for tournament details
const tournamentDetailsMock: Record<string, TournamentDetail> = {
  'ff-weekly-scrims-s1': {
    title: 'Weekly Scrims S1',
    image: '/images/freefire.jpg',
    game: 'Free Fire',
    prizePool: '₹10,000',
    totalSlots: 100,
    remainingSlots: 24,
    pricePerTeam: '₹150',
    format: 'Battle Royale Classic',
    type: 'Squads',
    duration: '15 Nov 2026 - 20 Nov 2026',
    rules: [
      'Emulators are strictly prohibited. Any team caught using emulators will be disqualified immediately.',
      'Teams must register with their exact in-game names. Name changes during the tournament are not allowed.',
      'Using bugs, glitches, or third-party software (hacks) will result in a permanent ban for the entire team.',
      'Teaming up with other squads is not allowed and will lead to immediate disqualification.',
      'All players must join the custom room at least 10 minutes prior to the match start time.',
      'The organizers reserve the right to alter the rules or schedule at their discretion.'
    ]
  },
  'ff-clash-squad-open': {
    title: 'Clash Squad Open',
    image: '/images/freefire.jpg',
    game: 'Free Fire',
    prizePool: '₹5,000',
    totalSlots: 32,
    remainingSlots: 8,
    pricePerTeam: '₹100',
    format: 'Clash Squad',
    type: '4v4',
    duration: '22 Nov 2026 - 24 Nov 2026',
    rules: [
      'Only mobile devices are allowed.',
      'Matches will be a Best of 3 format until the semi-finals.',
      'Toxic behavior or trash talking in all-chat is strictly prohibited.',
      'Disconnected players have 3 minutes to reconnect before the match resumes.'
    ]
  },
  'val-challenger-cup': {
    title: 'Valorant Challenger Cup',
    image: '/images/valorant.jpg',
    game: 'Valorant',
    prizePool: '₹50,000',
    totalSlots: 16,
    remainingSlots: 2,
    pricePerTeam: '₹500',
    format: 'Standard',
    type: '5v5',
    duration: '01 Dec 2026 - 05 Dec 2026',
    rules: [
      'All matches will be played on Mumbai servers.',
      'Teams must have at least 5 players. 1 substitute is allowed.',
      'Using exploits on specific maps will result in round forfeiture.',
      'Players must run Vanguard anti-cheat at all times.'
    ]
  },
  'bgmi-pro-league': {
    title: 'BGMI Pro League',
    image: '/images/bgmi.jpg',
    game: 'BGMI',
    prizePool: '₹1,00,000',
    totalSlots: 64,
    remainingSlots: 12,
    pricePerTeam: '₹300',
    format: 'Battle Royale',
    type: 'Squads',
    duration: '10 Dec 2026 - 20 Dec 2026',
    rules: [
      'iPads and Tablets are not allowed in this tournament.',
      'Points will be calculated based on the official Esports point system (15 points for WWCD).',
      'At least 3 original roster members must play each match.',
      'Screen recording is mandatory for all players during the matches.'
    ]
  },
  'bgmi-tdm-showdown': {
    title: 'TDM Showdown',
    image: '/images/bgmi.jpg',
    game: 'BGMI',
    prizePool: '₹15,000',
    totalSlots: 32,
    remainingSlots: 16,
    pricePerTeam: '₹100',
    format: 'Team Deathmatch',
    type: '4v4',
    duration: '25 Nov 2026 - 28 Nov 2026',
    rules: [
      'Only M416 and AKM assault rifles are allowed.',
      'No slide, no grenades, no heal battles.',
      'First team to 40 kills wins the match.',
      'Any violation of weapon rules will result in immediate disqualification.'
    ]
  }
};

export function generateStaticParams() {
  return Object.keys(tournamentDetailsMock).map((slug) => ({
    slug,
  }));
}

async function TournamentDetailsContent({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const data = tournamentDetailsMock[resolvedParams.slug];

  if (!data) {
    notFound();
  }

  const percentFilled = ((data.totalSlots - data.remainingSlots) / data.totalSlots) * 100;

  return (
    <main className="flex-grow pb-24">
      {/* Banner Section */}
      <div className="relative h-[250px] sm:h-[350px] w-full bg-black">
        {/* Back Button */}
        <div className="absolute top-6 left-6 z-20">
          <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white text-sm font-bold rounded-full transition-all border border-white/20 hover:border-white/40">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            BACK TO HOME
          </Link>
        </div>

        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${data.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-8 sm:pb-12">
          <span className="bg-green-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest w-fit mb-3">
            {data.game}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-widest drop-shadow-lg">
            {data.title}
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Side: Rules */}
          <div className="w-full lg:w-2/3 bg-white p-6 sm:p-10 rounded-2xl shadow-xl border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1.5 h-8 bg-green-600 rounded-full"></div>
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Rules & Regulations</h2>
            </div>
            
            <ul className="space-y-6">
              {data.rules.map((rule: string, index: number) => (
                <li key={index} className="flex gap-4 items-start">
                  <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-green-600 font-bold text-sm">
                    {index + 1}
                  </span>
                  <p className="text-gray-700 leading-relaxed font-medium pt-1">
                    {rule}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side: Details & Registration */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100 sticky top-24">
              <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-6 text-center border-b border-gray-100 pb-4">
                Tournament Overview
              </h3>

              <div className="space-y-5">
                {/* Slots Info */}
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Slots Available</span>
                    <span className="text-sm font-black text-gray-900">
                      <span className="text-green-600">{data.remainingSlots}</span> / {data.totalSlots}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-green-600 h-full rounded-full" 
                      style={{ width: `${percentFilled}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Entry Fee</span>
                    <span className="text-lg font-black text-gray-900">{data.pricePerTeam}</span>
                  </div>
                  <div className="bg-green-50 p-4 rounded-xl border border-green-100 flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest mb-1">Prize Pool</span>
                    <span className="text-lg font-black text-green-700">{data.prizePool}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                      Format Type
                    </span>
                    <span className="text-sm font-black text-gray-900">{data.format}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                      Player Format
                    </span>
                    <span className="text-sm font-black text-gray-900">{data.type}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      Duration
                    </span>
                    <span className="text-sm font-black text-gray-900 text-right">{data.duration}</span>
                  </div>
                </div>

                <div className="pt-6">
                  <RegisterButton
                    tournamentTitle={data.title}
                    entryFee={data.pricePerTeam}
                    remainingSlots={data.remainingSlots}
                  />
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}

export default function TournamentDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Suspense fallback={<div className="py-20 text-center text-gray-500">Loading tournament...</div>}>
        <TournamentDetailsContent params={params} />
      </Suspense>
      <Footer />
    </div>
  );
}
