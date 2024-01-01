import type { SxProps, Theme } from '@mui/material'
import { Box } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

export const MovableCard: React.FC<
  React.PropsWithChildren<{
    align?: 'left' | 'center-start' | 'right'
    outerSx?: SxProps<Theme>
    innerSx?: SxProps<Theme>
  }>
> = ({ align = 'left', children, outerSx, innerSx }) => {
  const [marginLeft, setMarginLeft] = useState<number>()

  const parentBoxRef = useRef<HTMLDivElement>(null)
  const childBoxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onResize = (): void => {
      if (align === 'left') {
        setMarginLeft(0)
        return
      }

      if (!parentBoxRef.current || !childBoxRef.current) return

      const { clientWidth: parentWidth } = parentBoxRef.current
      const { offsetWidth: childWidth } = childBoxRef.current

      if (align === 'right') {
        setMarginLeft(parentWidth - childWidth)
      } else {
        setMarginLeft(parentWidth / 2)
      }
    }

    onResize()
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [align])

  return (
    <Box sx={{ width: '100%', ...outerSx }}>
      <Box ref={parentBoxRef} sx={{ width: '100%', height: '100%' }}>
        <Box
          ref={childBoxRef}
          sx={{
            width: 'min-content',
            transition: 'margin-left 1s',
            ml: typeof marginLeft === 'number' ? `${marginLeft}px` : 'auto',
            mr: typeof marginLeft === 'number' ? `-${marginLeft}px` : 'auto',
            ...innerSx,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}
