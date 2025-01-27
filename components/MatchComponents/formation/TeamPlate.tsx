interface TeamPlateProps {
  logo: string
  name: string
  primaryColor: string
  secondaryColor: string
}

export default function TeamPlate({ logo, name, primaryColor, secondaryColor }: TeamPlateProps) {
  return (
    <div className="flex w-96 h-36 items-center">
      {/* Number Container with Angular Design */}
      <div className="flex h-10 items-center skew-x-12 w-[40%]" style={{backgroundColor: secondaryColor}}>
        {/* Number */}
        <div className="px-3 text-lg font-bold text-white absolute -skew-x-12">
          <img src="/logoEquipo.png" alt="Logo" className="h-36 w-full object-contain" />
        </div>
        {/* Angular Accent */}
      </div>

      {/* Name Container */}
      <div className="flex h-10 flex-1 items-center justify-center skew-x-12 border-r-8" style={{backgroundColor: primaryColor, borderRightColor: secondaryColor}}>
        <span className="font-bold uppercase text-lg text-center tracking-wide text-white -skew-x-12" style={{color: secondaryColor}}>{name}</span>
      </div>
    </div>
  )
}

