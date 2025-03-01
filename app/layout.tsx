import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Manage Risk',
  description: 'Created by 9o',
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
