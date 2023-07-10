import { Box, Fade, Link, Paper, Stack, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

import type { TechType } from './TechTag'
import { TechTag } from './TechTag'

export const WorkCard: React.FC<{
  rightAlign?: boolean
  title: string
  url?: string
  demoUrl?: string
  imageSrc: string
  caption: string
  tags?: TechType[]
  closeOnMount?: boolean
}> = ({ rightAlign, title, url, imageSrc, caption, tags, closeOnMount }) => {
  const [isOpen, setIsOpen] = useState(!closeOnMount)
  const [boxHeight, setBoxHeight] = useState<number>()
  const [titlePosition, setTitlePosition] = useState<{
    top: number | string
    left: number | string
  }>({
    top: '50%',
    left: '50%',
  })

  const boxRef = useRef<HTMLDivElement>(null)
  const paperRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLAnchorElement>(null)

  const openOrClose = (open: boolean): void => {
    if (open) {
      // open
      setIsOpen(true)
      if (paperRef.current) setBoxHeight(paperRef.current.offsetHeight)
      if (titleRef.current) {
        const { offsetTop: top, offsetLeft: left } = titleRef.current
        setTitlePosition({ top, left })
      }
    } else {
      // close
      setIsOpen(false)
      if (boxRef.current && titleRef.current) {
        const { offsetWidth: boxWidth } = boxRef.current
        const { offsetWidth: titleWidth, offsetHeight: titleHeight } = titleRef.current
        setBoxHeight(titleHeight)
        setTitlePosition({ top: 0, left: (boxWidth - titleWidth) / 2 })
      }
    }
  }

  useEffect(() => {
    openOrClose(!closeOnMount)
  }, [closeOnMount])

  return (
    <Box
      ref={boxRef}
      sx={{
        transition: 'all 1s',
        position: 'relative',
        height: boxHeight,
        fontSize: '1.6rem',
      }}
    >
      <Link
        onClick={(e) => {
          if (!isOpen) {
            e.preventDefault()
            openOrClose(true)
          }
        }}
        href={url}
        target="_blank"
        sx={{
          transition: 'all 1s',
          color: 'text.primary',
          fontWeight: 700,
          textDecoration: 'none',
          cursor: !isOpen || url ? 'pointer' : 'unset',
          position: 'absolute',
          zIndex: 1,
          ...titlePosition,
          maxWidth: '100%',
        }}
      >
        {title}
      </Link>
      <Fade in={isOpen} timeout={1000}>
        <Paper
          ref={paperRef}
          elevation={2}
          sx={{
            borderRadius: 5,
            bgcolor: '#fff',
            ml: rightAlign ? 'auto' : 0,
            mr: !rightAlign ? 'auto' : 0,
            p: 4,
            width: 1000,
            maxWidth: '100%',
          }}
          onClick={() => {
            openOrClose(!isOpen)
          }}
        >
          <Stack direction={rightAlign ? 'row-reverse' : 'row'} justifyContent="space-between">
            <Stack justifyContent="space-between" sx={{ width: 600, maxWidth: '100%' }}>
              <Box>
                <Link ref={titleRef} sx={{ visibility: 'hidden' }}>
                  {title}
                </Link>
                <Typography>{caption}</Typography>
              </Box>
              <Stack direction="row" spacing={1}>
                {tags?.map((tag, i) => <TechTag key={i} techType={tag} />)}
              </Stack>
            </Stack>
            <Box
              sx={{
                position: 'relative',
                height: 200,
                borderRadius: 3,
                overflow: 'hidden',
              }}
            >
              <img src={imageSrc} alt={title} style={{ height: '100%' }} />
            </Box>
          </Stack>
        </Paper>
      </Fade>
    </Box>
  )
}
