"use client"

import { AnimatedSection } from "@/components/ui/animated-section"

const partners = [
  { name: "Emirates", logo: "/emirates-airline-logo.png" },
  { name: "Marriott", logo: "/marriott-hotels-logo.jpg" },
  { name: "Turkish Airlines", logo: "/turkish-airlines-logo.png" },
  { name: "Booking.com", logo: "/booking-logo.png" },
  { name: "Singapore Airlines", logo: "/singapore-airlines-logo.png" },
  { name: "Hilton", logo: "/generic-hotel-logo.png" },
]

export function PartnersSection() {
  return (
    <section className="py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <AnimatedSection direction="up">
            <p className="text-primary font-semibold tracking-widest uppercase mb-4 text-sm">Trusted Partners</p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">We Work With The Best</h2>
          </AnimatedSection>
        </div>

        <AnimatedSection direction="up" delay={200}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-6 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 grayscale hover:grayscale-0"
              >
                <img
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  className="h-8 md:h-10 object-contain opacity-60 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
