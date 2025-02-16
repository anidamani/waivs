"use client"

import { format } from "date-fns"
import { CalendarDays } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Session } from "../lib/types"

interface SessionDetailsProps {
  session: Session | null
}

export function SessionDetails({ session }: SessionDetailsProps) {
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] text-center">
        <p className="text-muted-foreground">Select a session to view details</p>
      </div>
    )
  }

  return (
    <div className="h-full">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Session Details</h2>
        <div className="flex items-center gap-2 text-muted-foreground">
          <CalendarDays className="w-4 h-4" />
          <span>{format(new Date(session.date), "PPp")}</span>
          <span>•</span>
          <span>{session.duration}</span>
        </div>
      </div>

      <Tabs defaultValue="soap" className="h-[calc(100%-5rem)]">
        <TabsList>
          <TabsTrigger value="soap">SOAP Notes</TabsTrigger>
          <TabsTrigger value="transcript">Transcript</TabsTrigger>
        </TabsList>
        <TabsContent value="soap" className="h-full">
          <Card className="h-full">
            <CardContent className="p-6 space-y-6">
              <div>
                <h4 className="font-medium mb-2">Subjective</h4>
                <p className="text-muted-foreground">{session.summary.subjective}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Objective</h4>
                <p className="text-muted-foreground">{session.summary.objective}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Assessment</h4>
                <p className="text-muted-foreground">{session.summary.assessment}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Plan</h4>
                <p className="text-muted-foreground">{session.summary.plan}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="transcript" className="h-full">
          <Card className="h-full">
            <CardContent className="p-6">
              <p className="text-muted-foreground whitespace-pre-wrap">{session.transcript}</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

