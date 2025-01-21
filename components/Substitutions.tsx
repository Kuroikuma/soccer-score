"use client"

import { teamRole, useMatchStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react"

export function Substitutions() {
  const { homeTeam, awayTeam, time, substitutions, addSubstitution, removeSubstitution } = useMatchStore()
  const [selectedTeam, setSelectedTeam] = useState<teamRole>("home")
  const [playerOutId, setPlayerOutId] = useState("")
  const [playerInId, setPlayerInId] = useState("")

  const handleAddSubstitution = () => {
    if (playerOutId && playerInId) {
      addSubstitution({
        minute: time.minutes,
        teamId: selectedTeam,
        playerOutId,
        playerInId,
      })
      setPlayerOutId("")
      setPlayerInId("")
    }
  }

  const getPlayerName = (teamId: teamRole, playerId: string) => {
    const team = teamId === "home" ? homeTeam : awayTeam
    const player = team.players.find((p) => p.id === playerId)
    return player ? `${player.name} (${player.number})` : "Unknown Player"
  }

  return (
    <Card className="bg-[#1a1625]">
      <CardHeader>
        <CardTitle>Substitutions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Select value={selectedTeam} onValueChange={(value: teamRole) => setSelectedTeam(value)}>
            <SelectTrigger className="bg-[#2a2438]">
              <SelectValue placeholder="Select team" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="home">{homeTeam.name}</SelectItem>
              <SelectItem value="away">{awayTeam.name}</SelectItem>
            </SelectContent>
          </Select>

          <Select value={playerOutId} onValueChange={setPlayerOutId}>
            <SelectTrigger className="bg-[#2a2438]">
              <SelectValue placeholder="Player Out" />
            </SelectTrigger>
            <SelectContent>
              {(selectedTeam === "home" ? homeTeam : awayTeam).players.map((player) => (
                <SelectItem key={player.id} value={player.id}>
                  {player.name} ({player.number})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={playerInId} onValueChange={setPlayerInId}>
            <SelectTrigger className="bg-[#2a2438]">
              <SelectValue placeholder="Player In" />
            </SelectTrigger>
            <SelectContent>
              {(selectedTeam === "home" ? homeTeam : awayTeam).players.map((player) => (
                <SelectItem key={player.id} value={player.id}>
                  {player.name} ({player.number})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button onClick={handleAddSubstitution} className="w-full bg-[#ff5722] hover:bg-[#ff5722]/90">
            Make Substitution
          </Button>

          <ScrollArea className="h-[200px] rounded-md border">
            <div className="p-4 space-y-2">
              {substitutions
                .sort((a, b) => b.minute - a.minute)
                .map((sub) => (
                  <div key={sub.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>{sub.minute}'</span>
                      <span>🔄</span>
                      <span>
                        {getPlayerName(sub.teamId, sub.playerOutId)} ➡️ {getPlayerName(sub.teamId, sub.playerInId)}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSubstitution(sub.id)}
                      className="hover:bg-[#2a2438]"
                    >
                      ✕
                    </Button>
                  </div>
                ))}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  )
}

