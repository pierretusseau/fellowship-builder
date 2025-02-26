import React from 'react'
import useCharacterStore, {
  incrementStatPrio,
  decrementStatPrio
} from '@/store/useCharacterStore'
import type { Stat } from '@/store/useCharacterStore'
import { IconButton } from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

function Stats() {
  const stats = useCharacterStore((state) => state.stats)

  if (!stats.length) return null

  const statsLinesObject = stats.reduce<Record<number, string[]>>((acc, stat: Stat) => {
    acc[stat.priority] = acc[stat.priority] || [];
    acc[stat.priority].push(stat.name);
    return acc;
  }, {})
  const statsLines = Object.entries(statsLinesObject)

  return (
    <div>
      <div>Stats prio: </div>
      <div>
        {statsLines.reverse().map(([priority, names], index, arr) => {
          const priorityNumber = parseInt(priority)
          return <div key={`priority-line-${priority}`} className="flex gap-4">
            {/* {priority} */}
            <div className="flex flex-col gap-2 w-full">
              {names.map((stat, ind) => (
                <div
                  key={`stat-line-${index}-stat-${ind}`}
                  className="flex gap-1 items-center w-full bg-neutral-900 justify-center gap-2"
                >
                  <div className={(priorityNumber >= statsLines.length - 1) && names.length > 0 ? 'opacity-0 pointer-events-none' : ''}>
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