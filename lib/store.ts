import { FormationFootball, MatchEventFootball, MatchState2, PlayerFootball, StaffFootball, SubstitutionFootball, TeamFootball, TeamRole } from "@/matchStore/interfaces"
import { create } from "zustand"

const defaultFormation: FormationFootball = {
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

const defaultStaff: StaffFootball = {
  manager: "",
  assistantManager: "",
  physio: "",
}

const initialState: MatchState2 = {
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
    teamRole: "home",
    primaryColor: "",
    secondaryColor: "",
    shortName:""
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
    teamRole: "away",
    primaryColor: "",
    secondaryColor: "",
    shortName:""
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
  substitutions: [],
}

interface MatchStore extends MatchState2 {
  addPlayer: (teamRole: TeamRole, player: Omit<PlayerFootball, "id">) => void
  updateTeam: (team: TeamRole, updates: Partial<TeamFootball>) => void
  updateStaff: (team: TeamRole, updates: Partial<StaffFootball>) => void
  updateFormation: (team: TeamRole, formation: FormationFootball) => void
  addEvent: (event: Omit<MatchEventFootball, "id">) => void
  removeEvent: (eventId: string) => void
  startMatch: () => void
  pauseMatch: () => void
  resetMatch: () => void
  addSubstitution: (substitution: Omit<SubstitutionFootball, "id">) => void
  removeSubstitution: (substitutionId: string) => void
  updatePeriod: (periodName: string) => void
  updateTime: (timeUpdate: Partial<typeof initialState.time>) => void
  updateTeamName: (team: TeamRole, name: string) => void
}

export const useMatchStore = create<MatchStore>((set, get) => ({
  ...initialState,
  addPlayer: (teamRole, playerData) =>{
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

