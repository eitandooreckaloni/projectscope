import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ProjectScope - Automatic Time & Cost Tracker',
  description: 'Zero-configuration time tracking for multi-project entrepreneurs. Connect Git, Calendar, Email, WhatsApp, and Slack to automatically track where your time and money goes.',
  keywords: 'time tracking, project management, automatic tracking, cost allocation, productivity, entrepreneurs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}