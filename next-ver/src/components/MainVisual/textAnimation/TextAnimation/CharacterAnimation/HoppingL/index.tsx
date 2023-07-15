import type { TransformType } from '..'
import { TranslateXL } from '../translate'

export const HoppingL: TransformType = ({ children, durationS, state }) => {
  return (
    <TranslateXL durationS={durationS} state={state}>
      {children}
    </TranslateXL>
  )
}
