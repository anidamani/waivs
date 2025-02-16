export interface Session {
  id: string
  date: string
  duration: string
  transcript: string
  summary: {
    subjective: string
    objective: string
    assessment: string
    plan: string
  }
  audioUrl?: string
}

export interface Patient {
  id: string
  name: string
  dateOfBirth: string
  email: string
  phone: string
  startDate: string
  diagnosis?: string
  sessions: Session[]
}

