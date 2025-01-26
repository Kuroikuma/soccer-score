"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { ScoreboardOverlay } from "./overlays/ScoreboardOverlay"
import { useTeamStore } from "@/store/useTeam"
import { useTimeStore } from "@/store/useTime"
import { useEventStore } from "@/store/useEvent"
import { TeamRole } from "@/store/interfaces"

export default function LiveMatch() {
  const { toast } = useToast()

  const { time, startMatch, pauseMatch } = useTimeStore()
  const { homeTeam, awayTeam } = useTeamStore()
  const { addEvent } = useEventStore()

  const addGoal = (teamId: TeamRole, playerId: string) => {
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

  const handleAddGoal = (team: TeamRole) => {
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

