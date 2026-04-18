import Link from 'next/link';
import { BadgeCheck } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/50 backdrop-blur-md">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 font-bold text-lg text-blue-700">
          <BadgeCheck className="h-6 w-6" />
          <span>Inspection App</span>
        </Link>
      </div>
    </nav>
  );
}
