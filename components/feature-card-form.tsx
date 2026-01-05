"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, X } from "lucide-react"

interface FeatureCard {
    id?: number
    icon: string
    title: string
    description: string
    bulletPoints: string[]
    url?: string
}

interface FeatureCardFormProps {
    onSubmit: (card: FeatureCard) => void | Promise<void>
    isLoading?: boolean
    initialData?: FeatureCard
}

export function FeatureCardForm({ onSubmit, isLoading = false, initialData }: FeatureCardFormProps) {
    const [formData, setFormData] = useState<FeatureCard>({
        icon: "⭐",
        title: "",
        description: "",
        bulletPoints: ["", ""],
        url: "",
    })

    useEffect(() => {
        if (initialData) {
            setFormData(initialData)
        }
    }, [initialData])

    const handleBulletPointChange = (index: number, value: string) => {
        const newBullets = [...formData.bulletPoints]
        newBullets[index] = value
        setFormData({ ...formData, bulletPoints: newBullets })
    }

    const addBulletPoint = () => {
        setFormData({
            ...formData,
            bulletPoints: [...formData.bulletPoints, ""],
        })
    }

    const removeBulletPoint = (index: number) => {
        setFormData({
            ...formData,
            bulletPoints: formData.bulletPoints.filter((_, i) => i !== index),
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.title.trim() || !formData.description.trim()) {
            alert("Please fill in title and description")
            return
        }

        const filteredBullets = formData.bulletPoints.filter((point) => point.trim())

        await onSubmit({
            ...formData,
            bulletPoints: filteredBullets,
        })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">Icon (emoji)</label>
                <div className="flex gap-2">
                    <div className="text-4xl w-12 h-12 flex items-center justify-center bg-muted rounded-md">{formData.icon}</div>
                    <Input
                        type="text"
                        value={formData.icon}
                        onChange={(e) => setFormData({ ...formData, icon: e.target.value.slice(0, 2) })}
                        maxLength={2}
                        className="flex-1"
                        placeholder="Enter emoji"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">Title</label>
                <Input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Service title"
                    className="bg-input text-foreground"
                />
            </div>
            <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">URL</label>
                <Input
                    type="text"
                    value={formData.url}
                    onChange={(e) => {
                        const formattedValue = e.target.value
                            .toLowerCase()
                            .replace(/\s/g, '-');

                        setFormData({ ...formData, url: formattedValue });
                    }}
                    placeholder="Service URL"
                    className="bg-input text-foreground"
                />
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">Description</label>
                <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Service description"
                    className="bg-input text-foreground min-h-24"
                />
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">Key Points</label>
                <div className="space-y-2">
                    {formData.bulletPoints.map((point, index) => (
                        <div key={index} className="flex gap-2">
                            <Input
                                type="text"
                                value={point}
                                onChange={(e) => handleBulletPointChange(index, e.target.value)}
                                placeholder={`Point ${index + 1}`}
                                className="bg-input text-foreground"
                            />
                            {formData.bulletPoints.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeBulletPoint(index)}
                                    className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
                <button
                    type="button"
                    onClick={addBulletPoint}
                    className="inline-flex items-center gap-2 mt-2 text-sm text-primary hover:text-primary/80 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Point
                </button>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (initialData ? "Updating..." : "Creating...") : initialData ? "Update Service" : "Create Service"}
            </Button>
        </form>
    )
}
