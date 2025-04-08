import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gold">Wheeler Soccer</h3>
            <p className="text-sm text-white/80">
              375 Holt Rd NE
              <br />
              Marietta, GA 30068-3568
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-white/80 hover:text-gold transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-white/80 hover:text-gold transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-white/80 hover:text-gold transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-white/80 hover:text-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/roster" className="text-white/80 hover:text-gold transition-colors">
                  Roster
                </Link>
              </li>
              <li>
                <Link href="/schedule" className="text-white/80 hover:text-gold transition-colors">
                  Schedule
                </Link>
              </li>
              <li>
                <Link href="/stats" className="text-white/80 hover:text-gold transition-colors">
                  Stats
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-white/80 hover:text-gold transition-colors">
                  MaxPreps
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/80 hover:text-gold transition-colors">
                  GoFan
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/80 hover:text-gold transition-colors">
                  NFHS Network
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/80 hover:text-gold transition-colors">
                  Wheeler Athletics
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gold">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <Mail size={16} className="text-gold" />
                <a href="mailto:coach@wheelersoccer.com" className="text-white/80 hover:text-gold transition-colors">
                  coach@wheelersoccer.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} className="text-gold" />
                <a href="tel:+1234567890" className="text-white/80 hover:text-gold transition-colors">
                  (123) 456-7890
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-white/60">
          <p>© {new Date().getFullYear()} Wheeler High School Soccer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

