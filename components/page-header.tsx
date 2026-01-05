"use client"

import { AnimatedSection } from "@/components/ui/animated-section"

interface PageHeaderProps {
  title: string
  subtitle: string
  breadcrumb: string
  backgroundImage?: string
}

export function PageHeader({ title, subtitle, breadcrumb, backgroundImage }: PageHeaderProps) {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: backgroundImage
              ? `url(${backgroundImage})`
              : `url(/placeholder.svg?height=800&width=1600&query=travel destination scenic landscape)`,
          }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-[oklch(0.25_0.06_250/0.85)] via-[oklch(0.25_0.06_250/0.75)] to-[oklch(0.25_0.06_250/0.9)]" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center pt-24">
        <AnimatedSection direction="up" delay={0}>
          <p className="text-primary font-medium tracking-widest uppercase mb-4 text-sm">{breadcrumb}</p>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={100}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance">{title}</h1>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={200}>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">{subtitle}</p>
        </AnimatedSection>

        {/* Scroll Indicator */}
        <AnimatedSection direction="fade" delay={600} className="mt-12">
          <div className="flex flex-col items-center gap-2">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
              <div className="w-1.5 h-2.5 bg-primary rounded-full animate-bounce" />
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="oklch(0.99 0.005 240)"
          />
        </svg>
      </div>
    </section>
  )
}
