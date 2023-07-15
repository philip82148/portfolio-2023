import { useEffect, useState } from 'react'

import { NoTransform } from './NoTransform'
import { RotateX } from './RotateX'
import { RotateY } from './RotateY'
import { RotateZ } from './RotateZ'
import { TranslateXL } from './TranslateXL'
import { TranslateXR } from './TranslateXR'
import { TranslateYD } from './TranslateYD'
import { TranslateYU } from './TranslateYU'
import { TranslateZB } from './TranslateZB'
import { TranslateZF } from './TranslateZF'

export type TransformType = React.FC<React.PropsWithChildren<{ durationS: number; state: unknown }>>

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
