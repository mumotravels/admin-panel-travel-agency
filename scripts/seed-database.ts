import "dotenv/config"
import { db } from "@/lib/db"
import { adminUsers } from "@/lib/db/schema"
import { hash } from "bcryptjs"

async function seed() {
  try {
    console.log("Seeding database...")

    // Create admin user
    const adminPassword = await hash("mumotravels@2026", 10)
    await db.insert(adminUsers).values({
      email: "admin@mumotravels.com",
      password: adminPassword,
      name: "Admin",
      role: "admin",
    })
    console.log("Admin user created");

    console.log("Database seeding completed!")
  } catch (error) {
    console.error("Seeding failed:", error)
    throw error
  }
}

seed()
