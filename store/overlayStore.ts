import { OverlayState } from "@/store/interfaces"
import { create } from "zustand"


let __initOverlays__ = {
  x: 0,
  y: 0,
  scale: 100,
  visible: false,
};

const initialState: OverlayState = {
  scoreboardOverlay: {...__initOverlays__, id: "scoreboard"},
  formationOverlay: {...__initOverlays__, id: "formation"},
}

interface OverlaysStore extends OverlayState {
  handlePositionOverlay: (id: string, data: { x: number; y: number; }, isSaved?: boolean) => Promise<void>
  handleScaleOverlay: (id: string, scale: number, isSaved?: boolean) => Promise<void>
  handleVisibleOverlay: (id: string, visible: boolean, isSaved?: boolean) => Promise<void>
}

export const useOverlaysStore = create<OverlaysStore>((set, get) => ({
  ...initialState,
  handlePositionOverlay: async (
    id: string,
    data: { x: number; y: number },
    isSaved = true
  ) => {
    const { formationOverlay, scoreboardOverlay } = get()

    if (id === formationOverlay.id) {
      set({ formationOverlay: { ...formationOverlay, x: data.x, y: data.y } })
    } else if (id === scoreboardOverlay.id) {
      set({ scoreboardOverlay: { ...scoreboardOverlay, x: data.x, y: data.y } })
    } 
  },
  handleScaleOverlay: async (
    id: string,
    scale: number,
    isSaved = true
  ) => {
    const { formationOverlay, scoreboardOverlay } = get()

    if (id === formationOverlay.id) {
      set({ formationOverlay: { ...formationOverlay, scale } })
    } else if (id === scoreboardOverlay.id) {
      set({ scoreboardOverlay: { ...scoreboardOverlay, scale } })
    } 
  },
  handleVisibleOverlay: async (
    id: string,
    visible: boolean,
    isSaved = true
  ) => {
    const { formationOverlay, scoreboardOverlay } = get()

    if (id === formationOverlay.id) {
      set({ formationOverlay: { ...formationOverlay, visible } })
    } else if (id === scoreboardOverlay.id) {
      set({ scoreboardOverlay: { ...scoreboardOverlay, visible } })
    } 
  },
}))

