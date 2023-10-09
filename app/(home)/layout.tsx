import '../globals.css'
import '@mantine/core/styles.css';
import type { Metadata } from 'next'
import { MantineProvider } from '@mantine/core'

export const metadata: Metadata = {
  title: 'Next JS : TEST',
  description: 'Sample cocktail web ap',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body><MantineProvider>{children}</MantineProvider></body>
    </html>
  )
}
