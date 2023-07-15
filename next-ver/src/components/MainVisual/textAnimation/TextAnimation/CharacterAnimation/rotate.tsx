import { useEffect } from 'react'

import { usePhase } from './usePhase'

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
  const { phase, spanRef, setPhase } = usePhase()

  const animationNamePrefix = `rotate${axis}${String(durationS).substring(2)}`
  let animation: string

  switch (phase) {
    default:
      animation = `${durationS}s cubic-bezier(0.4, 0, 0.2, 1) 0s both ${animationNamePrefix}phase0`
      break
  }

  useEffect(() => {
    setPhase(0)
  }, [state, setPhase])

  return (
    <>
      <span ref={spanRef} style={{ display: 'inline-block', whiteSpace: 'pre', animation }}>
        {children}
      </span>
      <style jsx>{`
        @keyframes ${animationNamePrefix}phase0 {
          from {
            transform: ${'rotate' + axis}(0);
          }
          to {
            transform: ${'rotate' + axis}(${360 * Math.floor(durationS)}deg);
          }
        }
      `}</style>
    </>
  )
}
