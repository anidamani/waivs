import { Clock, Shield, DollarSign, Eye, GitGraphIcon as GitFlow, Heart } from "lucide-react"
import { useLanguage } from "@/lib/language-provider"

const features = [
  {
    icon: Clock,
    titleKey: "features.time.title",
    descriptionKey: "features.time.description",
  },
  {
    icon: Shield,
    titleKey: "features.compliance.title",
    descriptionKey: "features.compliance.description",
  },
  {
    icon: DollarSign,
    titleKey: "features.revenue.title",
    descriptionKey: "features.revenue.description",
  },
  {
    icon: Eye,
    titleKey: "features.focus.title",
    descriptionKey: "features.focus.description",
  },
  {
    icon: GitFlow,
    titleKey: "features.workflow.title",
    descriptionKey: "features.workflow.description",
  },
  {
    icon: Heart,
    titleKey: "features.peace.title",
    descriptionKey: "features.peace.description",
  },
]

export default function Features() {
  const { t } = useLanguage()

  return (
    <section id="features" className="container space-y-16 py-24 md:py-32">
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">{t('features.mainTitle')}</h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          {t('features.subtitle')}
        </p>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div key={feature.titleKey} className="relative overflow-hidden rounded-lg border bg-background p-8">
            <div className="flex items-center gap-4">
              <feature.icon className="h-8 w-8 text-teal-500" />
              <h3 className="font-bold">{t(feature.titleKey)}</h3>
            </div>
            <p className="mt-2 text-muted-foreground">{t(feature.descriptionKey)}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

