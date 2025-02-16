# WAIVS - Web-based AI Voice Integration System for Therapy

## Overview
WAIVS is a comprehensive therapy session management application designed to help mental health professionals manage patient sessions, transcripts, and clinical notes. The application integrates voice recording capabilities with structured note-taking formats to streamline the documentation process for therapy sessions.

## Key Features

### Patient Management
- Detailed patient profiles with contact information and medical history
- Comprehensive session history tracking
- Secure storage of patient records and session data

### Session Recording & Documentation
- Audio recording capabilities for therapy sessions
- Real-time transcription of sessions
- Multiple note-taking formats support:
  - SOAP (Subjective, Objective, Assessment, Plan)
  - BIRP (Behavior, Intervention, Response, Plan)
  - DAP (Description, Assessment, Plan)
  - GIRP (Goal, Intervention, Response, Plan)
  - And more standard therapy note formats

### Session Review & Analysis
- Organized session history with detailed timestamps
- Structured note viewing interface
- Easy access to past session transcripts and summaries

## Technical Architecture

### Frontend Framework
- Next.js for server-side rendering and routing
- React for component-based UI development
- Tailwind CSS for styling
- Shadcn UI components for consistent design

### Data Structure

#### Patient Data Model
```typescript
Patient {
  id: string
  name: string
  dateOfBirth: string
  email: string
  phone: string
  startDate: string
  diagnosis?: string
  sessions: Session[]
}
```

#### Session Data Model
```typescript
Session {
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
```

## Application Structure

### Core Components
- `PatientProfile`: Displays comprehensive patient information and session history
- `SessionDetails`: Shows detailed session information including SOAP notes and transcripts
- `Recording`: Handles session recording and real-time transcription
- `Dashboard`: Main interface for patient management and session overview

### Key Features Implementation
- Real-time audio recording and processing
- Multiple note format templates
- Session history tracking and management
- Patient data management and profile updates

## Purpose and Context for AI
This application serves as a digital platform for mental health professionals to:
1. Manage patient information and session records
2. Record and transcribe therapy sessions
3. Create structured clinical notes in various standard formats
4. Review and analyze patient progress over time

The system is designed to streamline the documentation process while maintaining professional standards and ensuring data security in mental health practice.

## Development Status
The application is actively under development with a focus on:
- Implementing secure audio recording and storage
- Enhancing the note-taking interface
- Improving session management capabilities
- Expanding supported therapy note formats