import { Button, ButtonGroup, Divider, Stack } from '@mui/material'
import { Fragment, cloneElement, memo, useCallback, useMemo, useState } from 'react'

import { WorkCard } from './WorkCard'

type PersonalHistoryProps = {
  children: Array<React.ReactElement<any, React.JSXElementConstructor<any>>>
  closedOnMounts?: boolean[]
}
export const HistoryBody: React.FC<PersonalHistoryProps> = ({ children, closedOnMounts }) => {
  let currentRightAlign = false
  const nextRightAlign = (update: boolean): boolean => {
    const nextRightAlign = !currentRightAlign

    if (update) currentRightAlign = nextRightAlign
    return nextRightAlign
  }

  const [isCloseds, setIsCloseds] = useState<boolean[]>(closedOnMounts ?? [])

  const flipIsClosedFuncs = useMemo(() => {
    return [...Array(children.length)].map((_, i) => () => {
      setIsCloseds((isCloseds) => {
        const newIsCloseds = [...isCloseds]
        newIsCloseds[i] = !isCloseds[i]

        return newIsCloseds
      })
    })
  }, [children.length])

  const onAllClick = useCallback(() => {
    setIsCloseds(Array(children.length).fill(false))
  }, [children.length])

  const onProgrammingClick = useCallback(() => {
    setIsCloseds(
      children.map((child) => child.type === WorkCard && child.props.type !== 'programming'),
    )
  }, [children])

  const onNonProgrammingClick = useCallback(() => {
    setIsCloseds(
      children.map((child) => child.type === WorkCard && child.props.type === 'programming'),
    )
  }, [children])

  return (
    <Stack alignItems="center" sx={{ width: '100%' }}>
      {/* <Box sx={{ color: '#777' }}> */}
      <ButtonGroup variant="outlined" sx={{ mb: 3 }}>
        <Button onClick={onAllClick}>All</Button>
        <Button onClick={onProgrammingClick}>Programming</Button>
        <Button onClick={onNonProgrammingClick}>Non-Programming</Button>
      </ButtonGroup>
      {/* </Box> */}
      <Stack sx={{ width: '100%', overflow: 'hidden', mt: { lg: -3, xs: -4 } }}>
        {children.map((child, i) => {
          const isPreviousClosed = i > 0 ? !!isCloseds[i - 1] : false
          const isCurrentClosed = !!isCloseds[i]

          return (
            <Fragment key={i}>
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
            </Fragment>
          )
        })}
      </Stack>
    </Stack>
  )
}

// パフォーマンス改善
const HistoryDivider = memo<{ isPreviousClosed: boolean; isCurrentClosed: boolean }>(
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
