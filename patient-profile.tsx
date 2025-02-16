"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, FileAudio, Plus, User } from "lucide-react"
import type { Patient, Session } from "./types/patient"
import { samplePatients } from "./data/sample-patients"
import Link from "next/link"

interface PatientProfileProps {
  patientId: string
}

export default function PatientProfile({ patientId }: PatientProfileProps) {
  const [patients] = useState<Patient[]>(samplePatients)
  const selectedPatient = patients.find((p) => p.id === patientId)

  const startNewSession = () => {
    // Implement session recording logic
    console.log("Starting new session...")
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
              <Link href="/dashboard">Return to Dashboard</Link>
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
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New Patient
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
              <DialogDescription>Enter the patient&apos;s information below.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter patient's full name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input id="dob" type="date" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="patient@example.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="(555) 555-5555" />
              </div>
            </div>
            <Button className="w-full">Create Patient</Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{selectedPatient.name}</CardTitle>
                <CardDescription>
                  Patient ID: {selectedPatient.id} • DOB: {format(new Date(selectedPatient.dateOfBirth), "PP")}
                </CardDescription>
              </div>
              <Button onClick={startNewSession} className="gap-2">
                <FileAudio className="w-4 h-4" />
                Start New Session
              </Button>
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

        <Card>
          <CardHeader>
            <CardTitle>Session History</CardTitle>
            <CardDescription>Past therapy sessions and notes</CardDescription>
          </CardHeader>
          <CardContent>
            {selectedPatient.sessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function SessionCard({ session }: { session: Session }) {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base">Session on {format(new Date(session.date), "PPp")}</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              Duration: {session.duration}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="summary" className="w-full">
          <TabsList>
            <TabsTrigger value="summary">SOAP Notes</TabsTrigger>
            <TabsTrigger value="transcript">Transcript</TabsTrigger>
          </TabsList>
          <TabsContent value="summary">
            <div className="grid gap-4">
              <div>
                <h4 className="font-medium mb-2">Subjective</h4>
                <p className="text-sm text-muted-foreground">{session.summary.subjective}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Objective</h4>
                <p className="text-sm text-muted-foreground">{session.summary.objective}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Assessment</h4>
                <p className="text-sm text-muted-foreground">{session.summary.assessment}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Plan</h4>
                <p className="text-sm text-muted-foreground">{session.summary.plan}</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="transcript">
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{session.transcript}</p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

