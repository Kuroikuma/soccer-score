"use client"

import { teamRole, useMatchStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { ScoreboardOverlay } from "./ScoreboardOverlay"

export default function LiveMatch() {
  const { toast } = useToast()
  const { homeTeam, awayTeam, time, startMatch, pauseMatch, addEvent } = useMatchStore()

  const addGoal = (teamId: teamRole, playerId: string) => {
    addEvent({
      type: "goal",
      teamId,
      playerId,
      minute: time.minutes,
    })
  }


  const toggleTimer = () => {
    if (time.isRunning) {
      pauseMatch()
    } else {
      startMatch()
    }
  }

  const handleAddGoal = (team: teamRole) => {
    addGoal(team, "placeholder")
    toast({
      title: "Goal!",
      description: `${team === "home" ? homeTeam.name : awayTeam.name} scored!`,
    })
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Match Control</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Button onClick={toggleTimer}>{time.isRunning ? "Pause" : "Start"}</Button>
            <div className="text-2xl font-bold">
              {Math.floor(time.minutes / 60)}:{(time.minutes % 60).toString().padStart(2, "0")}
            </div>
          </div>
          <div className="flex justify-between">
            <Button onClick={() => handleAddGoal("home")}>Home Goal</Button>
            <Button onClick={() => handleAddGoal("away")}>Away Goal</Button>
          </div>
        </CardContent>
      </Card>
      <ScoreboardOverlay />
    </div>
  )
}

