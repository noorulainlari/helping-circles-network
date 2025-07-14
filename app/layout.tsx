import type React from "react"
import './globals.css'
import { AuthProvider } from "../components/providers/auth-provider"

export const metadata = {
  title: 'Helping Circles Network',
  description: 'Connect, Support, and Build Community Together',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
