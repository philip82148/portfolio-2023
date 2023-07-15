import type { CSSProperties } from 'react'
import { useEffect, useRef, useState } from 'react'

import type { TransformType } from '.'

export const RotateZ: TransformType = ({ children, durationS, state }) => {
  const [phase, setPhase] = useState(0)
  const degree = useRef(0)

  let style: CSSProperties
  let phaseDurationS: number

  switch (phase) {
    case 0:
      phaseDurationS = 0
      degree.current = 0
      style = { transform: `rotateZ(0deg)` }
      break
    case 1:
      phaseDurationS = durationS
      degree.current = 360 * phaseDurationS
      style = {
        transition: `all ${phaseDurationS}s cubic-bezier(0.4, 0, 0.2, 1)`,
        transform: `rotateZ(${degree.current}deg)`,
      }
      break
    default:
      phaseDurationS = 0
      style = { transform: `rotateZ(0deg)` }
      break
  }

  useEffect(() => {
    if (phase < 2)
      setTimeout(() => {
        setPhase((phase) => phase + 1)
      }, phaseDurationS * 1000)
  }, [phase, phaseDurationS])

  useEffect(() => {
    setPhase(0)
  }, [state])

  return <span style={{ display: 'inline-block', whiteSpace: 'pre', ...style }}>{children}</span>
}
