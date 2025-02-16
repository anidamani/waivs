const testimonials = [
  {
    quote:
      "Waivs.ai has transformed my practice. I now spend more time with clients and less time on paperwork. It's been a game-changer for my work-life balance.",
    author: "Dr. Sarah L.",
    title: "Licensed Therapist",
  },
  {
    quote:
      "The ease of use and compliance confidence I get with Waivs.ai is incredible. It's like having a dedicated documentation assistant.",
    author: "Michael B.",
    title: "Clinical Social Worker",
  },
  {
    quote:
      "Since implementing Waivs.ai, our center has seen a 30% increase in efficiency. The ROI has been remarkable.",
    author: "Jessica M.",
    title: "Counseling Center Director",
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="container space-y-16 py-24 md:py-32">
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Hear What Clinicians Are Saying</h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          Join countless mental health professionals who trust Waivs.ai
        </p>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <div key={testimonial.author} className="relative overflow-hidden rounded-lg border bg-background p-8">
            <blockquote className="space-y-4">
              <p className="text-muted-foreground">"{testimonial.quote}"</p>
              <footer>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.title}</p>
              </footer>
            </blockquote>
          </div>
        ))}
      </div>
    </section>
  )
}

