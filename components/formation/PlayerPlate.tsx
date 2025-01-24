interface PlayerPlateProps {
  number: number
  name: string
  primaryColor: string
  secondaryColor: string
}

export default function PlayerPlate({ number, name, primaryColor, secondaryColor }: PlayerPlateProps) {
  let numberString = number.toString().length === 1 ? `0${number}` : number
  return (
    <div className="flex w-64 items-center">
      {/* Number Container with Angular Design */}
      <div className="relative flex h-10 items-center skew-x-12" style={{backgroundColor: secondaryColor}}>
        {/* Number */}
        <div className="px-3 text-lg font-bold -skew-x-12" style={{color: primaryColor}}>{numberString}</div>
        {/* Angular Accent */}
      </div>

      {/* Name Container */}
      <div className="flex h-10 flex-1 items-center pl-6 border-l-slate-800 border-l-2 skew-x-12 border-r-8" style={{backgroundColor: primaryColor, borderRightColor: secondaryColor}}>
        <span className="font-bold uppercase tracking-wide -skew-x-12" style={{color: secondaryColor}}>{name}</span>
      </div>
    </div>
  )
}

