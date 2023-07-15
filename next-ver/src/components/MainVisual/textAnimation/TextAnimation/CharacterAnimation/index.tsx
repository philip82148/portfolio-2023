import { useEffect, useState } from 'react'

import { NoTransform } from './NoTransform'
import { RotateX, RotateY, RotateZ } from './rotate'
import {
  TranslateXL,
  TranslateXR,
  TranslateYD,
  TranslateYU,
  TranslateZB,
  TranslateZF,
} from './translate'

export type TransformProps = React.PropsWithChildren<{ durationS: number; state: unknown }>
export type TransformType = React.FC<TransformProps>

export const CharacterAnimation: React.FC<{
  children: string
  durationS: number
  state: unknown
}> = ({ children, durationS, state }) => {
  const [randomNo, setRandomNo] = useState(0)

  useEffect(() => {
    setRandomNo(Math.floor(Math.random() * 10))
  }, [state])

  const Transform: TransformType = [
    NoTransform,
    RotateX,
    RotateY,
    RotateZ,
    TranslateXL,
    TranslateXR,
    TranslateYU,
    TranslateYD,
    TranslateZF,
    TranslateZB,
  ][randomNo]

  return (
    <Transform durationS={durationS} state={state}>
      {children}
    </Transform>
  )
}
