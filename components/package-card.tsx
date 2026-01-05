"use client"

import { Card } from "@/components/ui/card"
import { Check, Trash2, Edit } from "lucide-react"

interface PackageCardProps {
    id?: number
    image: string
    name: string
    description: string
    bulletPoints: string[]
    badge?: string
    onDelete?: (id: number) => void
    onEdit?: (id: number) => void
}

export function PackageCard({ id, image, name, description, bulletPoints, badge, onDelete, onEdit }: PackageCardProps) {
    return (
        <div className="relative group">
            <Card className="overflow-hidden bg-card border border-border hover:border-primary/50 transition-colors">
                {/* Image Container */}
                <div className="relative w-full h-48 overflow-hidden bg-muted">
                    <img src={image || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
                </div>

                {/* Content Container */}
                <div className="px-2">
                    <h3 className="text-lg font-bold mb-1 text-foreground">{name}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{description}</p>

                    {/* Bullet Points */}
                    <ul className="space-y-1">
                        {bulletPoints.map((point, index) => (
                            <li key={index} className="flex items-start gap-1">
                                <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                                <span className="text-sm text-muted-foreground">{point}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </Card>

            {/* Action Buttons */}
            {(onDelete || onEdit) && id !== undefined && (
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {onEdit && (
                        <button
                            onClick={() => onEdit(id)}
                            className="p-2 bg-primary/80 hover:bg-primary text-primary-foreground rounded-md transition-all"
                            aria-label="Edit package"
                            title="Edit package"
                        >
                            <Edit className="w-4 h-4" />
                        </button>
                    )}
                    {onDelete && (
                        <button
                            onClick={() => onDelete(id)}
                            className="p-2 bg-destructive/80 hover:bg-destructive text-destructive-foreground rounded-md transition-all"
                            aria-label="Delete package"
                            title="Delete package"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}

// Clock icon for badge
import { Clock } from "lucide-react"
