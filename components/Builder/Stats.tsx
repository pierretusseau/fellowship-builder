import React from 'react'
import useCharacterStore, {
  incrementStatPrio,
  decrementStatPrio
} from '@/store/useCharacterStore'
import type { Stat } from '@/store/useCharacterStore'
import { IconButton } from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import useStore from '@/hooks/useStore'

function Stats() {
  const stats = useStore(useCharacterStore, (state) => state.stats)

  const statsLinesObject = stats && stats.length
    ? stats.reduce<Record<number, string[]>>((acc, stat: Stat) => {
      acc[stat.priority] = acc[stat.priority] || [];
      acc[stat.priority].push(stat.name);
      return acc;
    }, {})
    : null
  const statsLines = Object.entries(statsLinesObject || []).reverse()

  return (
    <div>
      <div>Stats prio: </div>
      <div>
        {statsLines.map(([priority, names], index, arr) => {
          const priorityNumber = parseInt(priority)
          return <div key={`priority-line-${priority}`} className="flex gap-4">
            {/* {priority} */}
            <div className="flex flex-col gap-2 w-full">
              {names.map((stat, ind) => (
                <div
                  key={`stat-line-${index}-stat-${ind}`}
                  className="flex items-center w-full bg-neutral-900 justify-center gap-2"
                >
                  <div className={
                    (names.length === 1 && priorityNumber >= statsLines.length - 1) || names.length === 0
                      ? 'opacity-0 pointer-events-none'
                      : ''
                  }>
                    <IconButton
                      onClick={() => incrementStatPrio(stat)}
                      color="primary"
                    ><ArrowUpwardIcon /></IconButton>
                  </div>
                  <div>{stat}</div>
                  <div className={priorityNumber === 0 ? 'opacity-0 pointer-events-none' : ''}>
                    <IconButton
                      onClick={() => decrementStatPrio(stat)}
                      color="primary"
                    ><ArrowDownwardIcon /></IconButton>
                  </div>
                </div>
              ))}
              {index < arr.length - 1 && <div className="text-center">v</div>}
            </div>
          </div>
        })}
      </div>
    </div>
  )
}

export default Stats