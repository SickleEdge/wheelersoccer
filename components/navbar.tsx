"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"
import Image from "next/image"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/roster", label: "Roster" },
  { href: "/schedule", label: "Schedule" },
  { href: "/stats", label: "Stats" },
  { href: "/support", label: "Support" },
  { href: "/links", label: "Links" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full bg-navy shadow-md">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-gold">
              <div className="absolute inset-0 bg-navy flex items-center justify-center text-gold font-bold text-xl">
                W
              </div>
            </div>
            <span className="font-bold text-white">Wheeler Soccer</span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium text-white hover:text-gold transition-colors",
                  pathname === item.href ? "text-gold" : ""
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link href="/contact">
            <Button
              variant="outline"
              size="sm"
              className="border-gold text-gold hover:bg-gold hover:text-navy"
            >
              Contact Us
            </Button>
          </Link>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="border-gold text-gold hover:bg-gold hover:text-navy"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-navy border-gold">
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-lg font-medium text-white hover:text-gold transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link href="/contact" className="mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-gold text-gold hover:bg-gold hover:text-navy"
                  >
                    Contact Us
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

