export interface Player {
  id: string
  name: string
  number: number
  position: string
  image?: string
}

let __initOverlays = {
  x: 100,
  y: 100,
  scale: 100,
  visible: false,
};

export type IOverlays = {
  visible: boolean;
  x: number;
  y: number;
  scale: number;
  id: string;
}

export interface Staff {
  manager: string
  assistantManager: string
  physio: string
}

export interface PositionFormation {
  name: string
  assigned: boolean
  x: number
  y: number
}

export interface Formation {
  name: string // e.g. "4-4-2", "4-3-3"
  positions: PositionFormation[]
}

export type TeamRole = "home" | "away"

export interface MatchEvent {
  id: string
  type: "goal" | "yellowCard" | "redCard" | "substitution"
  minute: number
  teamId: TeamRole
  playerId: string
  assistById?: string // for goals
  replacedById?: string // for substitutions
}

export interface Substitution {
  id: string
  minute: number
  teamId: TeamRole
  playerOutId: string
  playerInId: string
}

export interface Team {
  name: string
  score: number
  color: string
  textColor: string
  logo: string
  logoFit: "contain" | "cover"
  players: Player[]
  staff: Staff
  formation: Formation
  teamRole : TeamRole
  primaryColor: string
  secondaryColor: string
}

export interface Time {
  minutes: number
  seconds: number
  stoppage: number
  isRunning: boolean
}

export type EventNotificationType = "Substitutes" | "Goals" | "Cards"

export interface EventNotification {
  enabled: boolean
  type: EventNotificationType
  playerNumberOut: string
  playerNameOut: string
  playerNumberIn: string
  playerNameIn: string
}

export type PeriodName = "1st Half" | "2nd Half" | "1st Extra" | "2nd Extra"

export interface MatchState {
  homeTeam: Team
  awayTeam: Team
  events: MatchEvent[]
  time: Time
  period: {
    name: PeriodName
    active: boolean
  }[]
  overlay: {
    enabled: boolean
    horizontalPosition: number
    verticalPosition: number
    showEvents: boolean
    eventDuration: number
  }
  dropdown: EventNotification
  substitutions: Substitution[]
}

export interface EventState {
  events: MatchEvent[]
  overlay: {
    enabled: boolean
    horizontalPosition: number
    verticalPosition: number
    showEvents: boolean
    eventDuration: number
  }
  dropdown: EventNotification
  substitutions: Substitution[]
}

export interface TimeState {
  time: Time
  period: {
    name: PeriodName
    active: boolean
  }[]
}

export interface OverlayState {
  scoreboardOverlay: IOverlays
  formationOverlay: IOverlays
}
export interface TeamState {
  homeTeam: Team
  awayTeam: Team
}