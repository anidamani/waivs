import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/lib/language-provider"

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section className="container flex min-h-[calc(100vh-3.5rem)] max-w-screen-2xl flex-col items-center justify-center space-y-8 pt-14 pb-16 text-center md:py-24">
      <div className="space-y-4">
        <h1 className="bg-gradient-to-br from-foreground from-30% via-foreground/90 to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
          {t('hero.title1')}
          <br />
          {t('hero.title2')}
        </h1>
        <p className="mx-auto max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          {t('hero.description')}
        </p>
      </div>
      <div className="flex gap-4">
        <Button size="lg" className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600">
          {t('hero.getStarted')}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="outline" size="lg">
          {t('hero.requestDemo')}
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        {t('hero.noCreditCard')}
      </p>
    </section>
  )
}

