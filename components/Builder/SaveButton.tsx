import React, { useCallback, useMemo } from 'react'
import SaveIcon from '@mui/icons-material/Save';
import { Button } from '@mui/material'
import useCharacterStore, { Stat, Talent } from '@/store/useCharacterStore';
import { addSavedBuild } from '@/store/useSavedBuilds';

function SaveButton() {
  const character = useCharacterStore((state) => state.character)
  const talents = useCharacterStore((state) => state.talents)
  const stats = useCharacterStore((state) => state.stats)
  const gems = useCharacterStore((state) => state.gems)
  
  const urlSearchParams = useMemo(() => new URLSearchParams(), [])

  const handleSaveBuild = useCallback(() => {
    if (!character) return
    const talentsCode = talents.map((t: Talent) => {
      return `${t.row}.${t.col}`
    }).join('/')
    const url = `?${urlSearchParams.toString()}`
    addSavedBuild({
      character: character,
      talentsCode: talentsCode,
      url: url,
      timestamp: new Date().toISOString(),
    })
  }, [character, talents, urlSearchParams],)
  if (character) {
    urlSearchParams.set('character', character)
  } else {
    window.history.pushState(null, '')
  }
  if (talents && talents.length) {
    const urlTalents = talents?.map(talent => `${talent.row}${talent.col}`).join('.')
    urlSearchParams.set('talents', urlTalents)
  }
  if (stats) {
    const statsLinesObject = stats && stats.length
      ? stats.reduce<Record<number, string[]>>((acc, stat: Stat) => {
        acc[stat.priority] = acc[stat.priority] || [];
        acc[stat.priority].push(stat.name);
        return acc;
      }, {})
      : null
    const statsLines = Object.entries(statsLinesObject || []).reverse()
    const urlStats = statsLines?.map(([priority, names]) => {
        return `${parseInt(priority)}-${names.join('.')}`
      }).join('*')
    urlSearchParams.set('stats', urlStats)
  }
  if (gems) {
    const urlGems = gems?.map((gem) => {
        return `${gem.color}-${gem.quantity}`
      }).join('*')
      urlSearchParams.set('gems', urlGems)
  }

  if (!character) return null
  
  return (
    <Button
      startIcon={<SaveIcon />}
      color='success'
      variant='outlined'
      onClick={() => handleSaveBuild()}
    >
      Save 
    </Button>
  )
}

export default SaveButton