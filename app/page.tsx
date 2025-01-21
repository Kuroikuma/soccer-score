"use client"

import { ControlPanel } from "@/components/ControlPanel"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MonitorPlay } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#13111a] text-white p-4">
      <div className="fixed top-4 right-4 z-50">
        <Link href="/overlay">
          <Button variant="outline">
            <MonitorPlay className="mr-2 h-4 w-4" />
            Open Overlay
          </Button>
        </Link>
      </div>
      <div className="space-y-4 max-w-7xl mx-auto pt-24">
        <ControlPanel />
      </div>
    </main>
  )
}

