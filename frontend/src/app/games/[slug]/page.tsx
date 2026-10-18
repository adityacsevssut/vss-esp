import { Suspense } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TournamentCard from '@/components/tournaments/TournamentCard';
import { notFound } from 'next/navigation';

// Mock data for tournaments based on game
const tournamentsData: Record<string, {
  name: string;
  headerImage: string;
  tournaments: Array<{
    id: string;
    title: string;
    image: string;
    prizePool: string;
    format: string;
    type: string;
    slug: string;
    totalSlots: number;
    remainingSlots: number;
    organizer: string;
  }>;
}> = {
  'free-fire': {
    name: 'Free Fire',
    headerImage: '/images/freefire.jpg',
    tournaments: [
      {
        id: '1',
        title: 'Weekly Scrims S1',
        image: '/images/freefire.jpg',
        prizePool: '₹10,000',
        format: 'Battle Royale Classic',
        type: 'Squads',
        slug: 'ff-weekly-scrims-s1',
        totalSlots: 100,
        remainingSlots: 24,
        organizer: 'Vss Esports',
      },
      {
        id: '2',
        title: 'Clash Squad Open',
        image: '/images/freefire.jpg',
        prizePool: '₹5,000',
        format: 'Clash Squad',
        type: '4v4',
        slug: 'ff-clash-squad-open',
        totalSlots: 32,
        remainingSlots: 8,
        organizer: 'Alpha Gaming',
      }
    ]
  },
  'valorant': {
    name: 'Valorant',
    headerImage: '/images/valorant.jpg',
    tournaments: [
      {
        id: '3',
        title: 'Valorant Challenger Cup',
        image: '/images/valorant.jpg',
        prizePool: '₹50,000',
        format: 'Standard',
        type: '5v5',
        slug: 'val-challenger-cup',
        totalSlots: 16,
        remainingSlots: 2,
        organizer: 'Riot Ops',
      }
    ]
  },
  'bgmi': {
    name: 'BGMI',
    headerImage: '/images/bgmi.jpg',
    tournaments: [
      {
        id: '4',
        title: 'BGMI Pro League',
        image: '/images/bgmi.jpg',
        prizePool: '₹1,00,000',
        format: 'Battle Royale',
        type: 'Squads',
        slug: 'bgmi-pro-league',
        totalSlots: 64,
        remainingSlots: 12,
        organizer: 'India Esports',
      },
      {
        id: '5',
        title: 'TDM Showdown',
        image: '/images/bgmi.jpg',
        prizePool: '₹15,000',
        format: 'Team Deathmatch',
        type: '4v4',
        slug: 'bgmi-tdm-showdown',
        totalSlots: 32,
        remainingSlots: 16,
        organizer: 'Battle Arena',
      }
    ]
  }
};

// Support both 'freefire' and 'free-fire' slugs
tournamentsData['freefire'] = tournamentsData['free-fire'];

export function generateStaticParams() {
  return Object.keys(tournamentsData).map((slug) => ({
    slug,
  }));
}

async function GameTournamentsContent({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug?.toLowerCase();
  const gameData = slug ? tournamentsData[slug] || tournamentsData[slug.replace(/_/g, '-')] : undefined;

  if (!gameData) {
    notFound();
  }

  return (
    <section className="pt-6 sm:pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <h2 className="text-xl sm:text-2xl font-bold text-green-600 uppercase tracking-tight">
            {gameData.name} Tournaments
          </h2>
          <span className="bg-brand-primary text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-full whitespace-nowrap shrink-0 w-fit">
            {gameData.tournaments.length} {gameData.tournaments.length === 1 ? 'Event' : 'Events'}
          </span>
        </div>

        {gameData.tournaments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gameData.tournaments.map((tournament) => (
              <TournamentCard 
                key={tournament.id}
                title={tournament.title}
                image={tournament.image}
                prizePool={tournament.prizePool}
                format={tournament.format}
                type={tournament.type}
                slug={tournament.slug}
                totalSlots={tournament.totalSlots}
                remainingSlots={tournament.remainingSlots}
                organizer={tournament.organizer}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-lg font-medium">No active tournaments found for this game.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default function GameTournamentsPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow">
        <Suspense fallback={
          <div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-500">
            Loading tournaments...
          </div>
        }>
          <GameTournamentsContent params={params} />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
