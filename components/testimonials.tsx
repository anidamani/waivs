import { useLanguage } from "@/lib/language-provider"

const testimonials = [
  {
    quoteKey: "testimonials.quote1",
    authorKey: "testimonials.author1",
    titleKey: "testimonials.title1",
  },
  {
    quoteKey: "testimonials.quote2",
    authorKey: "testimonials.author2",
    titleKey: "testimonials.title2",
  },
  {
    quoteKey: "testimonials.quote3",
    authorKey: "testimonials.author3",
    titleKey: "testimonials.title3",
  },
]

export default function Testimonials() {
  const { t } = useLanguage()

  return (
    <section id="testimonials" className="container space-y-16 py-24 md:py-32">
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">{t('testimonials.mainTitle')}</h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          {t('testimonials.subtitle')}
        </p>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <div key={testimonial.authorKey} className="relative overflow-hidden rounded-lg border bg-background p-8">
            <blockquote className="space-y-4">
              <p className="text-muted-foreground">"{t(testimonial.quoteKey)}"</p>
              <footer>
                <p className="font-semibold">{t(testimonial.authorKey)}</p>
                <p className="text-sm text-muted-foreground">{t(testimonial.titleKey)}</p>
              </footer>
            </blockquote>
          </div>
        ))}
      </div>
    </section>
  )
}

