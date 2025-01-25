import { useTeamStore } from '@/store/useTeam'

export function HomeScore() {
  const { homeTeam } = useTeamStore()
  return (
    <>
      <div className="flex flex-col h-full w-3">
        <div
          className={`h-[50%] w-full`}
          style={{ background: homeTeam.primaryColor }}
        ></div>
        <div
          className={`h-[50%] w-full`}
          style={{ background: homeTeam.secondaryColor }}
        ></div>
      </div>
      <div
        className="flex items-center p-2 pl-4 pr-8 border-l-2 border-[#0a41f6]"
        style={{
          background:
            'linear-gradient(90deg, rgba(0,7,85,1) 0%, rgba(0,44,198,1) 100%)',
          clipPath: 'polygon(90% 0, 100% 50%, 90% 100%, 0 100%, 0 0)',
        }}
      >
        <span className="font-bold text-xl">{homeTeam.name}</span>
      </div>

      {/* Score */}
      <div className="flex items-center justify-center text-white px-6 text-3xl font-bold">
        {homeTeam.score}
      </div>
    </>
  )
}
