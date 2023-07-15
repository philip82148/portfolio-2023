import type { TransformType } from '..'
import { TranslateXL } from '../TranslateXL'

export const HoppingL: TransformType = ({ children, durationS, state }) => {
  return (
    <TranslateXL durationS={durationS} state={state}>
      {children}
    </TranslateXL>
  )
}
