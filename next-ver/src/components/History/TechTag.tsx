import { Chip } from '@mui/material'
import React from 'react'

export type TechType =
  | 'Java'
  | 'PICアセンブラ'
  | 'C'
  | 'C++'
  | 'JavaScript'
  | 'Python'
  | 'HTML'
  | 'CSS'
  | 'jQuery'
  | 'PHP'
  | 'MySQL'
  | 'WordPress'
  | 'Flutter'
  | 'Kotlin'
  | 'TypeScript'
  | 'React'
  | 'Next.js'
  | 'NestJS'
  | 'Shell'
export const TechTag = React.memo<{ techType: TechType; color?: string }>(
  ({ techType, color = 'text.secondary' }) => {
    return <Chip variant="outlined" label={techType} sx={{ color, borderColor: color }} />
  },
)
TechTag.displayName = 'TechTag'
