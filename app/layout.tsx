import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Navbar from '@/components/navbar';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Wheeler Soccer',
  description: 'Wheeler High School Soccer Team',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={cn(inter.className, 'min-h-full bg-gray-50')}>
        <div className="relative flex min-h-screen flex-col">
          <div className="bg-navy w-full sticky top-0 z-50">
            <Navbar />
          </div>
          <main className="flex-1">{children}</main>
          <footer className="bg-navy text-white py-8">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-xl font-bold text-gold">Wheeler Soccer</h3>
                  <p className="text-sm text-white/80">Building champions on and off the field</p>
                </div>
                <div className="flex space-x-6">
                  <Link href="/contact" className="text-white hover:text-gold transition-colors">
                    Contact
                  </Link>
                  <a
                    href="https://www.instagram.com/wheelerboyssoccer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gold transition-colors"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}



import './globals.css'