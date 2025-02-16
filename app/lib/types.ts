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
  therapyType?: TherapyType
  noteFormat?: NoteFormat
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

export type TherapyType = "Individual" | "Couple"

export type NoteFormat = "SOAP" | "BIRP" | "DAP" | "GIRP" | "PIRP" | "RIFT" | "CARE" | "STOP"

export interface NoteFormatInfo {
  name: NoteFormat
  description: string
  sections: {
    letter: string
    title: string
    description: string
  }[]
}

export const NOTE_FORMATS: Record<NoteFormat, NoteFormatInfo> = {
  SOAP: {
    name: "SOAP",
    description: "Subjective, Objective, Assessment, Plan format",
    sections: [
      { letter: "S", title: "Subjective", description: "Client's self-reported feelings, symptoms, or concerns" },
      { letter: "O", title: "Objective", description: "Observable data such as appearance or behavior" },
      { letter: "A", title: "Assessment", description: "Analysis of the client's condition and progress" },
      { letter: "P", title: "Plan", description: "Next steps or interventions for treatment" },
    ],
  },
  BIRP: {
    name: "BIRP",
    description: "Behavior, Intervention, Response, Plan format",
    sections: [
      { letter: "B", title: "Behavior", description: "Observations of the client's behavior and self-reports" },
      { letter: "I", title: "Intervention", description: "Therapeutic techniques applied during the session" },
      { letter: "R", title: "Response", description: "How the client reacted to the interventions" },
      { letter: "P", title: "Plan", description: "Future steps, follow-ups, or homework assignments" },
    ],
  },
  // ... add other formats similarly
  DAP: {
    name: "DAP",
    description: "Description, Assessment, Plan format",
    sections: [
      { letter: "D", title: "Description", description: "Combination of subjective and objective observations" },
      { letter: "A", title: "Assessment", description: "Evaluation of the session and client progress" },
      { letter: "P", title: "Plan", description: "Proposed actions for continued therapy" },
    ],
  },
  GIRP: {
    name: "GIRP",
    description: "Goal, Intervention, Response, Plan format",
    sections: [
      { letter: "G", title: "Goal", description: "The client's therapy goals discussed during the session" },
      { letter: "I", title: "Intervention", description: "Techniques or strategies used by the therapist" },
      { letter: "R", title: "Response", description: "Client's reaction to interventions and progress toward goals" },
      { letter: "P", title: "Plan", description: "Next steps in therapy" },
    ],
  },
  PIRP: {
    name: "PIRP",
    description: "Problem, Intervention, Response, Plan format",
    sections: [
      { letter: "P", title: "Problem", description: "The primary issue addressed in the session" },
      { letter: "I", title: "Intervention", description: "Actions taken to address the problem" },
      { letter: "R", title: "Response", description: "Client's feedback and reactions to interventions" },
      { letter: "P", title: "Plan", description: "Future therapeutic actions" },
    ],
  },
  RIFT: {
    name: "RIFT",
    description: "Reason, Intervention, Feedback, Therapy goals format",
    sections: [
      { letter: "R", title: "Reason", description: "Reason for visit or session focus" },
      { letter: "I", title: "Intervention", description: "Intervention used during therapy" },
      {
        letter: "F",
        title: "Feedback",
        description: "Feedback from both client and therapist about progress or challenges",
      },
      { letter: "T", title: "Therapy", description: "Therapy goals moving forward" },
    ],
  },
  CARE: {
    name: "CARE",
    description: "Client profile, Assessment, Response, Evaluation format",
    sections: [
      { letter: "C", title: "Client profile", description: "Client profile or presenting issue" },
      { letter: "A", title: "Assessment", description: "Assessment of needs and progress" },
      { letter: "R", title: "Response", description: "Response during therapy sessions" },
      { letter: "E", title: "Evaluation", description: "Evaluation of outcomes and next steps" },
    ],
  },
  STOP: {
    name: "STOP",
    description: "Summary, Treatment, Observations, Plan format",
    sections: [
      { letter: "S", title: "Summary", description: "Summary of the session's key points" },
      { letter: "T", title: "Treatment", description: "Treatment provided during the session" },
      { letter: "O", title: "Observations", description: "Observations made by the therapist about the client" },
      { letter: "P", title: "Plan", description: "Plan for future sessions or assignments" },
    ],
  },
}

