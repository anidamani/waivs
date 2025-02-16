"use client"

import { format } from "date-fns"
import { CalendarDays } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Session } from "../lib/types"

interface SessionListProps {
  sessions: Session[]
  selectedSessionId: string | null
  onSessionSelect: (session: Session) => void
}

export function SessionList({ sessions, selectedSessionId, onSessionSelect }: SessionListProps) {
  return (
    <ScrollArea className="h-[calc(100vh-20rem)]">
      <div className="space-y-2 p-2">
        {sessions.map((session) => (
          <Button
            key={session.id}
            variant={selectedSessionId === session.id ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => onSessionSelect(session)}
          >
            <div className="flex flex-col items-start">
              <div className="font-medium">{format(new Date(session.date), "PP")}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <CalendarDays className="w-3 h-3" />
                {format(new Date(session.date), "p")} • {session.duration}
              </div>
            </div>
          </Button>
        ))}
      </div>
    </ScrollArea>
  )
}

