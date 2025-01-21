import { create } from "zustand"

interface Player {
  id: string
  name: string
  number: number
  position: string
  image?: string
}

interface Staff {
  manager: string
  assistantManager: string
  physio: string
}

interface Formation {
  name: string // e.g. "4-4-2", "4-3-3"
  positions: string[]
}

export type teamRole = "home" | "away"

interface MatchEvent {
  id: string
  type: "goal" | "yellowCard" | "redCard" | "substitution"
  minute: number
  teamId: teamRole
  playerId: string
  assistById?: string // for goals
  replacedById?: string // for substitutions
}

interface Substitution {
  id: string
  minute: number
  teamId: teamRole
  playerOutId: string
  playerInId: string
}

interface Team {
  name: string
  score: number
  color: string
  textColor: string
  logo: string
  logoFit: "contain" | "cover"
  players: Player[]
  staff: Staff
  formation: Formation
  teamRole : teamRole
}

interface MatchState {
  homeTeam: Team
  awayTeam: Team
  events: MatchEvent[]
  time: {
    minutes: number
    seconds: number
    stoppage: number
    isRunning: boolean
  }
  period: {
    name: "1st Half" | "2nd Half" | "1st Extra" | "2nd Extra"
    active: boolean
  }[]
  overlay: {
    enabled: boolean
    horizontalPosition: number
    verticalPosition: number
    showEvents: boolean
    eventDuration: number
  }
  dropdown: {
    enabled: boolean
    type: "Substitutes" | "Goals" | "Cards"
    playerNumberOut: string
    playerNameOut: string
    playerNumberIn: string
    playerNameIn: string
  }
  substitutions: Substitution[]
}

const defaultFormation: Formation = {
  name: "4-4-2",
  positions: ["GK", "RB", "CB", "CB", "LB", "RM", "CM", "CM", "LM", "ST", "ST"],
}

const defaultStaff: Staff = {
  manager: "",
  assistantManager: "",
  physio: "",
}

const initialState: MatchState = {
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
  },
  events: [],
  time: {
    minutes: 0,
    seconds: 0,
    stoppage: 0,
    isRunning: false,
  },
  period: [
    { name: "1st Half", active: true },
    { name: "2nd Half", active: false },
    { name: "1st Extra", active: false },
    { name: "2nd Extra", active: false },
  ],
  overlay: {
    enabled: true,
    horizontalPosition: 0,
    verticalPosition: 0,
    showEvents: true,
    eventDuration: 5000,
  },
  dropdown: {
    enabled: false,
    type: "Substitutes",
    playerNumberOut: "",
    playerNameOut: "",
    playerNumberIn: "",
    playerNameIn: "",
  },
  substitutions: [],
}

interface MatchStore extends MatchState {
  addPlayer: (team: teamRole, player: Omit<Player, "id">) => void
  updateTeam: (team: teamRole, updates: Partial<Team>) => void
  updateStaff: (team: teamRole, updates: Partial<Staff>) => void
  updateFormation: (team: teamRole, formation: Formation) => void
  addEvent: (event: Omit<MatchEvent, "id">) => void
  removeEvent: (eventId: string) => void
  startMatch: () => void
  pauseMatch: () => void
  resetMatch: () => void
  addSubstitution: (substitution: Omit<Substitution, "id">) => void
  removeSubstitution: (substitutionId: string) => void
  updatePeriod: (periodName: string) => void
  updateTime: (timeUpdate: Partial<typeof initialState.time>) => void
  updateTeamName: (team: teamRole, name: string) => void
}

export const useMatchStore = create<MatchStore>((set) => ({
  ...initialState,
  addPlayer: (team, playerData) =>
    set((state) => ({
      [team === "home" ? "homeTeam" : "awayTeam"]: {
        ...state[team === "home" ? "homeTeam" : "awayTeam"],
        players: [
          ...state[team === "home" ? "homeTeam" : "awayTeam"].players,
          { ...playerData, id: Date.now().toString() },
        ],
      },
    })),
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
  addEvent: (eventData) =>
    set((state) => ({
      events: [...state.events, { ...eventData, id: Date.now().toString() }],
      ...(eventData.type === "goal"
        ? {
            [eventData.teamId === "home" ? "homeTeam" : "awayTeam"]: {
              ...state[eventData.teamId === "home" ? "homeTeam" : "awayTeam"],
              score: state[eventData.teamId === "home" ? "homeTeam" : "awayTeam"].score + 1,
            },
          }
        : {}),
    })),
  removeEvent: (eventId) =>
    set((state) => ({
      events: state.events.filter((event) => event.id !== eventId),
    })),
  startMatch: () =>
    set((state) => ({
      time: { ...state.time, isRunning: true },
    })),
  pauseMatch: () =>
    set((state) => ({
      time: { ...state.time, isRunning: false },
    })),
  resetMatch: () =>
    set((state) => ({
      ...initialState,
      homeTeam: {
        ...initialState.homeTeam,
        score: 0,
      },
      awayTeam: {
        ...initialState.awayTeam,
        score: 0,
      },
      time: {
        minutes: 0,
        seconds: 0,
        stoppage: 0,
        isRunning: false,
      },
      events: [],
      substitutions: [],
    })),
  addSubstitution: (substitutionData) =>
    set((state) => ({
      substitutions: [...state.substitutions, { ...substitutionData, id: Date.now().toString() }],
    })),
  removeSubstitution: (substitutionId) =>
    set((state) => ({
      substitutions: state.substitutions.filter((sub) => sub.id !== substitutionId),
    })),
  updatePeriod: (periodName) =>
    set((state) => ({
      period: state.period.map((p) => ({
        ...p,
        active: p.name === periodName,
      })),
    })),
  updateTime: (timeUpdate) =>
    set((state) => ({
      time: {
        ...state.time,
        ...timeUpdate,
      },
    })),
}))

