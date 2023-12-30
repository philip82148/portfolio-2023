import { Divider, Stack } from '@mui/material'
import React, { cloneElement, useState } from 'react'

type PersonalHistoryProps = {
  children: React.ReactElement[]
  closedOnMounts: boolean[]
}
export const HistoryBody: React.FC<PersonalHistoryProps> = ({ children, closedOnMounts }) => {
  const [isCloseds, setIsCloseds] = useState<boolean[]>(closedOnMounts)

  let rightAlign = true
  const nextRightAlign = (update: boolean = false): boolean => {
    const nextRightAlign = !rightAlign

    if (update) rightAlign = nextRightAlign
    return nextRightAlign
  }

  return (
    <Stack sx={{ width: '100%' }}>
      {children.map((child, i, children) => {
        const isPreviousClosed = i > 0 ? !!isCloseds[i - 1] : false
        const isCurrentClosed = !!isCloseds[i]

        return (
          <React.Fragment key={i}>
            {i > 0 && (
              <Divider
                key={i}
                orientation="vertical"
                flexItem
                sx={[
                  {
                    transition: 'all 1s',
                    height: 40,
                    m: '0 auto',
                    borderRight: 2,
                    borderColor: '#e0e0e0',
                    zIndex: -1,
                  },
                  isPreviousClosed && { mt: 1 },
                  isCurrentClosed && { mb: 1 },
                  isPreviousClosed && isCurrentClosed && { height: 0, mt: 0.5, mb: 0.5 },
                ]}
              />
            )}
            {cloneElement(child, {
              onClick: () => {
                setIsCloseds((isCloseds) =>
                  children.map((_child, j) => (j === i ? !isCloseds[j] : !!isCloseds[j])),
                )
              },
              isClosed: isCurrentClosed,
              rightAlign: isCurrentClosed ? nextRightAlign() : nextRightAlign(true),
              key: i,
            })}
          </React.Fragment>
        )
      })}
    </Stack>
  )
}
