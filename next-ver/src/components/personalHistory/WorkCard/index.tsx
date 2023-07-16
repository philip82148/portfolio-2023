import type { TechType } from '../TechTag'
import { useIsPC } from '../useIsPC'

import { WorkCardPC } from './WorkCardPC'
import { WorkCardSP } from './WorkCardSP'

export type WorkCardProps = {
  title: string
  imageSrc: string
  url?: string
  demoUrl?: string
  caption: string
  techs: TechType[]
  isClosed?: boolean
  rightAlign?: boolean
  onClick?: () => void
}
export const WorkCard: React.FC<WorkCardProps> = (props) => {
  const isPC = useIsPC()
  return <>{isPC ? <WorkCardPC {...props} /> : <WorkCardSP {...props} />}</>
}
