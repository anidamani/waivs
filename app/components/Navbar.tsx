"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-provider"
import { Globe } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            >
              huly
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-8">
                <Link href="#" className="text-sm text-gray-300 hover:text-white">
                  {t('nav.pricing')}
                </Link>
                <Link href="#" className="text-sm text-gray-300 hover:text-white">
                  {t('nav.features')}
                </Link>
                <Link href="#" className="text-sm text-gray-300 hover:text-white">
                  {t('nav.testimonials')}
                </Link>
                <Link href="#" className="text-sm text-gray-300 hover:text-white">
                  {t('nav.about')}
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage('en')}>
                  {t('common.english')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('ar')}>
                  {t('common.arabic')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" className="text-sm">
              {t('auth.signIn')}
            </Button>
            <Button className="text-sm bg-gradient-to-r from-primary to-accent hover:opacity-90">
              {t('auth.signUp')}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

