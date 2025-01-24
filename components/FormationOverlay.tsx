import { useTeamStore } from '@/store/useTeam'
import FormationSVG from './svg/formation'
import JerseySVG from './svg/jersey'
import PlayerPlate from './formation/PlayerPlate'
import TeamPlate from './formation/TeamPlate'

export const FormationOverlay = () => {
  const formation = useTeamStore((state) => state.homeTeam.formation)
  const teamHome = useTeamStore((state) => state.homeTeam)
  const players = useTeamStore((state) => state.homeTeam.players)
  const teamName = teamHome.name

  return (
    <div className="relative w-full h-full font-['Roboto_Condensed']">
      {/* Nombre del equipo */}

      <div className="grid grid-cols-3 grid-rows-1 gap-4">
        <div className="flex flex-col items-center justify-between">
          <TeamPlate logo="/logoEquipo.svg" name={teamName} primaryColor={teamHome.primaryColor} secondaryColor={teamHome.secondaryColor} />
          <div className="flex flex-col gap-1">
            {players.map((player, index) => (
              <PlayerPlate
                key={index}
                number={player.number}
                name={player.name}
                primaryColor={teamHome.primaryColor}
                secondaryColor={teamHome.secondaryColor}
              />
            ))}
          </div>
        </div>
        <div className="col-span-2">
          {/* <div className="text-center text-white text-2xl font-bold mb-4">
            {teamName}
          </div> */}

          {/* Campo de fútbol */}
          {/* Campo de fútbol */}
          <div className="relative w-full h-[calc(100vh)] bg-green-700 rounded-lg border-4 border-white">
            {/* Líneas del campo */}
            <div className="absolute inset-0 flex flex-col">
              <FormationSVG />
            </div>

            {/* Posiciones de los jugadores */}
            {formation.positions.map((position, index) => {
              const player = players.find(
                (player) => player.position === position.name
              )
              return (
                <div
                  key={position.name}
                  className="absolute flex flex-col items-center"
                  style={{ top: `${position.y}%`, left: `${position.x}%` }}
                >
                  {/* Camiseta SVG */}
                  <div className="relative">
                    <JerseySVG primaryColor={teamHome.primaryColor} secondaryColor={teamHome.secondaryColor} />
                    {/* Número del jugador */}
                    <div className="absolute inset-0 flex items-center justify-center text-black font-bold text-xl">
                      {player?.number ?? '?'}
                    </div>
                  </div>
                  {/* Nombre del jugador */}
                  <div className="text-black text-sm font-semibold text-center">
                    {player?.name ?? 'Sin asignar'}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Nombre del entrenador */}
          {/* <div className="mt-4 text-center text-white text-lg font-semibold">
            Junior
          </div> */}
        </div>
      </div>
    </div>
  )
}
