interface ManagerPlateProps {
  name: string
  primaryColor: string
  secondaryColor: string
}

export default function ManagerPlate({ name, primaryColor, secondaryColor }: ManagerPlateProps) {
  return (
    <div className="flex w-96 items-center">
      {/* Number Container with Angular Design */}
      <div className="relative flex h-10 items-center skew-x-12" style={{backgroundColor: secondaryColor}}>
        {/* Number */}
        <div className="px-3 text-lg uppercase font-bold -skew-x-12" style={{color: primaryColor}}>Manager</div>
        {/* Angular Accent */}
      </div>

      {/* Name Container */}
      <div className="flex h-10 flex-1 items-center justify-center skew-x-12 border-r-8" style={{backgroundColor: primaryColor, borderRightColor: secondaryColor}}>
        <span className="font-bold text-lg uppercase text-center tracking-wide text-white -skew-x-12" style={{color: secondaryColor}}>{name}</span>
      </div>
    </div>
  )
}

