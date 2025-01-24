import { Formation, Player, Staff, Team, TeamRole, TeamState } from "@/store/interfaces"
import { create } from "zustand"

const defaultFormation: Formation = {
  name: "4-4-2",
  positions: [
    { name: "GK", assigned: false, y:5, x:46 },
    { name: "LB", assigned: false, y:24, x:24 },
    { name: "CB1", assigned: false, y:16, x:38 },
    { name: "CB2", assigned: false, y:16, x:55 },
    { name: "RB", assigned: false, y:24, x:68 },
    { name: "LM", assigned: false, y:55, x:24 },
    { name: "CM1", assigned: false, y:45, x:38 },
    { name: "CM2", assigned: false, y:45, x:55 },
    { name: "RM", assigned: false, y:55, x:68 },
    { name: "ST1", assigned: false, y:75, x:36 },
    { name: "ST2", assigned: false, y:75, x:54 },
  ],
}

const defaultStaff: Staff = {
  manager: "",
  assistantManager: "",
  physio: "",
}

const initialState: TeamState = {
  homeTeam: {
    name: "Home Team",
    score: 0,
    color: "#06c12",
    textColor: "#ffffff",
    logo: "/placeholder.svg",
    logoFit: "contain",
    players: [],
    staff: defaultStaff,
    formation: defaultFormation,
    teamRole: "home"
  },
  awayTeam: {
    name: "Away Team",
    score: 0,
    color: "#b60218",
    textColor: "#ffffff",
    logo: "/placeholder.svg",
    logoFit: "contain",
    players: [],
    staff: defaultStaff,
    formation: defaultFormation,
    teamRole: "away"
  }
}

interface TeamStore extends TeamState {
  addPlayer: (teamRole: TeamRole, player: Omit<Player, "id">) => void
  updateTeam: (team: TeamRole, updates: Partial<Team>) => void
  updateStaff: (team: TeamRole, updates: Partial<Staff>) => void
  updateFormation: (team: TeamRole, formation: Formation) => void
  updateTeamName: (team: TeamRole, name: string) => void
}

export const useTeamStore = create<TeamStore>((set, get) => ({
  ...initialState,
  addPlayer: (teamRole, playerData) => {
    const { homeTeam, awayTeam } = get()

    let team = teamRole === "home" ? homeTeam : awayTeam;

    const updatedFormation = team.formation.positions.map((pos) => {
      if (!pos.assigned && pos.name === playerData.position) {
        return { ...pos, assigned: true };
      }
      return pos;
    });

    set(({
      [teamRole === "home" ? "homeTeam" : "awayTeam"]: {
        ...team,
        players: [
          ...team.players,
          { ...playerData, id: Date.now().toString() },
        ],
        formation: {
          ...team.formation,
          positions: updatedFormation,
        },
      },
    }))
  },
  updateTeam: (team, updates) =>
    set((state) => ({
      [team === "home" ? "homeTeam" : "awayTeam"]: {
        ...state[team === "home" ? "homeTeam" : "awayTeam"],
        ...updates,
      },
    })),
    updateTeamName: (team, name) =>
    set((state) => ({
      [team === "home" ? "homeTeam" : "awayTeam"]: {
        ...state[team === "home" ? "homeTeam" : "awayTeam"],
        name,
      },
    })),
  updateStaff: (team, updates) =>
    set((state) => ({
      [team === "home" ? "homeTeam" : "awayTeam"]: {
        ...state[team === "home" ? "homeTeam" : "awayTeam"],
        staff: {
          ...state[team === "home" ? "homeTeam" : "awayTeam"].staff,
          ...updates,
        },
      },
    })),
  updateFormation: (team, formation) =>
    set((state) => ({
      [team === "home" ? "homeTeam" : "awayTeam"]: {
        ...state[team === "home" ? "homeTeam" : "awayTeam"],
        formation,
      },
    })),
}))

