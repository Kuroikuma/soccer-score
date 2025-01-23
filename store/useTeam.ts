import { Formation, MatchEvent, MatchState, Player, Staff, Substitution, Team, TeamRole, TeamState } from "@/store/interfaces"
import { create } from "zustand"

const defaultFormation: Formation = {
  name: "4-4-2",
  positions: [
    { name: "GK", assigned: false },
    { name: "LB", assigned: false },
    { name: "CB1", assigned: false },
    { name: "CB2", assigned: false },
    { name: "RB", assigned: false },
    { name: "LM", assigned: false },
    { name: "CM1", assigned: false },
    { name: "CM2", assigned: false },
    { name: "RM", assigned: false },
    { name: "ST1", assigned: false },
    { name: "ST2", assigned: false },
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

