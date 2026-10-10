import Image from 'next/image';
import Link from 'next/link';

interface TournamentCardProps {
  title: string;
  image: string;
  prizePool: string;
  format: string;
  type: string;
  slug: string;
  totalSlots: number;
  remainingSlots: number;
  organizer: string;
}

export default function TournamentCard({ title, image, prizePool, format, type, slug, totalSlots, remainingSlots, organizer }: TournamentCardProps) {
  const percentFilled = ((totalSlots - remainingSlots) / totalSlots) * 100;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 flex flex-col transition-transform hover:-translate-y-2 hover:shadow-2xl duration-300 group">
      <div className="relative h-48 w-full overflow-hidden">
        <Image 
          src={image} 
          alt={title} 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        
        <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-black shadow-lg flex items-center gap-1 backdrop-blur-sm border border-green-500/50">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          {prizePool}
        </div>

        <div className="absolute bottom-4 left-5 right-5">
          <h3 className="text-2xl font-black text-white uppercase tracking-tight leading-tight drop-shadow-md">{title}</h3>
        </div>
      </div>
      
      <div className="p-5 flex-grow flex flex-col bg-gradient-to-b from-white to-gray-50/80">
        
        <div className="flex flex-wrap gap-2 mb-5">
          <span className="bg-gray-100 border border-gray-200 text-gray-700 text-[10px] font-black px-2.5 py-1 rounded uppercase tracking-widest shadow-sm">
            {format}
          </span>
          <span className="bg-green-50 border border-green-200 text-green-700 text-[10px] font-black px-2.5 py-1 rounded uppercase tracking-widest shadow-sm">
            {type}
          </span>
        </div>

        {/* Organizer Section */}
        <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-200/80">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Organising Team</span>
            <span className="text-sm font-bold text-gray-900">{organizer}</span>
          </div>
          <Link href={`#`} className="text-[10px] font-black text-green-600 hover:text-green-700 transition-colors uppercase tracking-widest flex items-center gap-1 bg-green-50 px-2 py-1 rounded border border-green-100">
            View 
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
        
        {/* Slots Section */}
        <div className="mb-6">
          <div className="flex justify-between items-end mb-2">
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Registration Status</span>
            <span className="text-xs font-black text-gray-900">
              <span className="text-green-600">{remainingSlots}</span> / {totalSlots} Slots Left
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden shadow-inner">
            <div 
              className="bg-green-600 h-full rounded-full transition-all duration-1000 ease-out" 
              style={{ width: `${percentFilled}%` }}
            ></div>
          </div>
        </div>
        
        <div className="mt-auto">
          <Link 
            href={`/tournaments/${slug}`}
            className="block w-full text-center bg-gray-900 hover:bg-green-600 text-white font-black py-3.5 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 uppercase tracking-widest text-sm border border-gray-800 hover:border-green-500"
          >
            More Details
          </Link>
        </div>
      </div>
    </div>
  );
}
