import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-provider"

export default function CTA() {
  const { t } = useLanguage()

  return (
    <section className="border-t">
      <div className="container flex flex-col items-center gap-4 py-24 text-center md:py-32">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">{t('cta.title')}</h2>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          {t('cta.description')}
        </p>
        <Button
          size="lg"
          className="mt-4 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
        >
          {t('cta.startTrial')}
        </Button>
        <p className="text-sm text-muted-foreground">
          {t('cta.offer')}
        </p>
      </div>
    </section>
  )
}

