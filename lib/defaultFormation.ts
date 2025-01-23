import { Formation } from "@/store/interfaces";

// defaultFormation.ts
export const defaultFormation:Formation[] = [
  {
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
  },
  {
    name: "3-5-2",
    positions: [
      { name: "GK", assigned: false },
      { name: "CB1", assigned: false },
      { name: "CB2", assigned: false },
      { name: "CB3", assigned: false },
      { name: "LM", assigned: false },
      { name: "CM1", assigned: false },
      { name: "CM2", assigned: false },
      { name: "CM3", assigned: false },
      { name: "RM", assigned: false },
      { name: "ST1", assigned: false },
      { name: "ST2", assigned: false },
    ],
  }
]
