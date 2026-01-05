"use client"

import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Star, Users, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const packages = [
  {
    image: "/dubai-skyline-luxury-hotel-burj-khalifa-night-view.jpg",
    title: "Dubai Explorer",
    location: "Dubai, UAE",
    duration: "5 Days / 4 Nights",
    groupSize: "2-10 People",
    rating: 4.9,
    reviews: 128,
    price: 1299,
    originalPrice: 1599,
    featured: true,
  },
  {
    image: "/singapore-marina-bay-sands-cityscape-night-lights.jpg",
    title: "Singapore Adventure",
    location: "Singapore",
    duration: "4 Days / 3 Nights",
    groupSize: "2-8 People",
    rating: 4.8,
    reviews: 96,
    price: 999,
    originalPrice: 1199,
    featured: false,
  },
  {
    image: "/maldives-overwater-villa-tropical-paradise-crystal.jpg",
    title: "Maldives Honeymoon",
    location: "Maldives",
    duration: "6 Days / 5 Nights",
    groupSize: "2 People",
    rating: 5.0,
    reviews: 84,
    price: 2499,
    originalPrice: 2999,
    featured: true,
  },
  {
    image: "/europe-paris-london-rome-landmarks-travel-collage.jpg",
    title: "Europe Explorer",
    location: "France, Italy, UK",
    duration: "10 Days / 9 Nights",
    groupSize: "6-15 People",
    rating: 4.9,
    reviews: 156,
    price: 3499,
    originalPrice: 3999,
    featured: false,
  },
  {
    image: "/turkey-istanbul-cappadocia-hot-air-balloons-sunris.jpg",
    title: "Magical Turkey",
    location: "Turkey",
    duration: "7 Days / 6 Nights",
    groupSize: "4-12 People",
    rating: 4.8,
    reviews: 112,
    price: 1599,
    originalPrice: 1899,
    featured: false,
  },
  {
    image: "/malaysia-kuala-lumpur-petronas-towers-tropical-cit.jpg",
    title: "Malaysia Escape",
    location: "Malaysia",
    duration: "5 Days / 4 Nights",
    groupSize: "2-10 People",
    rating: 4.7,
    reviews: 78,
    price: 899,
    originalPrice: 1099,
    featured: false,
  },
]

export function PackagesSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section
      id="packages"
      className="py-12 md:py-24 lg:py-32 bg-secondary/30 relative overflow-hidden px-3 md:px-20"
      ref={ref}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] hidden md:block" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky/5 rounded-full blur-[120px] hidden md:block" />

      <div className="container mx-auto px-0 md:px-4 relative">
        {/* Header */}
        <div
          className={cn(
            "text-center max-w-3xl mx-auto mb-8 md:mb-16 transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
        >
          <div className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 md:mb-6">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-primary text-xs md:text-sm font-semibold tracking-wide uppercase">
              Popular Packages
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-6 text-balance">
            Explore Our Best <span className="text-primary">Travel Deals</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg leading-relaxed">
            Handpicked destinations with exclusive packages designed for unforgettable experiences
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {packages.map((pkg, index) => (
            <Card
              key={index}
              className={cn(
                "group overflow-hidden border-0 shadow-lg hover:shadow-2xl",
                "bg-card transition-all duration-500",
                "hover:-translate-y-2",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <Image
                  src={pkg.image || "/placeholder.svg"}
                  alt={pkg.title}
                  width={800}
                  height={600}
                  fill={true}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="w-full aspect-4/3 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-foreground/70 via-foreground/20 to-transparent" />

                {pkg.featured && (
                  <Badge className="absolute top-3 md:top-4 left-3 md:left-4 bg-linear-to-r from-primary to-primary/90 text-primary-foreground font-semibold text-xs md:text-sm px-2 md:px-3 py-0.5 md:py-1">
                    Featured
                  </Badge>
                )}

                <div className="absolute top-3 md:top-4 right-3 md:right-4 flex items-center gap-0.5 md:gap-1 bg-card/95 backdrop-blur-sm px-2 md:px-3 py-1 md:py-1.5 rounded-full shadow-lg">
                  <Star className="h-3 w-3 md:h-4 md:w-4 text-gold fill-current" />
                  <span className="text-xs md:text-sm font-bold text-foreground">{pkg.rating}</span>
                  <span className="text-[10px] md:text-xs text-muted-foreground">({pkg.reviews})</span>
                </div>

                <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 right-3 md:right-4">
                  <div className="flex items-center gap-1.5 md:gap-2 text-card text-xs md:text-sm font-medium">
                    <MapPin className="h-3 w-3 md:h-4 md:w-4" />
                    <span>{pkg.location}</span>
                  </div>
                </div>
              </div>

              <CardContent className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 md:mb-3 group-hover:text-primary transition-colors duration-300">
                  {pkg.title}
                </h3>

                <div className="flex flex-wrap gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground mb-4 md:mb-5">
                  <div className="flex items-center gap-1 md:gap-1.5">
                    <Calendar className="h-3 w-3 md:h-4 md:w-4 text-primary/70" />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 md:gap-1.5">
                    <Users className="h-3 w-3 md:h-4 md:w-4 text-primary/70" />
                    <span>{pkg.groupSize}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 md:pt-5 border-t border-border">
                  <div>
                    <span className="text-muted-foreground text-xs md:text-sm line-through">${pkg.originalPrice}</span>
                    <div className="text-xl md:text-2xl font-bold text-primary">${pkg.price}</div>
                  </div>
                  <Button className="bg-linear-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground rounded-full group/btn shadow-lg shadow-primary/20 text-xs md:text-sm px-3 md:px-4 h-9 md:h-10">
                    Book Now
                    <ArrowRight className="ml-1.5 md:ml-2 h-3 w-3 md:h-4 md:w-4 group-hover/btn:translate-x-0.5 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div
          className={cn(
            "text-center mt-8 md:mt-14 transition-all duration-700 delay-600",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
        >
          <Button
            size="lg"
            variant="outline"
            className="rounded-full px-6 md:px-10 py-4 md:py-6 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent font-semibold text-sm md:text-base transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
          >
            View All Packages
            <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
