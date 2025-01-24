import { useTeamStore } from '@/store/useTeam'
import FormationSVG from './svg/formation'
import JerseySVG from './svg/jersey'

export const FormationOverlay = () => {
  const formation = useTeamStore((state) => state.homeTeam.formation)
  const teamName = useTeamStore((state) => state.homeTeam.name)
  // Estilo dinámico para las posiciones, ajustado al diseño
  // Estilo dinámico para las posiciones
  const getPositionStyle = (index: number) => {
    const positionMap = [
      { top: '5%', left: '50%' }, // Portero
      { top: '20%', left: '20%' }, // Defensa izquierda
      { top: '20%', left: '40%' }, // Defensa central izquierda
      { top: '20%', left: '60%' }, // Defensa central derecha
      { top: '20%', left: '80%' }, // Defensa derecha
      { top: '50%', left: '20%' }, // Mediocampo izquierdo
      { top: '50%', left: '40%' }, // Mediocampo central izquierda
      { top: '50%', left: '60%' }, // Mediocampo central derecha
      { top: '50%', left: '80%' }, // Mediocampo derecho
      { top: '75%', left: '40%' }, // Delantero izquierda
      { top: '75%', left: '60%' }, // Delantero derecha
    ]
    return positionMap[index] || { top: '50%', left: '50%' }
  }

  return (
    <div className="relative w-full h-full">
      {/* Nombre del equipo */}

      <div className="grid grid-cols-3 grid-rows-1 gap-4">
        <div>1</div>
        <div  className="col-span-2">
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
            {formation.positions.map((position, index) => (
              <div
                key={position.name}
                className="absolute flex flex-col items-center"
                style={{ top: `${position.y}%`, left: `${position.x}%` }}
              >
                {/* Camiseta SVG */}
                <div className="relative">
                  <JerseySVG />
                  {/* Número del jugador */}
                  <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
                    {'?'}
                  </div>
                </div>
                {/* Nombre del jugador */}
                <div className="text-white text-sm font-semibold text-center">
                  {position.name}
                </div>
              </div>
            ))}
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
