import { useTeamStore } from '@/store/useTeam'

export function AwayScore() {
  const { awayTeam } = useTeamStore()
  return (
    <>
      <div className="flex items-center justify-center text-white px-6 text-3xl font-bold border-l-2 border-[#0a41f6]">
        {awayTeam.score}
      </div>

      {/* Away Team */}
      <div
        className="flex items-center p-2 pr-4 pl-8 border-r-2 border-[#0a41f6]"
        style={{
          background:
            'linear-gradient(90deg, rgba(0,44,198,1) 0%, rgba(0,7,85,1) 100%)',
          clipPath: 'polygon(100% 0, 100% 100%, 10% 100%, 0 50%, 10% 0)',
        }}
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
