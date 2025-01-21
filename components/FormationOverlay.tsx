"use client"

import { teamRole, useMatchStore } from "@/lib/store"
import { useState } from "react"

interface PlayerPosition {
  x: number
  y: number
}

const formationPositions: Record<string, PlayerPosition[]> = {
  "4-4-2": [
    { x: 50, y: 90 }, // GK
    { x: 20, y: 70 }, // RB
    { x: 40, y: 70 }, // CB
    { x: 60, y: 70 }, // CB
    { x: 80, y: 70 }, // LB
    { x: 20, y: 50 }, // RM
    { x: 40, y: 50 }, // CM
    { x: 60, y: 50 }, // CM
    { x: 80, y: 50 }, // LM
    { x: 35, y: 30 }, // ST
    { x: 65, y: 30 }, // ST
  ],
  "4-3-3": [
    { x: 50, y: 90 }, // GK
    { x: 20, y: 70 }, // RB
    { x: 40, y: 70 }, // CB
    { x: 60, y: 70 }, // CB
    { x: 80, y: 70 }, // LB
    { x: 30, y: 50 }, // CM
    { x: 50, y: 50 }, // CM
    { x: 70, y: 50 }, // CM
    { x: 20, y: 30 }, // RW
    { x: 50, y: 30 }, // ST
    { x: 80, y: 30 }, // LW
  ],
  "3-5-2": [
    { x: 50, y: 90 }, // GK
    { x: 30, y: 70 }, // CB
    { x: 50, y: 70 }, // CB
    { x: 70, y: 70 }, // CB
    { x: 20, y: 50 }, // RM
    { x: 35, y: 50 }, // CM
    { x: 50, y: 50 }, // CM
    { x: 65, y: 50 }, // CM
    { x: 80, y: 50 }, // LM
    { x: 35, y: 30 }, // ST
    { x: 65, y: 30 }, // ST
  ],
}

export function FormationOverlay() {
  const { homeTeam, awayTeam } = useMatchStore()
  const [selectedTeam, setSelectedTeam] = useState<teamRole>("home")
  const team = selectedTeam === "home" ? homeTeam : awayTeam
  const positions = formationPositions[team.formation.name] || formationPositions["4-4-2"]

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/90 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-bold">{team.name} Formation</h3>
        <select
          className="bg-gray-800 text-white rounded px-2 py-1"
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value as teamRole)}
        >
          <option value="home">{homeTeam.name}</option>
          <option value="away">{awayTeam.name}</option>
        </select>
      </div>

      <div className="relative w-[300px] h-[400px]">
        {/* Soccer field */}
        <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute inset-0">
          {/* Field background */}
          <rect width="100" height="100" fill="#2a5" />

          {/* Field lines */}
          <rect x="0" y="0" width="100" height="100" fill="none" stroke="white" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="10" fill="none" stroke="white" strokeWidth="0.5" />
          <line x1="50" y1="0" x2="50" y2="100" stroke="white" strokeWidth="0.5" />

          {/* Penalty areas */}
          <rect x="30" y="0" width="40" height="20" fill="none" stroke="white" strokeWidth="0.5" />
          <rect x="30" y="80" width="40" height="20" fill="none" stroke="white" strokeWidth="0.5" />

          {/* Goal areas */}
          <rect x="40" y="0" width="20" height="8" fill="none" stroke="white" strokeWidth="0.5" />
          <rect x="40" y="92" width="20" height="8" fill="none" stroke="white" strokeWidth="0.5" />
        </svg>

        {/* Players */}
        {team.players.slice(0, 11).map((player, index) => {
          const position = positions[index]
          return (
            <div
              key={player.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
              }}
            >
              <div className="flex flex-col items-center">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{
                    backgroundColor: team.color,
                    color: team.textColor,
                  }}
                >
                  {player.number}
                </div>
                <div className="text-white text-xs mt-1 whitespace-nowrap">{player.name}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

