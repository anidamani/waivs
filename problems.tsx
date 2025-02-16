import { Clock, FileText, Frown, Battery } from "lucide-react"
import { useLanguage } from "@/lib/language-provider"

const problems = [
  {
    icon: Clock,
    title: "Endless Paperwork",
    description: "Spending hours after sessions catching up on notes?",
  },
  {
    icon: FileText,
    title: "Compliance Concerns",
    description: "Worried about errors and potential audits?",
  },
  {
    icon: Frown,
    title: "Administrative Overload",
    description: "Feeling bogged down by tasks that take you away from clients?",
  },
  {
    icon: Battery,
    title: "Burnout Risk",
    description: "Finding it hard to maintain work-life balance due to documentation demands?",
  },
]

export default function Problems() {
  const { t } = useLanguage()

  return (
    <section className="container space-y-16 py-24 md:py-32">
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
          {t('problems.mainTitle')}
        </h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">{t('problems.subtitle')}</p>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
        {problems.map((problem) => (
          <div key={problem.title} className="relative overflow-hidden rounded-lg border bg-background p-8">
            <div className="flex items-center gap-4">
              <problem.icon className="h-8 w-8 text-teal-500" />
              <h3 className="font-bold">{t(`problems.${problem.title.toLowerCase().replace(' ', '')}.title`)}</h3>
            </div>
            <p className="mt-2 text-muted-foreground">{t(`problems.${problem.title.toLowerCase().replace(' ', '')}.description`)}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

