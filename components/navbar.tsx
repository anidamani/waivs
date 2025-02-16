"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton, useAuth } from "@clerk/nextjs"
import { Plus, Moon, Sun, Globe } from "lucide-react"
import { useTheme } from "next-themes"
import { usePathname } from 'next/navigation'
import { useLanguage } from "@/lib/language-provider"

export default function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoverStyle, setHoverStyle] = useState({})
  const [activeStyle, setActiveStyle] = useState({ left: "0px", width: "0px" })
  const tabRefs = useRef<(HTMLDivElement | null)[]>([])

  const publicTabs = [
    { name: t("nav.features"), path: "#features" },
    { name: t("nav.testimonials"), path: "#testimonials" },
    { name: t("nav.pricing"), path: "#pricing" },
    { name: t("nav.about"), path: "/about" }
  ]

  const privateTabs = [
    { name: t("nav.dashboard"), path: "/dashboard" }
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (hoveredIndex !== null) {
      const hoveredElement = tabRefs.current[hoveredIndex]
      if (hoveredElement) {
        const { offsetLeft, offsetWidth } = hoveredElement
        setHoverStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        })
      }
    }
  }, [hoveredIndex])

  useEffect(() => {
    const activeElement = tabRefs.current[activeIndex]
    if (activeElement) {
      const { offsetLeft, offsetWidth } = activeElement
      setActiveStyle({
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
      })
    }
  }, [activeIndex])

  const setTabRef = (index: number) => (el: HTMLDivElement | null): void => {
    if (el) {
      tabRefs.current[index] = el
    }
  }

  const { isLoaded, isSignedIn } = useAuth()

  useEffect(() => {
    let currentActiveIndex = 0;
    if (isSignedIn) {
      currentActiveIndex = privateTabs.findIndex(tab => tab.path === pathname);
      if (currentActiveIndex < 0) currentActiveIndex = 0;
    } else {
      currentActiveIndex = publicTabs.findIndex(tab => tab.path === pathname);
      if (currentActiveIndex < 0) currentActiveIndex = 0;
    }
    setActiveIndex(Math.max(0, currentActiveIndex));
  }, [pathname, isSignedIn, privateTabs, publicTabs]);

  if (!isLoaded) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full flex h-14 items-center px-4 md:px-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-primary">{t("common.appName")}</span>
          </Link>
          <div className="flex items-center gap-4 ml-auto">
            <div className="h-9 w-24 bg-muted/20 animate-pulse rounded-md"></div>
            <div className="h-9 w-24 bg-muted/20 animate-pulse rounded-md"></div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full flex h-14 items-center px-4 md:px-8">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold text-primary">{t("common.appName")}</span>
        </Link>

        <div className="relative flex items-center gap-6">
          {isSignedIn ? (
            privateTabs.map((tab, index) => (
              <div
                key={tab.path}
                ref={setTabRef(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative z-20"
              >
                <Link
                  href={tab.path}
                  className={`text-sm font-medium transition-colors hover:text-primary ${pathname === tab.path ? "text-primary" : "text-muted-foreground"}`}
                >
                  {tab.name}
                </Link>
              </div>
            ))
          ) : (
            publicTabs.map((tab, index) => (
              <div
                key={tab.path}
                ref={setTabRef(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative z-20"
              >
                <Link
                  href={tab.path}
                  className={`text-sm font-medium transition-colors hover:text-primary ${pathname === tab.path ? "text-primary" : "text-muted-foreground"}`}
                >
                  {tab.name}
                </Link>
              </div>
            ))
          )}
        </div>

        <div className="flex items-center gap-4 ml-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            title={t("common.language")}
          >
            <Globe className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {mounted && theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="ghost">{t("auth.signIn")}</Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button>{t("auth.signUp")}</Button>
            </SignUpButton>
          </SignedOut>
        </div>
      </div>
    </header>
  )
}