import type { CSSProperties } from 'react'
import { useEffect, useState } from 'react'

import type { TransformProps, TransformType } from '.'

export const RotateX: TransformType = (props) => <Rotate axis="X" {...props} />
export const RotateY: TransformType = (props) => <Rotate axis="Y" {...props} />
export const RotateZ: TransformType = (props) => <Rotate axis="Z" {...props} />

const Rotate: React.FC<TransformProps & { axis: 'X' | 'Y' | 'Z' }> = ({
  children,
  durationS,
  state,
  axis,
}) => {
  const [phase, setPhase] = useState(0)

  let style: CSSProperties
  let phaseDurationS: number
  let degree: number

  switch (phase) {
    case 0:
      phaseDurationS = 0.1
      style = { transform: `rotate${axis}(0deg)` }
      break
    default:
      phaseDurationS = durationS
      degree = 360 * Math.round(phaseDurationS)
      style = {
        transition: `all ${phaseDurationS}s cubic-bezier(0.4, 0, 0.2, 1)`,
        transform: `rotate${axis}(${degree}deg)`,
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
