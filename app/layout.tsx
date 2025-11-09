import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "OTAaT",
  description: "One Task At a Time",
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout(props: RootLayoutProps) {
  const { children } = props
  return (
    <html lang="en">
      <head><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
      <body>{children}</body>
    </html>
  )
}
