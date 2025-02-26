import React from 'react'
import useCharacterStore, {
  incrementGem,
  decrementGem
} from '@/store/useCharacterStore'
import type { Gem } from '@/store/useCharacterStore'
import useStore from '@/hooks/useStore'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { IconButton } from '@mui/material';

function Gems() {
  const gems = useStore(useCharacterStore, (state) => state.gems)
  
  const generateGems = (gem: Gem) => {
    const gemArray = []
    for (let i = 0; i < gem.quantity; i++) {
      gemArray.push(<div
        key={`gem-${gem.color}-${i}`} style={{
          backgroundColor: gem.color === 'diamond'
          ? 'white'
          : gem.color
        }}
        className="h-4 w-4 rounded-full"
      />)
    }
    return gemArray
  }

  if (!gems) return null

  return (
    <div>
      {gems?.map((gem, index) => <div
        key={`gem-line-${index}`}
        className="flex gap-1"
      >
        <IconButton
          disabled={gem.quantity === 0}
          onClick={() => decrementGem(gem.color)}
          color='primary'
        ><RemoveCircleIcon /></IconButton>
        <IconButton
          disabled={gem.quantity >= 12}
          onClick={() => incrementGem(gem.color)}
          color='primary'
        ><AddCircleIcon /></IconButton>
        <div className="flex items-center gap-4">
          <div className="w-16">{gem.name}</div>
          <div className="flex gap-1">{generateGems(gem)}</div>
        </div>
      </div>)}
    </div>
  )
}

export default Gems