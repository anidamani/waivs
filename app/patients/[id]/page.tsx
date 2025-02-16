import { PatientProfile } from "../../components/patient-profile"

export default function PatientPage({ params }: { params: { id: string } }) {
  return <PatientProfile patientId={params.id} />
}

