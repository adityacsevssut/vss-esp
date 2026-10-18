import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import GameCard from '@/components/home/GameCard';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed navbar sits above everything */}
      <Navbar />

      <main className="flex-grow">
        {/* Full-viewport video hero — no top padding, navbar is overlaid */}
        <Hero />

        {/* Featured Games Section */}
        <section className="pt-8 pb-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-brand-deep uppercase tracking-tight">Featured Games</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <GameCard
                title="Free Fire"
                image="/images/freefire.jpg"
                description="Survival Battle Royale. Be the last one standing."
                slug="free-fire"
              />
              <GameCard
                title="Valorant"
                image="/images/valorant.jpg"
                description="Tactical 5v5 hero shooter. Outsmart your opponents."
                slug="valorant"
              />
              <GameCard
                title="BGMI"
                image="/images/bgmi.jpg"
                description="Realistic battle royale. Drop in, gear up, survive."
                slug="bgmi"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
