import type { CSSProperties } from 'react'
import { useEffect, useState } from 'react'

import type { TransformProps, TransformType } from '.'

export const TranslateXL: TransformType = (props) => <Translate axis="X" signature="-" {...props} />
export const TranslateXR: TransformType = (props) => <Translate axis="X" signature="+" {...props} />
export const TranslateYD: TransformType = (props) => <Translate axis="Y" signature="+" {...props} />
export const TranslateYU: TransformType = (props) => <Translate axis="Y" signature="-" {...props} />
export const TranslateZB: TransformType = (props) => <Translate axis="Z" signature="-" {...props} />
export const TranslateZF: TransformType = (props) => <Translate axis="Z" signature="+" {...props} />

const Translate: React.FC<TransformProps & { axis: 'X' | 'Y' | 'Z'; signature: '+' | '-' }> = ({
  children,
  durationS,
  state,
  axis,
  signature,
}) => {
  const [phase, setPhase] = useState(0)

  let style: CSSProperties
  let phaseDurationS: number

  const reversedSignature = { '+': '-', '-': '+' }[signature]
  const abs = { X: '100vw', Y: '100vh', Z: '1000px' }[axis]
  switch (phase) {
    case 0:
      phaseDurationS = 0.1
      style = { transform: `translate${axis}(0)` }
      break
    case 1:
      phaseDurationS = durationS * 0.5
      style = {
        transition: `all ${phaseDurationS}s linear`,
        transform: `translate${axis}(${signature}${abs})`,
      }
      break
    case 2:
      phaseDurationS = 0.1
      style = {
        transform: `translate${axis}(${reversedSignature}${abs})`,
      }
      break
    default:
      phaseDurationS = durationS * 0.5
      style = {
        transition: `all ${phaseDurationS}s linear`,
        transform: `translate${axis}(0)`,
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
