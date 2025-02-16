"use client"

import { useState } from "react"
import { format } from "date-fns"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Clock, FileText, Plus, Search, Users } from "lucide-react"
import type { Patient } from "./types/patient"
import { samplePatients } from "./data/sample-patients"

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [patients, setPatients] = useState<Patient[]>(samplePatients)

  // Calculate dashboard statistics
  const totalPatients = patients.length
  const totalSessions = patients.reduce((acc, patient) => acc + patient.sessions.length, 0)
  const upcomingSessions = patients.reduce((acc, patient) => {
    return acc + patient.sessions.filter((session) => new Date(session.date) > new Date()).length
  }, 0)

  // Filter patients based on search query
  const filteredPatients = patients.filter((patient) => patient.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Therapist Dashboard</h1>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Patient
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPatients}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSessions}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingSessions}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Section */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patients Table */}
      <Card>
        <CardHeader>
          <CardTitle>Patients Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Last Session</TableHead>
                <TableHead>Next Session</TableHead>
                <TableHead>Total Sessions</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => {
                const sessions = [...patient.sessions].sort(
                  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
                )
                const lastSession = sessions[0]
                const nextSession = sessions.find((session) => new Date(session.date) > new Date())
                const totalPatientSessions = sessions.length

                return (
                  <TableRow key={patient.id}>
                    <TableCell>
                      <div>
                        <Link href={`/patients/${patient.id}`} className="font-medium hover:underline">
                          {patient.name}
                        </Link>
                        <div className="text-sm text-muted-foreground">{patient.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {lastSession ? (
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          {format(new Date(lastSession.date), "PP")}
                        </div>
                      ) : (
                        "No sessions"
                      )}
                    </TableCell>
                    <TableCell>
                      {nextSession ? (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {format(new Date(nextSession.date), "PP")}
                        </div>
                      ) : (
                        "None scheduled"
                      )}
                    </TableCell>
                    <TableCell>{totalPatientSessions}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-2 w-2 rounded-full ${
                            nextSession
                              ? "bg-green-500"
                              : lastSession &&
                                  new Date(lastSession.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                        />
                        {nextSession
                          ? "Active"
                          : lastSession && new Date(lastSession.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                            ? "Recent"
                            : "Inactive"}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" className="gap-2" asChild>
                        <Link href={`/patients/${patient.id}`}>View Profile</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

