import { create } from "zustand"
import {
  persist
} from 'zustand/middleware'

export type Build = {
  character: string,
  talentsCode: string,
  url: string,
  timestamp: string,
}

const useSavedBuildsStore = create(
  persist(
    // (set, get) => ({
    () => ({
      builds: [] as Build[]
    }),
    {
      name: 'fellowship-builds', // name of the item in the storage (must be unique)
      // storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)

export default useSavedBuildsStore

export const addSavedBuild = (build: Build) => {
  useSavedBuildsStore.setState((state) => ({
    builds: [...state.builds, build],
  }));
}

export const removeSavedBuild = (build: Build) => {
  useSavedBuildsStore.setState((state) => ({
    builds: state.builds.filter((b) => b.timestamp !== build.timestamp),
  }));
}