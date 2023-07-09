import type { TransformType } from '..'

import { TranslateX } from './TranslateX'

export const Hopping: TransformType = ({ children, durationS }) => {
  return <TranslateX durationS={durationS}>{children}</TranslateX>
}
