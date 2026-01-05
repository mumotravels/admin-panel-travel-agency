"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FeatureCardForm } from "./feature-card-form"
import { Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FeatureCard {
    id?: number
    icon: string
    title: string
    description: string
    bulletPoints: string[]
    url?: string
}

interface ServicesDialogProps {
    onServiceAdded: () => void
    editingId?: number | null
    editingCard?: FeatureCard
    onEditComplete?: () => void
}

export function ServicesDialog({ onServiceAdded, editingId, editingCard, onEditComplete }: ServicesDialogProps) {
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()

    const isEditMode = editingId && editingCard

    const handleSubmit = async (card: FeatureCard) => {
        setIsLoading(true)
        try {
            if (isEditMode) {
                const response = await fetch(`/api/admin/services/${editingId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        icon: card.icon,
                        title: card.title,
                        description: card.description,
                        bulletPoints: card.bulletPoints,
                        url: card.url || "",
                    }),
                })

                if (!response.ok) {
                    throw new Error("Failed to update service")
                }

                toast({
                    title: "Success",
                    description: "Service updated successfully",
                })
            } else {
                const response = await fetch("/api/admin/services", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        icon: card.icon,
                        title: card.title,
                        description: card.description,
                        bulletPoints: card.bulletPoints,
                        url: card.url || "",
                    }),
                })

                if (!response.ok) {
                    throw new Error("Failed to save service")
                }

                toast({
                    title: "Success",
                    description: "Service created successfully",
                })
            }

            setOpen(false)
            if (isEditMode && onEditComplete) {
                onEditComplete()
            } else {
                onServiceAdded()
            }
        } catch (error) {
            console.error("Error saving service:", error)
            toast({
                title: "Error",
                description: isEditMode ? "Failed to update service" : "Failed to save service",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    if (isEditMode && !open) {
        setOpen(true)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="lg" className="gap-2">
                    <Plus className="w-5 h-5" />
                    Add New Service
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{isEditMode ? "Edit Service" : "Create New Service"}</DialogTitle>
                </DialogHeader>
                <FeatureCardForm onSubmit={handleSubmit} isLoading={isLoading} initialData={editingCard} />
            </DialogContent>
        </Dialog>
    )
}
