"use client"

import { AnimatedSection } from "@/components/ui/animated-section"
import { Linkedin, Twitter, Mail } from "lucide-react"

const team = [
  {
    name: "Sarah Anderson",
    role: "Founder & CEO",
    image: "/professional-woman-business-portrait-headshot.jpg",
    bio: "15+ years in travel industry leadership",
    social: { linkedin: "#", twitter: "#", email: "#" },
  },
  {
    name: "Michael Chen",
    role: "Head of Operations",
    image: "/professional-asian-man-business-portrait-headshot.jpg",
    bio: "Expert in global tour management",
    social: { linkedin: "#", twitter: "#", email: "#" },
  },
  {
    name: "Emily Roberts",
    role: "Visa Specialist",
    image: "/professional-woman-consultant-portrait-headshot.jpg",
    bio: "10+ years visa processing expertise",
    social: { linkedin: "#", twitter: "#", email: "#" },
  },
  {
    name: "David Kumar",
    role: "Travel Consultant",
    image: "/professional-man-travel-agent-portrait-headshot.jpg",
    bio: "Specialist in luxury travel experiences",
    social: { linkedin: "#", twitter: "#", email: "#" },
  },
]

export function TeamSection() {
  return (
    <section className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <AnimatedSection direction="up">
            <p className="text-primary font-semibold tracking-widest uppercase mb-4 text-sm">Meet Our Team</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              The Experts Behind Your Journey
            </h2>
            <p className="text-muted-foreground text-lg">
              Our dedicated team of travel professionals is passionate about creating unforgettable experiences
            </p>
          </AnimatedSection>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <AnimatedSection key={index} direction="up" delay={index * 100}>
              <div className="group relative">
                <div className="relative overflow-hidden rounded-2xl mb-5">
                  <div className="aspect-square">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                    <div className="flex gap-3">
                      <a
                        href={member.social.linkedin}
                        className="p-2 rounded-full bg-card/20 backdrop-blur-sm hover:bg-primary transition-colors"
                      >
                        <Linkedin className="h-4 w-4 text-white" />
                      </a>
                      <a
                        href={member.social.twitter}
                        className="p-2 rounded-full bg-card/20 backdrop-blur-sm hover:bg-primary transition-colors"
                      >
                        <Twitter className="h-4 w-4 text-white" />
                      </a>
                      <a
                        href={member.social.email}
                        className="p-2 rounded-full bg-card/20 backdrop-blur-sm hover:bg-primary transition-colors"
                      >
                        <Mail className="h-4 w-4 text-white" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium text-sm mb-2">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
