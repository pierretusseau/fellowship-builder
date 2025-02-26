'use client'

import React from 'react'
import useStore from '@/hooks/useStore'
import useCharacterStore, {
  setCharacter
} from '@/store/useCharacterStore'
import Talents from '@/components/Builder/Talents'
import Stats from '@/components/Builder/Stats'
import Gems from '@/components/Builder/Gems'

const chars = [
  'Helena',
  'Meiko',
  'Rime',
  'Tariq',
  'Sylvie',
  'Vigour'
]

function Builder() {
  const character = useStore(useCharacterStore, (state) => state.character)

  return (
    <div>
      <div>
        {chars.map((c, index) => <button
          key={`char-picker-char-${index}`}
          onClick={() => setCharacter(c)}
        >
          {c}
        </button>)}
        <button onClick={() => setCharacter(undefined)}>Reset</button>
      </div>
      <div className="flex flex-col gap-5">
        <div>{character || 'Select a char'}</div>
        {character && <div className="flex flex-col gap-5">
          <Talents character={character} />
          <Stats />
          <Gems />
        </div>}
      </div>
    </div>
  )
}

export default Builder