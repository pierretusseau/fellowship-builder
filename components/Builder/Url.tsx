import React from 'react'
import useCharacterStore from '@/store/useCharacterStore'
import type { Stat } from '@/store/useCharacterStore'
import CopyAllIcon from '@mui/icons-material/CopyAll';

function Url() {
  // const { character, talents, stats, gems } = useUrlStore()
  const character = useCharacterStore((state) => state.character)
  const talents = useCharacterStore((state) => state.talents)
  const stats = useCharacterStore((state) => state.stats)
  const gems = useCharacterStore((state) => state.gems)

  const urlSearchParams = new URLSearchParams()
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
  window.history.pushState(null, '', `?${urlSearchParams.toString()}`)

  const handleCopy = () => {
    console.log('copy', urlSearchParams.toString())
  }

  if (!character) return null

  return (
    <div
      className="p-2 bg-neutral-800 rounded-lg mb-4 select-none max-w-[800px] overflow-hidden whitespace-nowrap pr-12 relative"
    >
      <div className="overflow-hidden">{`https://${window.location.hostname}/?${urlSearchParams.toString()}`}</div>
      <div
        className="absolute top-1 right-1 cursor-pointer bg-slate-200 w-8 h-8 rounded-lg text-neutral-950 text-center pl-[0.5px] pt-[2px]"
        onClick={() => handleCopy()}
      ><CopyAllIcon /></div>
    </div>
  )
}

export default Url