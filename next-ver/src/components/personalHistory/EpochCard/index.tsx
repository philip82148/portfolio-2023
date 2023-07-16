import type { TechType } from '../TechTag'
import { useIsPC } from '../useIsPC'

import { EpochCardPC } from './EpochCardPC'
import { EpochCardSP } from './EpochCardSP'

export type EpochCardProps = {
  title: string
  caption?: string
  newTechs?: TechType[]
  rightAlign?: boolean
}
export const EpochCard: React.FC<EpochCardProps> = (props) => {
  const isPC = useIsPC()
  return <>{isPC ? <EpochCardPC {...props} /> : <EpochCardSP {...props} />}</>
}
