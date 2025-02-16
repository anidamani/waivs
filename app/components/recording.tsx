"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Pause, Play, Square, X } from "lucide-react"
import { Waveform } from "./waveform"
import { SessionEndDialog } from "./session-end-dialog"
import type { NoteFormat, TherapyType } from "../lib/types"

export function Recording() {
  const router = useRouter()
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [showEndDialog, setShowEndDialog] = useState(false)

  const handleStartRecording = () => {
    setIsRecording(true)
    setIsPaused(false)
  }

  const handlePauseRecording = () => {
    setIsPaused(true)
    setIsRecording(false)
  }

  const handleResumeRecording = () => {
    setIsRecording(true)
    setIsPaused(false)
  }

  const handleStopRecording = () => {
    setShowEndDialog(true)
    setIsRecording(false)
    setIsPaused(false)
  }

  const handleSessionEnd = (data: { therapyType: TherapyType; noteFormat: NoteFormat }) => {
    console.log("Session ended with data:", data)
    router.push("/") // Navigate back to dashboard
  }

  return (
    <div className="container mx-auto py-6">
      <Card className="max-w-4xl mx-auto p-6">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Recording Session</h1>
            <p className="text-muted-foreground">
              {isRecording ? "Recording in progress..." : isPaused ? "Recording paused" : "Ready to start recording"}
            </p>
          </div>

          <div className="py-6">
            <Waveform isRecording={isRecording} />
          </div>

          <div className="flex flex-col items-center gap-6">
            {!isRecording && !isPaused ? (
              <Button size="lg" className="h-24 w-24 rounded-full" onClick={handleStartRecording}>
                <Play className="h-12 w-12" />
              </Button>
            ) : (
              <div className="flex items-center gap-4">
                {isPaused ? (
                  <Button size="lg" className="h-16 w-16 rounded-full" onClick={handleResumeRecording}>
                    <Play className="h-8 w-8" />
                  </Button>
                ) : (
                  <Button size="lg" className="h-16 w-16 rounded-full" onClick={handlePauseRecording}>
                    <Pause className="h-8 w-8" />
                  </Button>
                )}
                <Button
                  size="lg"
                  variant="destructive"
                  className="h-16 w-16 rounded-full"
                  onClick={handleStopRecording}
                >
                  <Square className="h-8 w-8" />
                </Button>
              </div>
            )}

            <Button variant="outline" className="gap-2" onClick={() => router.push("/")}>
              <X className="h-4 w-4" />
              Cancel Session
            </Button>
          </div>
        </div>
      </Card>

      <SessionEndDialog open={showEndDialog} onOpenChange={setShowEndDialog} onConfirm={handleSessionEnd} />
    </div>
  )
}

