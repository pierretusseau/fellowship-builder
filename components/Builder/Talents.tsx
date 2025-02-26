import React, { useCallback } from 'react'
import useCharacterStore, {
  setTalents,
} from '@/store/useCharacterStore'
import type { Character, Talent, Talents } from '@/store/useCharacterStore'
import talentsData from '@/static/talents.json' assert { type: "json" }
import useStore from '@/hooks/useStore'

type CharacterTalents = {
  [key: string]: {
    talents: Talent[]
  }
}

function Talents({
  character,
}: {
  character: Character
}) {
  const talents = useStore(useCharacterStore, (state) => state.talents)

  const talentsDataTypes = talentsData as CharacterTalents
  
  const characterTalents = character && Object.hasOwn(talentsData, character)
    ? talentsDataTypes[character].talents
    : undefined

  const handleTalentToggle = useCallback((talent: Talent) => {
    if (!talents) return
    const newTalents = talents.some(t => t.name === talent.name)
      ? talents.filter(t => t.name !== talent.name)
      : [...talents, talent]
    setTalents(newTalents.sort((a, b) => parseInt(`${a.row}${a.col}`) - parseInt(`${b.row}${b.col}`)))
  }, [talents])
  
  if (!characterTalents || !talents) return null

  return (
    <div>
      <div>Talent code : {talents.map((t: Talent) => {
        return `${t.row}.${t.col}`
      }).join('/')}</div>
      {character && <div className="grid grid-cols-3 gap-2">
        {characterTalents.map((talent: Talent) => <div
          key={`talent-${talent.row}-${talent.col}`}
          onClick={() => handleTalentToggle(talent)}
          className={`${[
            talents.some((t) => t.name === talent.name) && 'text-green-400'
          ].join(' ')}`}
        >
          {talent.name}
        </div>)}
      </div>}
    </div>
  )
}

export default Talents
