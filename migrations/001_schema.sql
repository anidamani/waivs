-- 1. Create tables with integer IDs and proper relationships, linking to Supabase Auth
CREATE TABLE IF NOT EXISTS therapists (
    id SERIAL PRIMARY KEY,
    clerk_id TEXT NOT NULL UNIQUE, -- Clerk User ID for external authentication
    supabase_auth_uid UUID REFERENCES auth.users(id) UNIQUE, -- Link to Supabase Auth user for RLS
    email TEXT NOT NULL UNIQUE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS patients (
    id SERIAL PRIMARY KEY,
    therapist_id INTEGER NOT NULL REFERENCES therapists(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    date_of_birth DATE,
    diagnosis TEXT,
    start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sessions (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    therapist_id INTEGER NOT NULL REFERENCES therapists(id) ON DELETE CASCADE,
    date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    duration INTERVAL,
    therapy_type TEXT NOT NULL CHECK (therapy_type IN ('Individual', 'Couple')),
    status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create notes table
CREATE TABLE IF NOT EXISTS notes (
    id SERIAL PRIMARY KEY,
    session_id INTEGER NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
    format TEXT NOT NULL CHECK (format IN ('SOAP', 'DAP', 'BIRP')),
    content JSONB NOT NULL,
    transcript TEXT,
    summary TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Enable Row Level Security on each table
ALTER TABLE therapists ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- 3. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_patients_therapist ON patients(therapist_id);
CREATE INDEX IF NOT EXISTS idx_sessions_patient ON sessions(patient_id);
CREATE INDEX IF NOT EXISTS idx_sessions_therapist ON sessions(therapist_id);
CREATE INDEX IF NOT EXISTS idx_notes_session ON notes(session_id);

-- 4. Create Row Level Security policies using Supabase Auth user ID

-- Policy 1: Therapist Isolation - Therapists can only access their own therapist record.
-- This policy checks if the `supabase_auth_uid` in the `therapists` table matches the current authenticated Supabase Auth user's ID (`auth.uid()`).
CREATE POLICY therapist_isolation ON therapists
    FOR ALL
    USING (supabase_auth_uid = auth.uid());

-- Policy 2: Patient Isolation - Therapists can only access patients associated with them.
-- This policy ensures that the `therapist_id` of a patient record matches the `id` of a therapist whose `supabase_auth_uid` is the current authenticated user.
CREATE POLICY patient_isolation ON patients
    FOR ALL
    USING (therapist_id IN (SELECT id FROM therapists WHERE supabase_auth_uid = auth.uid()));

-- Policy 3: Session Isolation - Therapists can only access sessions related to their patients.
-- This policy ensures that the `therapist_id` in the `sessions` table matches a therapist linked to the current authenticated user.
CREATE POLICY session_isolation ON sessions
    FOR ALL
    USING (therapist_id IN (SELECT id FROM therapists WHERE supabase_auth_uid = auth.uid()));

-- Policy 4: Note Isolation - Therapists can only access notes related to sessions they have access to.
-- This policy ensures that the `session_id` in the `notes` table corresponds to a session that the current authenticated therapist can access.
CREATE POLICY note_isolation ON notes
    FOR ALL
    USING (session_id IN (
        SELECT id FROM sessions
        WHERE therapist_id IN (
            SELECT id FROM therapists WHERE supabase_auth_uid = auth.uid()
        )
    ));

-- 5. Create trigger function to update updated_at timestamp automatically
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 6. Create triggers for auto-updating the updated_at field on each table
CREATE TRIGGER update_therapists_updated_at
    BEFORE UPDATE ON therapists
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_patients_updated_at
    BEFORE UPDATE ON patients
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_sessions_updated_at
    BEFORE UPDATE ON sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_notes_updated_at
    BEFORE UPDATE ON notes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

