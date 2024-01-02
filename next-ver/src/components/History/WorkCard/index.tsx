import React from 'react'

import type { TechType } from '../TechTag'

import { WorkCardPC } from './WorkCardPC'
import { WorkCardSP } from './WorkCardSP'

import { useIsPC } from '@/lib/useIsPC'

export type WorkCardProps = {
  type: WorkCardType
  title: string
  imageSrc: string
  url?: string
  demoUrl?: string
  caption: React.ReactNode
  techs?: TechType[]
  isClosed?: boolean
  rightAlign?: boolean
  onClick?: () => void
}
export type WorkCardSPProps = Omit<WorkCardProps, 'rightAlign'>

export type WorkCardType = 'programming' | 'electronics' | 'craft'

export const WorkCard = React.memo<WorkCardProps>((props) => {
  const isPC = useIsPC()
  const { rightAlign: _, ...propsForSP } = props

  return <>{isPC ? <WorkCardPC {...props} /> : <WorkCardSP {...propsForSP} />}</>
})
WorkCard.displayName = 'WorkCard'
