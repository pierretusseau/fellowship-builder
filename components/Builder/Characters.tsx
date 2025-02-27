import React from 'react'
import {
  setCharacter
} from '@/store/useCharacterStore'
import { Button } from '@mui/material'

const chars = [
  'Helena',
  'Meiko',
  'Rime',
  'Tariq',
  'Sylvie',
  'Vigour'
]

function Characters() {
  // const character = useStore(useCharacterStore, (state) => state.character)

  return (
    <div className="flex gap-2 mb-4">
      {chars.map((c, index) => <Button
        key={`char-picker-char-${index}`}
        onClick={() => setCharacter(c)}
        variant='outlined'
      >
        {c}
      </Button>)}
    </div>
  )
}

export default Characters