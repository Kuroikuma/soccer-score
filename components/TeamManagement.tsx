'use client'

import { useState } from 'react'
import { teamRole, useMatchStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function TabTeamSetup() {
  const {
    homeTeam,
    awayTeam,
    addPlayer,
    updateTeam,
    updateStaff,
    updateFormation,
  } = useMatchStore()
  const [selectedTeam, setSelectedTeam] = useState<teamRole>('home')
  const [playerName, setPlayerName] = useState('')
  const [playerNumber, setPlayerNumber] = useState('')
  const [playerPosition, setPlayerPosition] = useState('')
  const [playerImage, setPlayerImage] = useState('')

  const team = selectedTeam === 'home' ? homeTeam : awayTeam

  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault()
    if (!playerName || !playerNumber || !playerPosition) return

    addPlayer(selectedTeam, {
      name: playerName,
      number: Number.parseInt(playerNumber),
      position: playerPosition,
      image: playerImage,
    })

    setPlayerName('')
    setPlayerNumber('')
    setPlayerPosition('')
    setPlayerImage('')
  }

  const formations = ['4-4-2', '4-3-3', '3-5-2', '5-3-2', '4-2-3-1']

  const positions = [
    'Goalkeeper',
    'Right Back',
    'Center Back',
    'Left Back',
    'Defensive Midfielder',
    'Central Midfielder',
    'Attacking Midfielder',
    'Right Winger',
    'Left Winger',
    'Striker',
  ]

  return (
    <TabsContent value="team-setup" className="p-4 space-y-4">
      <div className="space-y-4">
        <Tabs defaultValue="players">
          <TabsList className="w-full justify-start bg-transparent border-b rounded-none h-12">
            <TabsTrigger value="players" className="tab_panel">
              Players
            </TabsTrigger>
            <TabsTrigger value="staff" className="tab_panel">
              Staff
            </TabsTrigger>
            <TabsTrigger value="formation" className="tab_panel">
              Formation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="players" className="space-y-4">
            <div>
              <Label>Team</Label>
              <Select
                value={selectedTeam}
                onValueChange={(value: teamRole) => setSelectedTeam(value)}
              >
                <SelectTrigger className="bg-[#2a2438]">
                  <SelectValue placeholder="Select team" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="home">{homeTeam.name}</SelectItem>
                  <SelectItem value="away">{awayTeam.name}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <form onSubmit={handleAddPlayer} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    className="bg-[#2a2438]"
                  />
                </div>
                <div>
                  <Label>Number</Label>
                  <Input
                    type="number"
                    value={playerNumber}
                    onChange={(e) => setPlayerNumber(e.target.value)}
                    className="bg-[#2a2438]"
                  />
                </div>
                <div>
                  <Label>Position</Label>
                  <Select
                    value={playerPosition}
                    onValueChange={setPlayerPosition}
                  >
                    <SelectTrigger className="bg-[#2a2438]">
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      {positions.map((position) => (
                        <SelectItem key={position} value={position}>
                          {position}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Image URL</Label>
                  <Input
                    value={playerImage}
                    onChange={(e) => setPlayerImage(e.target.value)}
                    className="bg-[#2a2438]"
                    placeholder="Enter image URL"
                  />
                </div>
              </div>
              <Button
                className="w-full bg-[#ff5722] hover:bg-[#ff5722]/90"
                type="submit"
              >
                Add Player
              </Button>
            </form>

            <div className="space-y-2 flex flex-col justify-center">
              <Label className="text-center">Squad List</Label>
              <div className="grid grid-cols-1 gap-2">
                {team.players.map((player) => (
                  <div
                    key={player.id}
                    className="flex justify-between items-center p-2 bg-[#2a2438] rounded"
                  >
                    <div className="flex items-center gap-2">
                      {player.image && (
                        <img
                          src={player.image || '/placeholder.svg'}
                          alt={player.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      )}
                      <span>
                        #{player.number} {player.name}
                      </span>
                    </div>
                    <span>{player.position}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="staff" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label>Manager</Label>
                <Input
                  value={team.staff.manager}
                  onChange={(e) =>
                    updateStaff(selectedTeam, { manager: e.target.value })
                  }
                  className="bg-[#2a2438]"
                />
              </div>
              <div>
                <Label>Assistant Manager</Label>
                <Input
                  value={team.staff.assistantManager}
                  onChange={(e) =>
                    updateStaff(selectedTeam, {
                      assistantManager: e.target.value,
                    })
                  }
                  className="bg-[#2a2438]"
                />
              </div>
              <div>
                <Label>Physio</Label>
                <Input
                  value={team.staff.physio}
                  onChange={(e) =>
                    updateStaff(selectedTeam, { physio: e.target.value })
                  }
                  className="bg-[#2a2438]"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="formation" className="space-y-4">
            <div>
              <Label>Formation</Label>
              <Select
                value={team.formation.name}
                onValueChange={(value) =>
                  updateFormation(selectedTeam, {
                    name: value,
                    positions: team.formation.positions,
                  })
                }
              >
                <SelectTrigger className="bg-[#2a2438]">
                  <SelectValue placeholder="Select formation" />
                </SelectTrigger>
                <SelectContent>
                  {formations.map((formation) => (
                    <SelectItem key={formation} value={formation}>
                      {formation}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </TabsContent>
  )
}