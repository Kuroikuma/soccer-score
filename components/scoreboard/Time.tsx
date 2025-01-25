import { useTimeStore } from '@/store/useTime'

export function Time() {
  const { time, period } = useTimeStore()
  const activePeriod = period.find((p) => p.active)?.name || '1st Half'

  const formatTime = (minutes: number, seconds: number) => {
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0'
    )}`
  }

  return (
    <div className="flex flex-col items-center justify-start gap-1">
      <div
        className="flex items-center h-[50%] justify-center bg-white text-2xl font-bold px-4 "
        style={{ color: '#00003d' }}
      >
        {formatTime(time.minutes, time.seconds)}
      </div>
      {time.stoppage > 0 && (
        <div
          className="flex items-center h-[50px] bg-white text-2xl font-bold"
          style={{ color: '#00003d' }}
        >
          +{time.stoppage}
        </div>
      )}
    </div>
  )
}
