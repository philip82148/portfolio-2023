import { Box, Container, Stack, Typography } from '@mui/material'
import React, { cloneElement, forwardRef, useState } from 'react'

import { useIsPC } from '../useIsPC'

import { AutoHeightDivider } from './AutoHeightDivider'

type PersonalHistoryProps = {
  children: React.ReactElement[]
  closedOnMounts: boolean[]
  bgcolor: string
}
const InnerPersonalHistory: React.ForwardRefRenderFunction<HTMLDivElement, PersonalHistoryProps> = (
  { children, closedOnMounts, bgcolor },
  ref: React.Ref<HTMLDivElement>,
) => {
  const [isCloseds, setIsCloseds] = useState<boolean[]>(closedOnMounts)

  let rightAlign = true
  const nextRightAlign = (update: boolean = false): boolean => {
    const nextRightAlign = !rightAlign

    if (update) rightAlign = nextRightAlign
    return nextRightAlign
  }

  const isPC = useIsPC()

  return (
    <Box ref={ref} sx={{ bgcolor }}>
      <Container fixed={isPC} sx={{ pt: 10, pb: 10 }} disableGutters={!isPC}>
        <Stack alignItems="center">
          <Typography fontSize={'1.6rem'} fontWeight={700} sx={{ p: 3, pb: 1, mb: 10 }}>
            ---------- 以下製作中 ----------
          </Typography>
          <Stack sx={{ width: '100%' }}>
            <Typography variant="h2">History</Typography>
          </Stack>
          <Stack divider={isPC && <AutoHeightDivider />} sx={{ width: '100%' }}>
            {children.map((child, i, children) =>
              cloneElement(child, {
                onClick: () => {
                  setIsCloseds((isCloseds) =>
                    children.map((_child, j) => (j === i ? !isCloseds[j] : !!isCloseds[j])),
                  )
                },
                isClosed: isCloseds[i],
                rightAlign: isCloseds[i] ? nextRightAlign() : nextRightAlign(true),
                key: i,
              }),
            )}
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

export const PersonalHistory = forwardRef<HTMLDivElement, PersonalHistoryProps>(
  InnerPersonalHistory,
)
