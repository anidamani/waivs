export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      patients: {
        Row: {
          id: string
          name: string
          dateOfBirth: string
          email: string
          phone: string
          startDate: string
          diagnosis: string | null
          created_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          name: string
          dateOfBirth: string
          email: string
          phone: string
          startDate: string
          diagnosis?: string | null
          created_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: string
          name?: string
          dateOfBirth?: string
          email?: string
          phone?: string
          startDate?: string
          diagnosis?: string | null
          created_at?: string
          updated_at?: string
          user_id?: string
        }
      }
      sessions: {
        Row: {
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
          audioUrl: string | null
          therapyType: string | null
          noteFormat: string | null
          patient_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          date: string
          duration: string
          transcript: string
          summary: {
            subjective: string
            objective: string
            assessment: string
            plan: string
          }
          audioUrl?: string | null
          therapyType?: string | null
          noteFormat?: string | null
          patient_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          date?: string
          duration?: string
          transcript?: string
          summary?: {
            subjective: string
            objective: string
            assessment: string
            plan: string
          }
          audioUrl?: string | null
          therapyType?: string | null
          noteFormat?: string | null
          patient_id?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}