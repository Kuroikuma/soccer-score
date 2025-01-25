import { AwayScore } from './AwayScore'
import { HomeScore } from './HomeScore'

export function Score() {
  return (
    <div className="flex h-[50%] bg-[#16348c]">
      <HomeScore />

      <AwayScore />
    </div>
  )
}
