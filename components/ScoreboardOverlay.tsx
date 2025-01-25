'use client'

import STActivoSVG from './svg/logo-st-activo'
import { Time } from './scoreboard/Time'
import { Score } from './scoreboard/Score'
import { EventMatch } from './scoreboard/EventMatch'

export function ScoreboardOverlay() {
  return (
    <div className="relative font-['Roboto_Condensed']">
      <div className="w-[50vw]">
        <div className="relative">
          {/* Main Scoreboard */}
          <div className="flex items-stretch text-white">
            <STActivoSVG />
            <Time />
            <div className="flex flex-col items-center justify-center gap-1">
              <Score />
              <EventMatch />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
