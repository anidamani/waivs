"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Clock, FileText, Plus, Search, Users } from "lucide-react"
import type { Patient } from "../lib/types"
import { supabase } from "@/lib/supabase"
import { useUser } from "@clerk/nextjs"
import { DashboardSkeleton } from "./dashboard-skeleton"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/lib/language-provider"

export function Dashboard() {
  const { toast } = useToast()
  const router = useRouter()
  const { user } = useUser()
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [patients, setPatients] = useState<Patient[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchPatients() {
      if (!user) return

      try {
        // First get the therapist id
        const { data: therapist, error: therapistError } = await supabase
          .from('therapists')
          .select('id')
          .eq('clerk_id', user.id)
          .single()

        if (therapistError) {
          console.error('Error fetching therapist:', therapistError)
          toast({
            title: "Error",
            description: "Failed to fetch therapist data. Please try again.",
            variant: "destructive",
          })
          throw therapistError
        }

        // Then get all patients for this therapist
        const { data: patientsData, error: patientsError } = await supabase
          .from('patients')
          .select(`
            *,
            sessions:sessions(
              id,
              date,
              duration,
              therapy_type,
              status
            )
          `)
          .eq('therapist_id', therapist.id)
          .order('created_at', { ascending: false })

        if (patientsError) {
          console.error('Error fetching patients:', patientsError)
          toast({
            title: "Error",
            description: "Failed to fetch patient data. Please try again.",
            variant: "destructive",
          })
          throw patientsError
        }

        setPatients(patientsData || [])
      } catch (error) {
        console.error('Error in dashboard:', error)
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchPatients()
  }, [user, toast])

  const totalPatients = patients.length
  const totalSessions = patients.reduce((acc, patient) => acc + (patient.sessions?.length || 0), 0)
  const upcomingSessions = patients.reduce((acc, patient) => {
    return acc + (patient.sessions || [])
      .filter((session) => new Date(session.date) > new Date()).length
  }, 0)

  const filteredPatients = patients.filter((patient) => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (isLoading) {
    return <DashboardSkeleton />
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t('dashboard.title')}</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard.totalPatients')}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPatients}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard.totalSessions')}</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSessions}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard.upcomingSessions')}</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingSessions}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('dashboard.searchPatients')}
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('dashboard.patientsOverview')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('patient.fullName')}</TableHead>
                <TableHead>{t('patient.lastSession')}</TableHead>
                <TableHead>{t('patient.nextSession')}</TableHead>
                <TableHead>{t('patient.totalSessions')}</TableHead>
                <TableHead>{t('patient.status')}</TableHead>
                <TableHead className="text-right">{t('patient.actions')}</TableHead>
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
                        t('patient.noSessions')
                      )}
                    </TableCell>
                    <TableCell>
                      {nextSession ? (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {format(new Date(nextSession.date), "PP")}
                        </div>
                      ) : (
                        t('patient.noneScheduled')
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
                          ? t('dashboard.status.active')
                          : lastSession && new Date(lastSession.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                            ? t('dashboard.status.recent')
                            : t('dashboard.status.inactive')}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" className="gap-2" asChild>
                        <Link href={`/patients/${patient.id}`}>{t('dashboard.viewProfile')}</Link>
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2" onClick={() => router.push("/recording")}>
                        {t('dashboard.startSession')}
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

