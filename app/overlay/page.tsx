'use client'

import { useCallback, useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'
import { OverlaysItem } from './OverlaysItem'
import { useOverlaysStore } from '@/store/overlayStore'

const DraggableComponent = dynamic(
  () =>
    import('react-draggable').then((mod) => {
      const Draggable = mod.default
      return ({ children, ...props }: any) => {
        const nodeRef = useRef(null)
        return (
          <Draggable {...props} nodeRef={nodeRef}>
            <div ref={nodeRef}>{children}</div>
          </Draggable>
        )
      }
    }),
  { ssr: false }
)

interface Position {
  x: number
  y: number
}

export interface OverlayItem {
  id: string
  position: Position
  component: React.ReactNode
  width: string
  height: string
  scale: number
  visible: boolean
}

export default function OverlayPage() {
  const paramas = useParams()
  const id = paramas?.id as string

  const [gameId, setGameId] = useState<string | null>(id)

  const {
    scoreboardUpOverlay,
    formationOverlay,
    goalsDownOverlay,
    handlePositionOverlay,
  } = useOverlaysStore()

  const overlays = [
    formationOverlay,
    scoreboardUpOverlay,
    goalsDownOverlay
  ]

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleDragStop = useCallback(
    (id: string, data: { x: number; y: number }) => {
      data.y = parseFloat(((data.y / window.innerHeight) * 100).toFixed(2));
      handlePositionOverlay(id, data)
    },
    []
  )

  if (!mounted) {
    return null
  }

  return (
    <div className="relative w-screen h-[calc(100vh)] bg-[#1a472a00] overflow-hidden">
      {overlays.map((item) => {
        let y = (item.y / 100) * window.innerHeight
        return (
          <DraggableComponent
            key={item.id}
            position={{ x: item.x, y: y }}
            // defaultPosition={{ x: item.x, y: item.y }} // Usa `defaultPosition` en lugar de `position`.
            onStop={(_: any, data: any) =>
              handleDragStop(item.id, { x: data.x, y: data.y })
            }
            // bounds="parent"
            handle={item.id.includes('formation') ? undefined : '.drag-handle'}
            disabled={item.id.includes('formation')} // Evita mover el campo.
          >
            <div className="absolute" style={{ width: '100%', height: '100%' }}>
              <div
                style={{ transform: `scale(${item.scale / 100})` }}
                className={`relative transform scale-[${item.scale / 100}]`}
              >
                {!item.id.includes('formation') && (
                  <div className="drag-handle absolute -top-2 left-0 right-0 h-6 bg-white/10 rounded-t cursor-move opacity-0 hover:opacity-100 transition-opacity" />
                )}
                <OverlaysItem item={item} gameId={gameId || ''} />
              </div>
            </div>
          </DraggableComponent>
        )
      })}
    </div>
  )
}
