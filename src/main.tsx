import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './components/providers/auth-provider'
import App from './App'
import SignInPage from './pages/auth/signin'
import SignUpPage from './pages/auth/signup'
import CirclesPage from './pages/circles'
import AdminPage from './pages/admin'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/auth/signin" element={<SignInPage />} />
          <Route path="/auth/signup" element={<SignUpPage />} />
          <Route path="/circles" element={<CirclesPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>,
)