import { TimeState } from "@/store/interfaces"
import { create } from "zustand"
import { useTeamStore } from "./useTeam"

const initialState: TimeState = {
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
}

interface TimeStore extends TimeState {

  startMatch: () => void
  pauseMatch: () => void
  resetMatch: () => void
  updatePeriod: (periodName: string) => void
  updateTime: (timeUpdate: Partial<typeof initialState.time>) => void
}

export const useTimeStore = create<TimeStore>((set, get) => ({
  ...initialState,
  startMatch: () =>
    set((state) => ({
      time: { ...state.time, isRunning: true },
    })),
  pauseMatch: () =>
    set((state) => ({
      time: { ...state.time, isRunning: false },
    })),
  resetMatch: () => {
    
    set((state) => ({
      ...initialState,
      time: {
        minutes: 0,
        seconds: 0,
        stoppage: 0,
        isRunning: false,
      },
      events: [],
      substitutions: [],
    }))

    useTeamStore.getState().updateTeam("home", { score: 0 })
    useTeamStore.getState().updateTeam("away", { score: 0 })
  },
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

