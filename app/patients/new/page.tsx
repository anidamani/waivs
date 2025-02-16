"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createSupabaseClient } from "@/lib/supabase"
import { useUser } from "@clerk/nextjs"
import { useToast } from "@/components/ui/use-toast"

export default function NewPatientPage() {
  const router = useRouter()
  const { user } = useUser()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    date_of_birth: "",
    email: "",
    phone: "",
    diagnosis: "",
    start_date: new Date().toISOString().split('T')[0]
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      toast({
        title: "Error",
        description: "You must be signed in to create a patient.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
        const { user } = useUser();
        const token = await (user as any).getToken({ template: "supabase" }); // THIS IS A WORKAROUND
      if (!token) {
        toast({
          title: "Error",
          description: "Failed to get user token.",
          variant: "destructive",
        })
        return;
      }
      const supabase = createSupabaseClient(token)

      const { error: createError } = await supabase
        .from('patients')
        .insert([
          {
            name: formData.name,
            date_of_birth: formData.date_of_birth || null,
            email: formData.email || null,
            phone: formData.phone || null,
            diagnosis: formData.diagnosis || null,
            start_date: formData.start_date
          }
        ])

      if (createError) {
        console.error('Error creating patient:', createError)
        toast({
          title: "Error",
          description: "Failed to create new patient. Please try again.",
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Success",
        description: "Patient created successfully!",
      })
      router.push('/dashboard')
    } catch (error) {
      console.error('Error in patient creation:', error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Add New Patient</CardTitle>
          <CardDescription>Enter the patient's information below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter patient's full name" 
                required 
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date_of_birth">Date of Birth <span className="text-sm text-muted-foreground">(optional)</span></Label>
              <Input 
                id="date_of_birth" 
                type="date" 
                value={formData.date_of_birth}
                onChange={(e) => setFormData(prev => ({ ...prev, date_of_birth: e.target.value }))}
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email <span className="text-sm text-muted-foreground">(optional)</span></Label>
              <Input 
                id="email" 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="patient@example.com" 
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone <span className="text-sm text-muted-foreground">(optional)</span></Label>
              <Input 
                id="phone" 
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="(555) 555-5555" 
                disabled={isLoading}
              />
            </div>
            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Patient"}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => router.back()}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}