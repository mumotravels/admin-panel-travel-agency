"use client"

import { useInView } from "react-intersection-observer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

const faqs = [
  {
    question: "How do I apply for a visa through your agency?",
    answer:
      "Simply contact us via phone, WhatsApp, or visit our office. Our visa experts will guide you through the entire process, including document preparation, application submission, and interview preparation. We handle tourist, business, student, and work visas for all countries.",
  },
  {
    question: "Do you arrange group tours?",
    answer:
      "Yes! We specialize in both private and group tours. Our group packages offer great value with shared accommodations and activities. We also customize group tours for families, corporate teams, and special occasions like weddings and honeymoons.",
  },
  {
    question: "What is your visa success rate?",
    answer:
      "We're proud to maintain a 99% visa approval rate. Our experienced consultants thoroughly review all applications and documents before submission, significantly increasing approval chances. We also provide interview coaching when required.",
  },
  {
    question: "Can I customize my travel package?",
    answer:
      "All our packages can be tailored to your preferences. Whether you want to add extra days, upgrade hotels, include specific activities, or change destinations, our travel planners will create a personalized itinerary just for you.",
  },
  {
    question: "What payment options do you accept?",
    answer:
      "We accept multiple payment methods including bank transfers, credit/debit cards, and cash payments at our office. We also offer flexible payment plans for larger bookings, allowing you to pay in installments before your travel date.",
  },
  {
    question: "Do you provide travel insurance?",
    answer:
      "Yes, we offer comprehensive travel insurance packages covering medical emergencies, trip cancellations, lost luggage, and more. Travel insurance is mandatory for visa applications to many countries, and we'll help you select the right coverage.",
  },
  {
    question: "How far in advance should I book my trip?",
    answer:
      "We recommend booking at least 4-6 weeks in advance for international travel, especially if you need visa processing. For peak seasons and popular destinations, 2-3 months advance booking is ideal to secure the best deals and availability.",
  },
  {
    question: "Do you offer Umrah and Hajj packages?",
    answer:
      "Yes, we provide complete Umrah and Hajj packages including visa processing, flights, accommodation near Haram, ground transportation, and guided spiritual tours. Our packages cater to different budgets from economy to VIP services.",
  },
]

export function FAQSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="md:py-16 py-4 lg:py-32 bg-background" ref={ref}>
      <div className="container mx-auto px-4 md:px-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Side */}
          <div
            className={cn(
              "transition-all duration-700",
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10",
            )}
          >
            <p className="text-primary font-medium tracking-wider uppercase mb-4">FAQ</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Find answers to common questions about our travel services, visa processing, and booking procedures. Can't
              find what you're looking for? Contact us directly!
            </p>
            <div className="p-6 rounded-2xl bg-primary text-primary-foreground">
              <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
              <p className="text-primary-foreground/80 mb-4">Our team is ready to help you with any queries.</p>
              <a
                href="https://wa.me/8801332846700"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold hover:underline"
              >
                WhatsApp: +8801332-846700
              </a>
            </div>
          </div>

          {/* Right Side - Accordion */}
          <div
            className={cn(
              "transition-all duration-700 delay-200",
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10",
            )}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card rounded-xl border border-border px-6 data-[state=open]:border-primary/30 data-[state=open]:shadow-lg transition-all"
                >
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary py-5 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
