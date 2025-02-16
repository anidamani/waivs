import type { Patient } from "./types"

export const samplePatients: Patient[] = [
  {
    id: "P001",
    name: "Sarah Johnson",
    dateOfBirth: "1992-04-15",
    email: "sarah.j@email.com",
    phone: "(555) 123-4567",
    startDate: "2023-01-15",
    diagnosis: "Generalized Anxiety Disorder",
    sessions: [
      {
        id: "S001",
        date: "2024-02-01T14:30:00",
        duration: "50 minutes",
        transcript: "Patient expressed concerns about work-related stress...",
        summary: {
          subjective: "Patient reports increased anxiety at work, particularly during team meetings",
          objective: "Shows physical signs of anxiety: rapid speech, fidgeting",
          assessment: "GAD symptoms have increased since last session",
          plan: "Continue CBT exercises, introduce mindfulness techniques",
        },
      },
      {
        id: "S002",
        date: "2024-01-15T15:30:00",
        duration: "45 minutes",
        transcript: "Discussion focused on implementing coping strategies...",
        summary: {
          subjective: "Patient tried meditation techniques, reports some improvement",
          objective: "More relaxed posture, maintained eye contact",
          assessment: "Showing progress with anxiety management",
          plan: "Continue meditation practice, review progress next session",
        },
      },
    ],
  },
  {
    id: "P002",
    name: "Michael Chen",
    dateOfBirth: "1988-09-23",
    email: "m.chen@email.com",
    phone: "(555) 987-6543",
    startDate: "2023-11-01",
    diagnosis: "Major Depressive Disorder",
    sessions: [
      {
        id: "S003",
        date: "2024-02-05T10:00:00",
        duration: "55 minutes",
        transcript: "Patient discussed improvements in daily routine...",
        summary: {
          subjective: "Reports better sleep patterns and increased activity",
          objective: "More energetic presentation, improved affect",
          assessment: "Showing positive response to treatment plan",
          plan: "Continue current medication, increase social activities",
        },
      },
    ],
  },
]

