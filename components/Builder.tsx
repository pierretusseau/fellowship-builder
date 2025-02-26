'use client'

import React from 'react'
import useStore from '@/hooks/useStore'
import useCharacterStore, {
  baseGems,
  setCharacter,
  setGems,
  setStats,
  setTalents
} from '@/store/useCharacterStore'
import Talents from '@/components/Builder/Talents'
import Stats from '@/components/Builder/Stats'
import Gems from '@/components/Builder/Gems'
import Characters from '@/components/Builder/Characters'
import type { urlBuild, Stat, Talent, CharacterTalents, Gem } from '@/store/useCharacterStore'
import Url from '@/components/Builder/Url'
import talentsData from '@/static/talents.json' assert { type: "json" }

function Builder({
  params
}: {
  params: urlBuild
}) {
  const character = useStore(useCharacterStore, (state) => state.character)

  if (params && !character) {
    // console.log(params)
    // Character
    if (params.character && typeof params.character === "string") {
      setCharacter(params.character)
    }
    // Talents
    // const urlTalents = talents?.map(talent => `${talent.row}${talent.col}`).join('.')
    if (params.talents && typeof params.talents === 'string' && params.character && typeof params.character === "string") {
      const talents = params.talents.split('.')
  
      const talentsDataTypes = talentsData as CharacterTalents
      
      const characterTalents = params.character && Object.hasOwn(talentsData, params.character)
        ? talentsDataTypes[params.character].talents
        : undefined
      const talentsToAdd = characterTalents?.filter((talent: Talent) => {
        return talents.includes(`${talent.row}${talent.col}`)
      })
      setTalents(talentsToAdd || [])
    }
    // Stats
    if (params.stats && typeof params.stats === 'string') {
      const statGroups = params.stats.split('*')
      const parsedStats: Stat[] = []
      statGroups.forEach((group: string) => {
        const [priorityStr, names] = group.split("-")
        const priority = Number(priorityStr)
        const statNames = names.split(".")
  
        statNames.forEach((name) => {
          parsedStats.push({ name: name.replace(/\+/g, " "), priority })
        });
      });
      setStats(parsedStats)
    }
    // Gems
    if (params.gems && typeof params.gems === 'string') {
      const splitGems = params.gems.split('*')
      const gemsToAdd = splitGems.map(gem => {
        const [color, quantity] = gem.split("-")
        const correspondingGem = baseGems.find(g => g.color === color)
        return {
          ...correspondingGem,
          quantity: Number(quantity)
        }
      }) as Gem[]
      setGems(gemsToAdd)
    }
  }
  
  return (
    <div>
      <Url />
      <Characters />
      <div className="flex flex-col gap-5">
        <div className="text-4xl">{character || 'Select a char'}</div>
        {character && <div className="flex flex-col gap-5">
          <Talents />
          <Stats />
          <Gems />
        </div>}
      </div>
    </div>
  )
}

export default Builder