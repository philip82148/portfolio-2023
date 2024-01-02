import type { SxProps, Theme } from '@mui/material'
import { Box } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'

export const MovableCard: React.FC<
  React.PropsWithChildren<{
    align?: 'left' | 'center-start' | 'right'
    outerSx?: SxProps<Theme>
    innerSx?: SxProps<Theme>
  }>
> = ({ align = 'left', children, outerSx, innerSx }) => {
  const [mlForRightAlign, setMlForRightAlign] = useState<number>()
  const [mlForCenterAlign, setMlForCenterAlign] = useState<number>()

  const parentBoxRef = useRef<HTMLDivElement>(null)
  const childBoxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onResize = (): void => {
      if (!parentBoxRef.current || !childBoxRef.current) return

      const { clientWidth: parentWidth } = parentBoxRef.current
      const { offsetWidth: childWidth } = childBoxRef.current

      setMlForRightAlign(parentWidth - childWidth)
      setMlForCenterAlign(parentWidth / 2)
    }

    onResize()
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const mlNum = { left: 0, 'center-start': mlForCenterAlign, right: mlForRightAlign }[align]
  const ml = typeof mlNum === 'number' ? `${mlNum}px` : 'auto'
  const mr = typeof mlNum === 'number' ? `-${mlNum}px` : 'auto'

  return (
    <Box ref={parentBoxRef} sx={{ width: '100%', ...outerSx }}>
      <Box
        ref={childBoxRef}
        sx={{
          transition: 'margin-left 1s',
          ml,
          mr,
          ...innerSx,
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
