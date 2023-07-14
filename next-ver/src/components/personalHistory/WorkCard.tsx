import { Box, Fade, Link, Paper, Stack, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

import type { TechType } from './TechTag'
import { TechTag } from './TechTag'

export const WorkCard: React.FC<{
  title: string
  url?: string
  demoUrl?: string
  caption: string
  imageSrc: string
  techs: TechType[]
  closeOnMount?: boolean
  rightAlign?: boolean
}> = ({ title, url, imageSrc, caption, techs, closeOnMount, rightAlign }) => {
  const [isOpen, setIsOpen] = useState(!closeOnMount)
  const [boxHeight, setBoxHeight] = useState<number>()
  const [dummyTitlePosition, setDummyTitlePosition] = useState<{
    top: number
    left: number | string
  }>({ top: 0, left: '50%' })

  const boxRef = useRef<HTMLDivElement>(null)
  const paperRef = useRef<HTMLDivElement>(null)
  const dummyTitleRef = useRef<HTMLAnchorElement>(null)

  const openOrClose = (open: boolean): void => {
    if (open) {
      // open
      setIsOpen(true)
      if (paperRef.current) setBoxHeight(paperRef.current.offsetHeight)
      if (dummyTitleRef.current) {
        const { offsetTop: top, offsetLeft: left } = dummyTitleRef.current
        setDummyTitlePosition({ top, left })
      }
    } else {
      // close
      setIsOpen(false)
      if (dummyTitleRef.current) {
        const { height } = dummyTitleRef.current.getClientRects()[0]
        setBoxHeight(height)
      }
      setDummyTitlePosition({ top: 0, left: '50%' })
    }
  }

  useEffect(() => {
    openOrClose(!closeOnMount)
  }, [closeOnMount])

  return (
    <Box
      className={!isOpen ? 'closed' : undefined} // AutoDivider用
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
          fontWeight: 700,
          textDecoration: 'none',
          transition: 'all 1s',
          position: 'absolute',
          zIndex: 1,
          ...dummyTitlePosition,
          cursor: !isOpen || url ? 'pointer' : undefined,
          color: isOpen ? '#fff' : '#333',
          maxWidth: isOpen ? 430 : '100%',
          ml: !isOpen ? -25 : 0,
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
            bgcolor: '#333',
            color: '#fff',
            ml: rightAlign ? 'auto' : 0,
            mr: !rightAlign ? 'auto' : 0,
            p: 4,
            width: 800,
          }}
          onClick={() => {
            openOrClose(!isOpen)
          }}
        >
          <Stack direction={rightAlign ? 'row-reverse' : 'row'} justifyContent="space-between">
            <Stack justifyContent="space-between" sx={{ width: 430 }}>
              <Box>
                <Link
                  ref={dummyTitleRef}
                  sx={{ fontWeight: 700, textDecoration: 'none', visibility: 'hidden' }}
                >
                  {title}
                </Link>
                <Typography>{caption}</Typography>
              </Box>
              <Stack direction="row" flexWrap="wrap" useFlexGap spacing={1} sx={{ mt: 6 }}>
                {techs?.map((tag, i) => <TechTag key={i} techType={tag} sx={{ color: 'white' }} />)}
              </Stack>
            </Stack>
            <Box
              component="a"
              sx={{
                position: 'relative',
                width: 250,
                // minHeight: 150,
                borderRadius: 3,
                background: `no-repeat center url(${imageSrc})`,
                backgroundSize: 'cover',
                transition: 'all 0.5s 0.5s',
                '&:hover': {
                  zIndex: 2,
                  borderRadius: 0,
                  backgroundSize: 'contain',
                  transform: 'scale(2)',
                },
              }}
            />
          </Stack>
        </Paper>
      </Fade>
    </Box>
  )
}
