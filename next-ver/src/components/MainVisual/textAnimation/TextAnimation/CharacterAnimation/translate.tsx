import { useEffect } from 'react'

import { usePhase } from './usePhase'

import type { TransformProps, TransformType } from '.'

export const TranslateXL: TransformType = (props) => (
  <Translate axis="X" direction="negative" {...props} />
)
export const TranslateXR: TransformType = (props) => (
  <Translate axis="X" direction="positive" {...props} />
)
export const TranslateYD: TransformType = (props) => (
  <Translate axis="Y" direction="positive" {...props} />
)
export const TranslateYU: TransformType = (props) => (
  <Translate axis="Y" direction="negative" {...props} />
)
export const TranslateZB: TransformType = (props) => (
  <Translate axis="Z" direction="negative" {...props} />
)
export const TranslateZF: TransformType = (props) => (
  <Translate axis="Z" direction="positive" {...props} />
)

const Translate: React.FC<
  TransformProps & { axis: 'X' | 'Y' | 'Z'; direction: 'positive' | 'negative' }
> = ({ children, durationS, state, axis, direction }) => {
  const { phase, spanRef, setPhase } = usePhase()

  const animationNamePrefix = `translate${axis}${direction}${String(durationS).substring(2)}`
  let animation: string

  switch (phase) {
    case 0:
      animation = `${durationS * 0.5}s linear 0s both ${animationNamePrefix}phase0`
      break
    case 1:
      animation = `${durationS * 0.5}s linear 0s both ${animationNamePrefix}phase1`
      break
    default:
      animation = 'none'
      break
  }

  useEffect(() => {
    setPhase(0)
  }, [state, setPhase])

  const signature = { positive: '', negative: '-' }[direction]
  const reversedSignature = { positive: '-', negative: '' }[direction]
  const abs = { X: '100vw', Y: '100vh', Z: '1000px' }[axis]

  return (
    <>
      <span ref={spanRef} style={{ display: 'inline-block', whiteSpace: 'pre', animation }}>
        {children}
      </span>
      <style jsx>{`
        @keyframes ${animationNamePrefix}phase0 {
          from {
            transform: ${'translate' + axis}(0);
          }
          to {
            transform: ${'translate' + axis}(${signature}${abs});
          }
        }

        @keyframes ${animationNamePrefix}phase1 {
          from {
            transform: ${'translate' + axis}(${reversedSignature}${abs});
          }
          to {
            transform: ${'translate' + axis}(0);
          }
        }
      `}</style>
    </>
  )
}
