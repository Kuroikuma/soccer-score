interface PlayerPlateProps {
  number: number
  name: string
}

export default function PlayerPlate({ number, name }: PlayerPlateProps) {
  let numberString = number.toString().length === 1 ? `0${number}` : number
  return (
    <div className="flex w-64 items-center">
      {/* Number Container with Angular Design */}
      <div className="relative flex h-10 items-center skew-x-12" style={{backgroundColor: "rgba(245,10,10,1)"}}>
        {/* Number */}
        <div className="px-3 text-lg font-bold text-white -skew-x-12">{numberString}</div>
        {/* Angular Accent */}
      </div>

      {/* Name Container */}
      <div className="flex h-10 flex-1 items-center pl-6 border-l-slate-800 border-l-2 skew-x-12 border-r-8" style={{backgroundColor: "rgba(0,0,255,1)", borderRightColor: "rgba(245,10,10,1)"}}>
        <span className="font-bold uppercase tracking-wide text-white -skew-x-12">{name}</span>
      </div>
    </div>
  )
}

