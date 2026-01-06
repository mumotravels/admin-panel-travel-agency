import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MetadataForm } from "./metadata-form"

export function MetadataDashboard() {
    return (
        <main className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="space-y-4 mb-8">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold tracking-tight">Metadata Dashboard</h1>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Edit Metadata</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <MetadataForm />
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}
