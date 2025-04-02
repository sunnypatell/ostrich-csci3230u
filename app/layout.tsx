import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'OSTRICH',
  description: 'Open Source Tracking and Recon Intelligence for Cyber Hunting',
  generator: 'www.sunnypatel.net',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
