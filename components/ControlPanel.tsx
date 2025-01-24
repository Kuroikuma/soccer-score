"use client"

import { useEffect, useCallback } from "react"
import { Tabs } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { TabTeamSetup } from "./TeamManagement"
import { TabMatchEvents } from "./MatchEventsAndSubs"
import { TabControlPanel } from "./ControlPanel/TabControlPanel"
import { TabContentScore } from "./ControlPanel/Score"
import { TabContentMatchTime } from "./ControlPanel/TabContentMatchTime"
import { TabTeamCustomize } from "./ControlPanel/TabTeamCustomize"
import './styles.scss';
import { useTimeStore } from "@/store/useTime"

export function ControlPanel() {
  const { time, updateTime } = useTimeStore()

  const updateMatchTime = useCallback(() => {
    if (time.seconds + 1 >= 60) {
      updateTime({
        minutes: time.minutes + 1,
        seconds: 0,
      })
    } else {
      updateTime({
        minutes: time.minutes,
        seconds: time.seconds + 1,
      })
    }
  }, [time.minutes, time.seconds, updateTime])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (time.isRunning) {
      interval = setInterval(updateMatchTime, 1000)
    }
    return () => clearInterval(interval)
  }, [time.isRunning, updateMatchTime])

  return (
    <Card className="w-full bg-[#1a1625]">
      <Tabs defaultValue="score" className="w-full text-white">
        <TabControlPanel />
      
        <TabContentScore  />
        <TabContentMatchTime />
        <TabTeamSetup />
        <TabMatchEvents />
        <TabTeamCustomize />
      </Tabs>
    </Card>
  )
}



      
     
    

      

    

      

    

      

    