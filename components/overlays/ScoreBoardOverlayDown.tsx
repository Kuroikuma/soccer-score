import { useTeamStore } from '@/store/useTeam'

const ScoreBoardDown = () => {
  const { homeTeam, awayTeam } = useTeamStore()
  return (
    <div className="relative font-['Roboto_Condensed'] w-[60vw] min-h-[15vh]">
      <div className=" text-xl font-bold absolute top-[20%] -left-[5%] flex items-center h-[100%] z-10">
        <img
          src="/logoEquipo.png"
          alt="Logo"
          className="h-[15vh] w-full object-contain"
        />
      </div>

      <div className="flex flex-col h-[100%]">
        <div className="min-h-[50%] bg-[rgba(0,7,85,.8)] w-full flex justify-center items-center py-2">
          <div className="flex flex-col items-start justify-center w-[50%] pl-[10%]">
            <span className="text-white text-sm font-bold">9' GOAL !!!!!!</span>
            <span className="text-white text-sm font-bold">9' GOAL !!!!!!</span>
            <span className="text-white text-sm font-bold">9' GOAL !!!!!!</span>
            <span className="text-white text-sm font-bold">9' GOAL !!!!!!</span>
            <span className="text-white text-sm font-bold">9' GOAL !!!!!!</span>
            
          </div>
          <div className="flex flex-col items-end justify-center w-[50%] pr-[10%]">
            <span className="text-white text-sm font-bold">9' GOAL !!!!!!</span>
            <span className="text-white text-sm font-bold">9' GOAL !!!!!!</span>
            <span className="text-white text-sm font-bold">9' GOAL !!!!!!</span>
            <span className="text-white text-sm font-bold">9' GOAL !!!!!!</span>
            <span className="text-white text-sm font-bold">9' GOAL !!!!!!</span>
          </div>
        </div>
        <div className="flex w-full relative h-[50%] bg-[#16348c]">
          <div
            className="absolute -top-[4px] left-0 right-0 h-[4px]"
            style={{
              background: 'linear-gradient(90deg, #0534da 0%, #4bded8 100%)',
            }}
          ></div>
          <div
            className="flex justify-start text-white items-center w-[45%] p-2 pl-[10%] pr-8 border-l-2 border-[#0a41f6]"
            style={{
              background:
                'linear-gradient(90deg, rgba(0,7,85,1) 0%, rgba(0,44,198,1) 100%)',
              clipPath: 'polygon(95% 0, 100% 50%, 95% 100%, 0 100%, 0 0)',
            }}
          >
            <span className="font-bold text-3xl">{homeTeam.name}</span>
          </div>

          {/* Score */}
          <div className="flex items-center justify-center text-white px-6 text-4xl font-bold">
            {homeTeam.score}
          </div>

          <div className="flex items-center justify-center text-white px-6 text-4xl font-bold border-l-2 border-[#0a41f6]">
            {awayTeam.score}
          </div>

          {/* Away Team */}
          <div
            className="flex items-center p-2 pl-8 w-[45%] border-r-2 border-[#0a41f6] justify-end text-white pr-[10%]"
            style={{
              background:
                'linear-gradient(90deg, rgba(0,44,198,1) 0%, rgba(0,7,85,1) 100%)',
              clipPath: 'polygon(100% 0, 100% 100%, 5% 100%, 0 50%, 5% 0)',
            }}
          >
            <span className="font-bold text-3xl">{awayTeam.name}</span>
          </div>
        </div>
      </div>

      <div className=" text-xl font-bold absolute top-[20%] -right-[5%] flex items-center h-[100%]">
        <img
          src="/LogoAway.png"
          alt="Logo"
          className="h-[15vh] w-full object-contain"
        />
      </div>
    </div>
  )
}

export default ScoreBoardDown
