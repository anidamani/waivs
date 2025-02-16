"use client"

import { format } from "date-fns"
import { CalendarDays } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Session } from "../lib/types"

export function SessionCard({ session }: { session: Session }) {
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

