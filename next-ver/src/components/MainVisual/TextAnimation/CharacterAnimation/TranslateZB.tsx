import type { CSSProperties } from 'react'
import { useEffect, useState } from 'react'

import type { TransformType } from '.'

export const TranslateZB: TransformType = ({ children, durationS, state }) => {
  const [phase, setPhase] = useState(0)

  let style: CSSProperties
  let phaseDurationS: number

  switch (phase) {
    case 0:
      phaseDurationS = 0
      style = { transform: `translateZ(0)` }
      break
    case 1:
      phaseDurationS = durationS * 0.5
      style = {
        transition: `all ${phaseDurationS}s linear`,
        transform: `translateZ(-1000px)`,
      }
      break
    case 2:
      phaseDurationS = 0.1
      style = {
        transform: `translateZ(1000px)`,
      }
      break
    default:
      phaseDurationS = durationS * 0.5
      style = {
        transition: `all ${phaseDurationS}s linear`,
        transform: `translateZ(0)`,
      }
      break
  }

  useEffect(() => {
    if (phase < 4)
      setTimeout(() => {
        setPhase((phase) => phase + 1)
      }, phaseDurationS * 1000)
  }, [phase, phaseDurationS])

  useEffect(() => {
    setPhase(0)
  }, [state])

  return <span style={{ display: 'inline-block', whiteSpace: 'pre', ...style }}>{children}</span>
}
