import React from 'react'
import useSavedBuildsStore, { removeSavedBuild } from '@/store/useSavedBuilds'
import type { Build } from '@/store/useSavedBuilds'
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

function SavedBuilds() {
  const builds = useSavedBuildsStore((state) => state.builds)

  if (builds.length === 0) return null

  return (
    <div className="flex gap-4 max-w-[1200px] overflow-auto">
      {builds.map((build: Build, index) => {
        return <a
          key={`build-${index}-${build.timestamp}`}
          onClick={(e) => e.stopPropagation()}
          href={build.url}
        >
          <div
            className="group/build-btn bg-neutral-900 rounded-xl p-4 pr-10 relative"
          >
            <p className="text-xl">{build.character}</p>
            <p>{build.talentsCode}</p>
            <div className="absolute top-0 right-0 opacity-0 group-hover/build-btn:opacity-100 transition">
              <IconButton
                color="error"
                onClick={(e) => {
                  e.stopPropagation()
                  removeSavedBuild(build)
                }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        </a>
      })}
    </div>
  )
}

export default SavedBuilds