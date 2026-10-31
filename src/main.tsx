import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles.css'

const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
if (!motionPreference.matches) {
  document.documentElement.dataset.motionReady = 'true'
  if ('IntersectionObserver' in window) document.documentElement.dataset.revealReady = 'true'
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
