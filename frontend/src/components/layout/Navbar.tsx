import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-brand-primary font-black italic text-2xl">
                VE
              </span>
              <span className="font-bold text-xl tracking-tight text-text-main">
                Vss<span className="text-brand-primary">Esp</span>
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-brand-primary font-medium">Home</Link>
            <Link href="/freefire" className="text-text-secondary hover:text-brand-primary font-medium transition-colors">Freefire</Link>
            <Link href="/bgmi" className="text-text-secondary hover:text-brand-primary font-medium transition-colors">BGMI</Link>
            <Link href="/valorant" className="text-text-secondary hover:text-brand-primary font-medium transition-colors">Valorant</Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/login" className="bg-brand-primary hover:bg-brand-hover text-white px-4 py-1.5 text-sm rounded-full font-medium transition-colors shadow-sm shadow-brand-primary/20">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
