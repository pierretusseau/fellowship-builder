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
    <div>
      {chars.map((c, index) => <Button
        key={`char-picker-char-${index}`}
        onClick={() => setCharacter(c)}
      >
        {c}
      </Button>)}
      {/* <Button onClick={() => setCharacter(undefined)}>Reset</Button> */}
    </div>
  )
}

export default Characters