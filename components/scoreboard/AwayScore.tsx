import { useTeamStore } from '@/store/useTeam'
import ArrowCircleRigth from '../svg/ArrowCircleRigth'

export function AwayScore() {
  const { awayTeam } = useTeamStore()
  return (
    <>
      <div className="flex items-center justify-center text-white px-6 text-3xl font-bold">
        {awayTeam.score}
      </div>

      <div className="flex items-center justify-center">
        <ArrowCircleRigth className="text-white" />
      </div>

      {/* Away Team */}
      <div
        className="flex items-center p-2 pr-4 pl-8"
      >
        <span className="font-bold text-xl">{awayTeam.name}</span>
      </div>
      <div className="flex flex-col h-full w-3">
        <div
          className={`h-[50%] w-full`}
          style={{ background: awayTeam.primaryColor }}
        ></div>
        <div
          className={`h-[50%] w-full`}
          style={{ background: awayTeam.secondaryColor }}
        ></div>
      </div>
    </>
  )
}
