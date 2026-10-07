import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@green-hill/design-system/styles.css'
import App from '@/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
