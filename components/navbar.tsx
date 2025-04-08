"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { Menu, X, Twitter, Facebook, Instagram } from "lucide-react"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"
import Image from "next/image"
import { SheetHeader, SheetTitle } from "@/components/ui/sheet"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/roster", label: "Roster" },
  { href: "/schedule", label: "Schedule" },
  { href: "/stats", label: "Stats" },
  { href: "/support", label: "Support" },
  { href: "/links", label: "Links" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  
  const handleLinkClick = () => {
    setOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-navy shadow-md">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/wheelersoccer/images/wheeler.png"
            alt="Wheeler Soccer Logo"
            width={40}
            height={40}
            className="animate-pulse"
          />
          <span className="text-lg font-bold text-white animate-slideInLeft">Wheeler Soccer</span>
        </Link>
        <nav className="hidden md:flex gap-6 animate-slideInRight">
          {navItems.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`text-sm font-medium transition-colors hover:text-gold ${
                pathname === route.href
                  ? "text-gold"
                  : "text-white/80"
              } hover-scale`}
            >
              {route.label}
            </Link>
          ))}
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button 
              variant="outline" 
              size="icon" 
              className={`h-9 w-9 text-white border-gold hover:bg-gold/20 animate-slideInRight transition-all duration-300 ${open ? 'bg-gold/20 rotate-90' : ''}`}
            >
              <Menu className={`h-5 w-5 transition-transform ${open ? 'rotate-90' : ''}`} />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent 
            className="bg-navy text-white"
            side="right"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-navy z-0 overflow-hidden">
              <div className="absolute top-10 right-20 w-32 h-32 rounded-full bg-gold/5 animate-float"></div>
              <div className="absolute bottom-40 left-10 w-24 h-24 rounded-full bg-gold/5 animate-pulse"></div>
            </div>
            <SheetHeader className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Image
                    src="/wheelersoccer/images/wheeler.png"
                    alt="Wheeler Logo"
                    width={40}
                    height={40}
                    className="animate-float"
                  />
                  <SheetTitle className="text-white animate-slideDown text-2xl">
                    <span className="gradient-text">Navigate</span>
                  </SheetTitle>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setOpen(false)}
                  className="h-8 w-8 rounded-full p-0 text-white hover:bg-gold/20 animate-fadeIn hover:animate-spin"
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
            </SheetHeader>
            <div className="mt-2 w-1/3 h-0.5 bg-gradient-to-r from-gold to-transparent animate-slideInLeft"></div>
            <nav className="mt-8 flex flex-col gap-5 relative z-10">
              {navItems.map((route, index) => (
                <Link
                  key={route.href}
                  href={route.href}
                  onClick={handleLinkClick}
                  className={`relative text-sm font-medium transition-colors hover:text-gold 
                    ${pathname === route.href ? "text-gold font-bold" : "text-white/80"} 
                    animate-slideInLeft animate-delay-${index * 100}
                    overflow-hidden group py-2 flex items-center`}
                >
                  {pathname === route.href && (
                    <div className="mr-2 w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></div>
                  )}
                  <span className="relative z-10 text-base">{route.label}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
                  {pathname === route.href && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold"></span>
                  )}
                </Link>
              ))}
            </nav>
            
            <div className="absolute bottom-10 left-6 right-6 flex justify-between items-center text-white/50 text-xs animate-fadeIn animate-delay-500 z-10">
              <div className="flex items-center">
                <span>&copy; {new Date().getFullYear()}</span>
              </div>
              <div className="flex space-x-3">
                <a href="#" className="hover:text-gold transition-colors hover-scale">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="#" className="hover:text-gold transition-colors hover-scale">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href="#" className="hover:text-gold transition-colors hover-scale">
                  <Instagram className="h-4 w-4" />
                </a>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

