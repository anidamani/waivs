"use client"

import { useState } from "react"
import { format } from "date-fns"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { FileAudio, Plus, User } from "lucide-react"
import type { Patient, Session } from "../lib/types"
import { samplePatients } from "../lib/data"
import { SessionList } from "./session-list"
import { SessionDetails } from "./session-details"

export function PatientProfile({ patientId }: { patientId: string }) {
  const { toast } = useToast()
  const [patients] = useState<Patient[]>(samplePatients)
  const selectedPatient = patients.find((p) => p.id === patientId)
  const [selectedSession, setSelectedSession] = useState<Session | null>(selectedPatient?.sessions[0] || null)
  const router = useRouter()

  const startNewSession = () => {
    router.push("/recording")
  }

  if (!selectedPatient) {
    return (
      <div className="container mx-auto py-6">
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-[400px] text-center">
            <User className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Patient Not Found</h3>
            <p className="text-sm text-muted-foreground">The requested patient could not be found.</p>
            <Button className="mt-4" asChild>
              <Link href="/">Return to Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Patient Profile</h1>
        <div className="flex gap-2">
          <Button onClick={startNewSession} className="gap-2">
            <FileAudio className="w-4 h-4" />
            Start New Session
          </Button>
          <Button variant="outline" className="gap-2" asChild>
            <Link href="/patients/new">
              <Plus className="w-4 h-4" />
              New Patient
            </Link>
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{selectedPatient.name}</CardTitle>
              <CardDescription>
                Patient ID: {selectedPatient.id} • DOB: {format(new Date(selectedPatient.dateOfBirth), "PP")}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Contact Information</p>
              <p className="mt-1">{selectedPatient.email}</p>
              <p>{selectedPatient.phone}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Treatment Information</p>
              <p className="mt-1">Start Date: {format(new Date(selectedPatient.startDate), "PP")}</p>
              <p>Diagnosis: {selectedPatient.diagnosis}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-12 gap-6">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Session History</CardTitle>
            <CardDescription>Select a session to view details</CardDescription>
          </CardHeader>
          <CardContent>
            <SessionList
              sessions={selectedPatient.sessions}
              selectedSessionId={selectedSession?.id || null}
              onSessionSelect={setSelectedSession}
            />
          </CardContent>
        </Card>

        <Card className="col-span-8">
          <CardContent className="p-6">
            <SessionDetails session={selectedSession} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}