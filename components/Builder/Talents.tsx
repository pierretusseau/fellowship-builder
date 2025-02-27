import React, { useCallback } from 'react'
import useCharacterStore, {
  setTalents,
} from '@/store/useCharacterStore'
import type { Talent, Talents, CharacterTalents } from '@/store/useCharacterStore'
import talentsData from '@/static/talents.json' assert { type: "json" }
import useStore from '@/hooks/useStore'

function Talents() {
  const character = useStore(useCharacterStore, (state) => state.character)
  const talents = useStore(useCharacterStore, (state) => state.talents)
  
  // useUrlUpdater('talents', talents?.map(talent => `${talent.row}${talent.col}`).join('.'))

  const talentsDataTypes = talentsData as CharacterTalents
  
  const characterTalents = character && Object.hasOwn(talentsData, character)
    ? talentsDataTypes[character].talents
    : undefined

  const handleTalentToggle = useCallback((talent: Talent) => {
    if (!talents) return
    const newTalents = talents.some(t => t.name === talent.name)
      ? talents.filter(t => t.name !== talent.name)
      : [...talents, talent]
    const sortedTalents = newTalents.sort((a, b) => parseInt(`${a.row}${a.col}`) - parseInt(`${b.row}${b.col}`))
    setTalents(sortedTalents)
  }, [talents])
  
  const talentsScore = talents?.map(talent => talent.cost).reduce((accumulator, currentValue) => {
    return accumulator + currentValue
  }, 0) || 0
  
  if (!characterTalents || !talents) return null

  return (
    <div>
      <div className="flex gap-4 mb-4 items-center">
        <div className="bg-neutral-800 rounded-lg p-2 min-h-10 grow">{talents.map((t: Talent) => {
          return `${t.row}.${t.col}`
        }).join('/')}</div>
        <div className="text-2xl w-10 text-center">{talentsScore}/8</div>
      </div>
      {character && <div className="grid grid-cols-3 gap-2">
        {characterTalents.map((talent: Talent) => <div
          key={`talent-${talent.row}-${talent.col}`}
          onClick={() => handleTalentToggle(talent)}
          className={`${[
            'cursor-pointer transition',
            'px-2 py-4 bg-neutral-900 rounded-lg text-center hover:bg-neutral-800',
            talents.some((t) => t.name === talent.name) && 'bg-green-700 hover:bg-green-600',
            talentsScore + talent.cost > 8 && !talents.some((t) => t.name === talent.name) && 'opacity-25 pointer-events-none'
          ].join(' ')}`}
        >
          {talent.name}
        </div>)}
      </div>}
    </div>
  )
}

export default Talents
