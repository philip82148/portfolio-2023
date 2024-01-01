import { Divider, Stack } from '@mui/material'
import React, { cloneElement, useMemo, useRef, useState } from 'react'

import { WorkCard } from './WorkCard'

type PersonalHistoryProps = {
  children: Array<React.ReactElement<any, React.JSXElementConstructor<any>>>
  closedOnMounts: boolean[]
}
export const HistoryBody: React.FC<PersonalHistoryProps> = ({ children, closedOnMounts }) => {
  let currentRightAlign = false
  const nextRightAlign = (update: boolean): boolean => {
    const nextRightAlign = !currentRightAlign

    if (update) currentRightAlign = nextRightAlign
    return nextRightAlign
  }

  // パフォーマンス改善
  const isCloseds = useRef<boolean[]>(closedOnMounts)
  const setCount_ = useState(0)[1]

  const flipIsClosedFuncs = useMemo(() => {
    const forceUpdate = (): void => {
      setCount_((count) => count + 1)
    }

    return [...Array(children.length)].map((_, i) => () => {
      isCloseds.current[i] = !isCloseds.current[i]
      forceUpdate()
    })
  }, [children.length, setCount_])

  return (
    <Stack sx={{ width: '100%', overflow: 'hidden', mt: { lg: -3, xs: -4 } }}>
      {children.map((child, i) => {
        const isPreviousClosed = i > 0 ? !!isCloseds.current[i - 1] : false
        const isCurrentClosed = !!isCloseds.current[i]

        return (
          <React.Fragment key={i}>
            {i > 0 && (
              <HistoryDivider
                isPreviousClosed={isPreviousClosed}
                isCurrentClosed={isCurrentClosed}
              />
            )}
            {child.type === WorkCard
              ? cloneElement(child, {
                  onClick: flipIsClosedFuncs[i],
                  isClosed: isCurrentClosed,
                  rightAlign: nextRightAlign(!isCurrentClosed),
                })
              : child}
          </React.Fragment>
        )
      })}
    </Stack>
  )
}

// パフォーマンス改善
const HistoryDivider = React.memo<{ isPreviousClosed: boolean; isCurrentClosed: boolean }>(
  ({ isPreviousClosed, isCurrentClosed }) => {
    return (
      <Divider
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
    )
  },
)
HistoryDivider.displayName = 'HistoryDivider'
