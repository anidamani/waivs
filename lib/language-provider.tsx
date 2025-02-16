"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

type Language = 'en' | 'ar'
type Direction = 'ltr' | 'rtl'

type LanguageContextType = {
  language: Language
  direction: Direction
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Move useLanguage before LanguageProvider
export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')
  const [translations, setTranslations] = useState<Record<string, any>>({})
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    // Load saved language preference from localStorage
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    // Load translations for current language
    async function loadTranslations() {
      setIsLoading(true)
      try {
        const data = await import(`@/translations/${language}.json`)
        setTranslations(data.default || data)
      } catch (error) {
        console.error('Error loading translations:', error)
        setTranslations({})
      } finally {
        setIsLoading(false)
      }
    }
    loadTranslations()
  }, [language])

  const direction = language === 'ar' ? 'rtl' : 'ltr'

  const t = (key: string): string => {
    if (isLoading) {
      // Return empty string while loading to prevent flash of translation keys
      return ''
    }

    const keys = key.split('.')
    let value: unknown = translations

    for (const k of keys) {
      if (typeof value !== 'object' || value === null || !(k in value)) {
        console.warn(`Translation key not found: ${key}`)
        return key
      }
      value = (value as Record<string, unknown>)[k]
    }

    if (typeof value !== 'string') {
      console.warn(`Translation value for key: ${key} is not a string`)
      return key
    }

    return value
  }

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}