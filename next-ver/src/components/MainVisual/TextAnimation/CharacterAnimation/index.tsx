import { useLayoutEffect, useState } from 'react'

import { NoTransform } from './NoTransform'
import { RotateX } from './RotateX'
import { RotateY } from './RotateY'
import { RotateZ } from './RotateZ'

export type TransformType = React.FC<React.PropsWithChildren<{ durationS: number }>>

export const CharacterAnimation: React.FC<{ children: string; durationS: number; state: any }> = ({
  children,
  durationS,
  state,
}) => {
  const [randomNo, setRandomNo] = useState(0)

  useLayoutEffect(() => {
    setRandomNo(Math.floor(4 * Math.random()))
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
  }
}
