import { create } from "zustand"
import {
  persist
} from 'zustand/middleware'

export type Character = string | undefined
export type Talent = {
  name: string,
  row: number,
  col: number,
  cost: number,
  effect: string[]
}
export type Talents = Talent[]
export type Stat = {
  name: string,
  priority: number,
}
export type Gem = {
  color: 'red' | 'purple' | 'yellow' | 'green' | 'blue' | 'diamond',
  priority: number,
  quantity: number,
}

const baseStats = [
  { name: "Critical Strike", priority: 0 },
  { name: "Expertise", priority: 0 },
  { name: "Haste", priority: 0 },
  { name: "Spirit", priority: 0 },
] as Stat[]

// Store creation
/*----------------------------------------------------*/
const useCharacterStore = create(
  persist(
    // (set, get) => ({
    () => ({
      character: undefined as Character,
      talents: [] as Talents,
      stats: baseStats,
      gems: [] as Gem[],
    }),
    {
      name: 'fellowship-builder-char', // name of the item in the storage (must be unique)
      // storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)

export default useCharacterStore

// Store manipulation methods
/*----------------------------------------------------*/
// Character
export const setCharacter = (character: Character) => {
  useCharacterStore.setState(() => ({
    character: character,
    talents: [],
    stats: baseStats,
    gems: [],
  }))
}
// Talents
export const setTalents = (talents: Talents) => {
  useCharacterStore.setState(() => ({ talents: talents }))
}
// Stats
export const setStats = (stats: Stat[]) => {
  useCharacterStore.setState(() => ({ stats: stats }))
}
export const incrementStatPrio = (stat: Stat['name']) => {
  useCharacterStore.setState((state) => {
    const updatedStats = state.stats.map((s) =>
      s.name === stat? {...s, priority: s.priority + 1 } : s
    )
    return { stats: updatedStats }
  })
}
export const decrementStatPrio = (stat: Stat['name']) => {
  useCharacterStore.setState((state) => {
    const updatedStats = state.stats.map((s) =>
      s.name === stat? {...s, priority: Math.max(0, s.priority - 1) } : s
    )
    return { stats: updatedStats }
  })
}
// Gems
export const setGems = (gems: Gem[]) => {
  useCharacterStore.setState(() => ({ gems: gems }))
}