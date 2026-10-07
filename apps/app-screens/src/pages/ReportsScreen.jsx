import { useNavigate } from 'react-router-dom'
import NavBar from '@green-hill/design-system/components/NavBar.jsx'
import BigButton from '@green-hill/design-system/components/BigButton.jsx'
import { EmptyState } from '@green-hill/design-system/components/EmptyState.jsx'

export default function ReportsScreen() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <NavBar />
      <EmptyState
        title="No reports yet"
        description="Connect a data source or import a CSV to see charts here."
        action={
          <BigButton variant="ghost" onClick={() => navigate('/dashboard')}>
            Back to dashboard
          </BigButton>
        }
      />
    </div>
  )
}
