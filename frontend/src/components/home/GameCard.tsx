import Image from 'next/image';
import Link from 'next/link';

interface GameCardProps {
  title: string;
  image: string;
  description: string;
  slug: string;
}

export default function GameCard({ title, image, description, slug }: GameCardProps) {
  return (
    <Link href={`/games/${slug}`} className="group block relative h-[420px] w-full rounded-[1.5rem] overflow-hidden shadow-lg shadow-black/5 hover:shadow-2xl hover:shadow-brand-primary/20 transition-all duration-300 border border-brand-border/50">
      
      <Image 
        src={image} 
        alt={title} 
        fill 
        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent"></div>
      
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <h3 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-widest mb-3">
          {title}
        </h3>
        
        <p className="text-gray-300 text-sm sm:text-base mb-8 max-w-[95%] leading-relaxed font-medium">
          {description}
        </p>
        
        <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white font-bold text-sm tracking-widest hover:bg-white/10 hover:border-white/40 transition-all w-fit">
          EXPLORE
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 9h16M4 15h10" />
          </svg>
        </div>
      </div>

    </Link>
  );
}
