import { Divider, Stack } from '@mui/material'
import React, { cloneElement, useState } from 'react'

type PersonalHistoryProps = {
  children: Array<React.ReactElement<any, React.JSXElementConstructor<any>>>
  closedOnMounts: boolean[]
}
export const HistoryBody: React.FC<PersonalHistoryProps> = ({ children, closedOnMounts }) => {
  const [isCloseds, setIsCloseds] = useState<boolean[]>(closedOnMounts)

  let currentRightAlign = false
  const nextRightAlign = (update: boolean): boolean => {
    const nextRightAlign = !currentRightAlign

    if (update) currentRightAlign = nextRightAlign
    return nextRightAlign
  }

  return (
    <Stack sx={{ width: '100%', overflow: 'hidden' }}>
      {children.map((child, i, children) => {
        const isPreviousClosed = i > 0 ? !!isCloseds[i - 1] : false
        const isCurrentClosed = !!isCloseds[i]

        return (
          <React.Fragment key={i}>
            {i > 0 && (
              <Divider
                key={2 * i}
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
            {child.type.name === 'WorkCard'
              ? cloneElement(child, {
                  onClick: () => {
                    setIsCloseds((isCloseds) =>
                      children.map((_child, j) => (j === i ? !isCloseds[j] : !!isCloseds[j])),
                    )
                  },
                  isClosed: isCurrentClosed,
                  rightAlign: nextRightAlign(!isCurrentClosed),
                  key: 2 * i + 1,
                })
              : child}
          </React.Fragment>
        )
      })}
    </Stack>
  )
}
