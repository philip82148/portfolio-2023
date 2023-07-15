import type { CSSProperties } from 'react'
import { useEffect, useState } from 'react'

import type { TransformType } from '.'

export const RotateY: TransformType = ({ children, durationS, state }) => {
  const [phase, setPhase] = useState(0)

  let style: CSSProperties
  let phaseDurationS: number
  let degree: number

  switch (phase) {
    case 0:
      phaseDurationS = 0
      style = { transform: `rotateY(0deg)` }
      break
    default:
      phaseDurationS = durationS
      degree = 360 * Math.round(phaseDurationS)
      style = {
        transition: `all ${phaseDurationS}s cubic-bezier(0.4, 0, 0.2, 1)`,
        transform: `rotateY(${degree}deg)`,
      }
      break
  }

  useEffect(() => {
    if (phase < 1)
      setTimeout(() => {
        setPhase((phase) => phase + 1)
      }, phaseDurationS * 1000)
  }, [phase, phaseDurationS])

  useEffect(() => {
    setPhase(0)
  }, [state])

  return <span style={{ display: 'inline-block', whiteSpace: 'pre', ...style }}>{children}</span>
}
