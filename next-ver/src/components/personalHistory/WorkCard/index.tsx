import type { TechType } from '../TechTag'

import { WorkCardPC } from './WorkCardPC'

export type WorkCardProps = {
  title: string
  imageSrc: string
  url?: string
  demoUrl?: string
  caption: string
  techs: TechType[]
  closeOnMount?: boolean
  rightAlign?: boolean
}
export const WorkCard: React.FC<WorkCardProps> = (props) => {
  return <WorkCardPC {...props} />
}
