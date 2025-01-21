"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { DraggableElement } from "@/components/DraggableElement"
import { ScoreboardOverlay } from "@/components/ScoreboardOverlay"
import { FormationOverlay } from "@/components/FormationOverlay"

export default function OverlayPage() {
  const [elements, setElements] = useState([
    { id: "scoreboard", type: "scoreboard", x: 0, y: 0, visible: true },
    { id: "formation", type: "formation", x: 0, y: 200, visible: true },
  ])

  const updateElementPosition = (id: string, x: number, y: number) => {
    setElements(elements.map((el) => (el.id === id ? { ...el, x, y } : el)))
  }

  const toggleElementVisibility = (id: string) => {
    setElements(elements.map((el) => (el.id === id ? { ...el, visible: !el.visible } : el)))
  }

  return (
    <main className="min-h-screen bg-[#13111a] text-white">
      <div className="fixed top-4 left-4 z-50">
        <Link href="/">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="fixed top-4 right-4 z-50 flex gap-2">
        {elements.map((el) => (
          <Button
            key={el.id}
            variant={el.visible ? "default" : "outline"}
            onClick={() => toggleElementVisibility(el.id)}
          >
            {el.id.charAt(0).toUpperCase() + el.id.slice(1)}
          </Button>
        ))}
      </div>

      {elements.map((el) => (
        <DraggableElement
          key={el.id}
          id={el.id}
          x={el.x}
          y={el.y}
          onPositionChange={(x, y) => updateElementPosition(el.id, x, y)}
          visible={el.visible}
        >
          {el.type === "scoreboard" ? <ScoreboardOverlay /> : <FormationOverlay />}
        </DraggableElement>
      ))}
    </main>
  )
}

