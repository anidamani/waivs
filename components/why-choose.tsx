import { Zap, Scale, Clock } from "lucide-react"
import { useLanguage } from "@/lib/language-provider"

const reasons = [
  {
    icon: Zap,
    titleKey: "whyChoose.automation.title",
    descriptionKey: "whyChoose.automation.description",
  },
  {
    icon: Scale,
    titleKey: "whyChoose.scalable.title",
    descriptionKey: "whyChoose.scalable.description",
  },
  {
    icon: Clock,
    titleKey: "whyChoose.availability.title",
    descriptionKey: "whyChoose.availability.description",
  },
]

export default function WhyChoose() {
  const { t } = useLanguage()

  return (
    <section className="container space-y-16 py-24 md:py-32 bg-gradient-to-b from-background to-background/80">
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">{t('whyChoose.mainTitle')}</h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">{t('whyChoose.subtitle')}</p>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
        {reasons.map((reason) => (
          <div key={reason.titleKey} className="relative overflow-hidden rounded-lg border bg-background p-8">
            <div className="flex items-center gap-4">
              <reason.icon className="h-8 w-8 text-teal-500" />
              <h3 className="font-bold">{t(reason.titleKey)}</h3>
            </div>
            <p className="mt-2 text-muted-foreground">{t(reason.descriptionKey)}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

