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

export type TransformType = React.FC<React.PropsWithChildren<{ durationS: number }>>

export const CharacterAnimation: React.FC<{
  children: string
  durationS: number
  state: unknown
}> = ({ children, durationS, state }) => {
  const [randomNo, setRandomNo] = useState(0)

  useEffect(() => {
    setRandomNo(Math.floor(Math.random() * 10))
  }, [state])

  switch (randomNo) {
    case 0:
      return <NoTransform durationS={durationS}>{children}</NoTransform>
    case 1:
      return <RotateX durationS={durationS}>{children}</RotateX>
    case 2:
      return <RotateY durationS={durationS}>{children}</RotateY>
    case 3:
      return <RotateZ durationS={durationS}>{children}</RotateZ>
    case 4:
      return <TranslateXL durationS={durationS}>{children}</TranslateXL>
    case 5:
      return <TranslateXR durationS={durationS}>{children}</TranslateXR>
    case 6:
      return <TranslateYU durationS={durationS}>{children}</TranslateYU>
    case 7:
      return <TranslateYD durationS={durationS}>{children}</TranslateYD>
    case 8:
      return <TranslateZF durationS={durationS}>{children}</TranslateZF>
    case 9:
      return <TranslateZB durationS={durationS}>{children}</TranslateZB>
  }
}
