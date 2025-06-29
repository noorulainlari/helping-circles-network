import type React from "react"
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Helping Circles Network</title>
        <meta name="description" content="Connect, support, and grow together" />
      </head>
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif" }}>{children}</body>
    </html>
  )
}


import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
