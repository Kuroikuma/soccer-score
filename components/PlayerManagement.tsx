"use client"

import { useState } from "react"
import { teamRole, useMatchStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function PlayerManagement() {
  const { homeTeam, awayTeam, addPlayer } = useMatchStore()
  const { toast } = useToast()
  const [playerName, setPlayerName] = useState("")
  const [playerNumber, setPlayerNumber] = useState("")
  const [playerPosition, setPlayerPosition] = useState("")
  const [team, setTeam] = useState("home")

  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault()
    if (!playerName || !playerNumber || !playerPosition) {
      toast({
        title: "Error",
        description: "Please fill in all player details.",
        variant: "destructive",
      })
      return
    }
    const newPlayer = {
      id: Date.now().toString(),
      name: playerName,
      number: Number.parseInt(playerNumber),
      position: playerPosition,
    }
    addPlayer(team as teamRole, newPlayer)
    setPlayerName("")
    setPlayerNumber("")
    setPlayerPosition("")
    toast({
      title: "Player Added",
      description: `${playerName} has been added to the ${team} team.`,
    })
  }

  return (
    <form onSubmit={handleAddPlayer} className="space-y-4">
      <div>
        <Label htmlFor="playerName">Player Name</Label>
        <Input
          id="playerName"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Enter player name"
        />
      </div>
      <div>
        <Label htmlFor="playerNumber">Player Number</Label>
        <Input
          id="playerNumber"
          type="number"
          value={playerNumber}
          onChange={(e) => setPlayerNumber(e.target.value)}
          placeholder="Enter player number"
        />
      </div>
      <div>
        <Label htmlFor="playerPosition">Player Position</Label>
        <Input
          id="playerPosition"
          value={playerPosition}
          onChange={(e) => setPlayerPosition(e.target.value)}
          placeholder="Enter player position"
        />
      </div>
      <div>
        <Label htmlFor="team">Team</Label>
        <Select onValueChange={setTeam} defaultValue={team}>
          <SelectTrigger>
            <SelectValue placeholder="Select team" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="home">{homeTeam.name}</SelectItem>
            <SelectItem value="away">{awayTeam.name}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">Add Player</Button>
    </form>
  )
}

