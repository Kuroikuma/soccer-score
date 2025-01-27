import { MatchState } from '@/matchStore/interfaces'
import { create } from 'zustand'

const initialState: MatchState = {
  leagueLogo: '',
  leagueName: '',
}

interface MatchStore extends MatchState {}

export const useMatchStore = create<MatchStore>((set, get) => ({
  ...initialState,
}))
