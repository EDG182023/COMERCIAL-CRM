import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "CRM Pro - Sales Management",
  description: "Professional CRM for managing prospects, meetings, and quotations",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 overflow-auto">{children}</main>
          </SidebarProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
