"use client"

import { useState } from "react"
import { servicesData } from "@/lib/services-data"
import { ServiceCategories } from "./service-categories"
import { ServicePackagesGrid } from "./service-packages-grid"

export function ServicesWithFilter() {
  const [activeService, setActiveService] = useState(servicesData[0].slug)

  return (
    <>
      <ServiceCategories activeService={activeService} onServiceChange={setActiveService} />
      <ServicePackagesGrid activeService={activeService} />
    </>
  )
}
