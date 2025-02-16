import type { Metadata } from "next"
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import type React from "react"
import MouseMoveEffect from "@/components/mouse-move-effect"
import Navbar from "@/components/navbar"
import { LanguageProvider } from "@/lib/language-provider"

const inter = Inter({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Therapy Manager",
  description: "AI Sessions for therapists",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider appearance={{ baseTheme: undefined }}>
      <html lang="en" className="light" suppressHydrationWarning>
        <body className={`${inter.className} bg-background text-foreground antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <LanguageProvider>
              <MouseMoveEffect />
              <Navbar />
              <main className="pt-14">{children}</main>
            </LanguageProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}