import { OverlayState } from "@/store/interfaces"
import { create } from "zustand"


let __initOverlays__ = {
  x: 50,
  y: 5,
  scale: 100,
  visible: false,
};

const initialState: OverlayState = {
  scoreboardUpOverlay: {...__initOverlays__, id: "scoreboardUp"},
  formationOverlay: {...__initOverlays__, id: "formation"},
  goalsDownOverlay: {...__initOverlays__, id: "goalsDown", y: 75, x: 500},
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
    const { formationOverlay, scoreboardUpOverlay } = get()

    if (id === formationOverlay.id) {
      set({ formationOverlay: { ...formationOverlay, x: data.x, y: data.y } })
    } else if (id === scoreboardUpOverlay.id) {
      set({ scoreboardUpOverlay: { ...scoreboardUpOverlay, x: data.x, y: data.y } })
    } else if (id === "goalsDown") {
      set({ goalsDownOverlay: { ...scoreboardUpOverlay, x: data.x, y: data.y } })
    }
  },
  handleScaleOverlay: async (
    id: string,
    scale: number,
    isSaved = true
  ) => {
    const { formationOverlay, scoreboardUpOverlay } = get()

    if (id === formationOverlay.id) {
      set({ formationOverlay: { ...formationOverlay, scale } })
    } else if (id === scoreboardUpOverlay.id) {
      set({ scoreboardUpOverlay: { ...scoreboardUpOverlay, scale } })
    } else if (id === "goalsDown") {
      set({ goalsDownOverlay: { ...scoreboardUpOverlay, scale } })
    }
  },
  handleVisibleOverlay: async (
    id: string,
    visible: boolean,
    isSaved = true
  ) => {
    const { formationOverlay, scoreboardUpOverlay } = get()

    if (id === formationOverlay.id) {
      set({ formationOverlay: { ...formationOverlay, visible } })
    } else if (id === scoreboardUpOverlay.id) {
      set({ scoreboardUpOverlay: { ...scoreboardUpOverlay, visible } })
    } else if (id === "goalsDown") {
      set({ goalsDownOverlay: { ...scoreboardUpOverlay, visible } })
    }
  },
}))

