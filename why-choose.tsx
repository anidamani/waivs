import { Zap, Scale, Clock } from "lucide-react"

const reasons = [
  {
    icon: Zap,
    title: "Effortless Automation",
    description:
      "Transform your clinical notes into actionable data with minimal effort. Simply record or dictate sessions and let Waivs.ai handle the rest.",
  },
  {
    icon: Scale,
    title: "Scalable Solutions",
    description:
      "Whether you're a solo practitioner or part of a large practice, Waivs.ai adapts to your needs without compromising quality.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description:
      "Access your documentation anytime, anywhere. Waivs.ai is always ready to support your practice with consistent performance.",
  },
]

export default function WhyChoose() {
  return (
    <section className="container space-y-16 py-24 md:py-32 bg-gradient-to-b from-background to-background/80">
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">The Waivs.ai Advantage</h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">Built for Mental Health Professionals, Powered by AI</p>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
        {reasons.map((reason) => (
          <div key={reason.title} className="relative overflow-hidden rounded-lg border bg-background p-8">
            <div className="flex items-center gap-4">
              <reason.icon className="h-8 w-8 text-teal-500" />
              <h3 className="font-bold">{reason.title}</h3>
            </div>
            <p className="mt-2 text-muted-foreground">{reason.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

