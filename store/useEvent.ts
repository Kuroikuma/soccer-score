import { EventState, MatchEvent, Substitution } from "@/store/interfaces"
import { create } from "zustand"
import { useTeamStore } from "./useTeam"


const initialState: EventState = {
  events: [],
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

interface MatchEventStore extends EventState {
  addEvent: (event: Omit<MatchEvent, "id">) => void
  addSubstitution: (substitution: Omit<Substitution, "id">) => void
  removeSubstitution: (substitutionId: string) => void
  removeEvent: (eventId: string) => void
}

export const useEventStore = create<MatchEventStore>((set, get) => ({
  ...initialState,

  addEvent: (eventData) =>
    set((state) => ({
      events: [...state.events, { ...eventData, id: Date.now().toString() }],
      ...(eventData.type === 'goal'
        ? useTeamStore
            .getState()
            .updateTeam(eventData.teamId === 'home' ? 'home' : 'away', {
              score:
                eventData.teamId === 'home'
                  ? useTeamStore.getState().homeTeam.score + 1
                  : useTeamStore.getState().awayTeam.score + 1,
            })
        : // {
          //   [eventData.teamId === "home" ? "homeTeam" : "awayTeam"]: {
          //     ...state[eventData.teamId === "home" ? "homeTeam" : "awayTeam"],
          //     score: state[eventData.teamId === "home" ? "homeTeam" : "awayTeam"].score + 1,
          //   },
          // }
          {}),
    })),
  removeEvent: (eventId) =>
    set((state) => ({
      events: state.events.filter((event) => event.id !== eventId),
    })),

  addSubstitution: (substitutionData) =>
    set((state) => ({
      substitutions: [
        ...state.substitutions,
        { ...substitutionData, id: Date.now().toString() },
      ],
    })),
  removeSubstitution: (substitutionId) =>
    set((state) => ({
      substitutions: state.substitutions.filter(
        (sub) => sub.id !== substitutionId
      ),
    })),
}))

