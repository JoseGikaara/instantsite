import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'InstantSite - Website Generator for Sales Agents',
  description: 'Generate instant website previews and run Google Presence audits',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

