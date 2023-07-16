import { Box, Fade, Link, Paper, Stack, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

import { TechTag } from '../TechTag'

import type { WorkCardProps } from '.'

export const WorkCardPC: React.FC<WorkCardProps> = ({
  title,
  imageSrc,
  url,
  demoUrl,
  caption,
  techs,
  closeOnMount,
  rightAlign,
}) => {
  // open/close用
  const [isClosed, setIsClosed] = useState(!!closeOnMount)
  const [parentBoxHeight, setParentBoxHeight] = useState<number>()
  const [dummyTitlePosition, setDummyTitlePosition] = useState<{
    top: number
    left: number | string
  }>()

  const paperRef = useRef<HTMLDivElement>(null)
  const dummyTitleRef = useRef<HTMLAnchorElement>(null)

  const open = (): void => {
    setIsClosed(false)
    if (paperRef.current) setParentBoxHeight(paperRef.current.offsetHeight)
    if (dummyTitleRef.current) {
      const { offsetTop: top, offsetLeft: left } = dummyTitleRef.current
      setDummyTitlePosition({ top, left })
    }
  }

  const close = (): void => {
    setIsClosed(true)
    if (dummyTitleRef.current) {
      const span = dummyTitleRef.current.firstElementChild
      const lineHeight = span?.getClientRects()[0].height
      setParentBoxHeight(lineHeight)
    }
    setDummyTitlePosition({ top: 0, left: '50%' })
  }

  useEffect(() => {
    const onResize = (): void => {
      isClosed ? close() : open()
    }

    onResize()
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [isClosed])

  // image拡大用
  const [imageBoxHeight, setImageBoxHeight] = useState(0)
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })

  const captionBoxRef = useRef<HTMLDivElement>(null)
  const imageBoxRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const onImageLoad = (): void => {
      if (!captionBoxRef.current || !imageBoxRef.current || !imageRef.current) return

      const { offsetHeight: captionBoxHeight } = captionBoxRef.current
      const { offsetWidth: imageBoxWidth } = imageBoxRef.current
      const { naturalWidth, naturalHeight } = imageRef.current

      setImageBoxHeight(captionBoxHeight)

      // object-fit: coverとなるように拡大したサイズにする
      const scale = Math.max(imageBoxWidth / naturalWidth, captionBoxHeight / naturalHeight)
      const width = naturalWidth * scale
      const height = naturalHeight * scale

      setImageSize({ width, height })
    }

    if (!imageRef.current) return

    if (imageRef.current.complete) {
      onImageLoad()
      return
    }

    imageRef.current.addEventListener('load', onImageLoad)
  }, [])

  return (
    <Box
      className={isClosed ? 'closed' : undefined} // AutoDivider状態判定用
      sx={{
        transition: 'all 1s',
        position: 'relative',
        height: parentBoxHeight,
        fontSize: '1.6rem',
      }}
    >
      <Link
        onClick={(e) => {
          if (isClosed) {
            e.preventDefault()
            open()
          }
        }}
        href={url}
        target="_blank"
        sx={[
          {
            fontWeight: 700,
            textDecoration: 'none',
            transition: 'all 1s',
            position: 'absolute',
            zIndex: 1,
            ...dummyTitlePosition,
            color: '#333',
            maxWidth: { lg: 430, xs: 350 },
          },
          isClosed && {
            cursor: 'pointer',
            color: '#129c70', // '#258d6c'
            maxWidth: { xs: '100%' },
            ml: -25,
          },
        ]}
      >
        {title}
      </Link>
      <Fade in={!isClosed} timeout={1000}>
        <Paper
          ref={paperRef}
          elevation={2}
          sx={{
            borderRadius: 5,
            bgcolor: '#d3e1df', // '#1e765a',
            ml: rightAlign ? 'auto' : 0,
            mr: !rightAlign ? 'auto' : 0,
            p: 4,
            width: { lg: 800, xs: 650 },
          }}
          onClick={() => {
            isClosed ? open() : close()
          }}
        >
          <Stack direction={rightAlign ? 'row-reverse' : 'row'} justifyContent="space-between">
            <Stack ref={captionBoxRef} sx={{ width: { lg: 430, xs: 350 }, height: 'min-content' }}>
              <Link
                underline="none"
                ref={dummyTitleRef}
                sx={{ fontWeight: 700, visibility: 'hidden' }}
              >
                <span>{title}</span>
              </Link>
              {demoUrl && (
                <Link href={demoUrl} target="_blank" color="#333" underline="hover" variant="body1">
                  {demoUrl}
                </Link>
              )}
              <Typography>{caption}</Typography>
              <Stack direction="row" flexWrap="wrap" useFlexGap spacing={1} sx={{ mt: 6 }}>
                {techs?.map((tag, i) => (
                  <TechTag key={i} techType={tag} sx={{ color: '#333', borderColor: '#333' }} />
                ))}
              </Stack>
            </Stack>
            <Box
              ref={imageBoxRef}
              sx={{
                position: 'relative',
                width: { lg: 250, xs: 200 },
                height: imageBoxHeight,
              }}
            >
              <Box
                component="a"
                sx={{
                  position: 'absolute',
                  zIndex: 2,
                  top: '50%',
                  left: '50%',
                  overflow: 'hidden',
                  transform: 'translate(-50%, -50%)',
                  transition: 'all 0.5s 0.5s',
                  width: '100%',
                  height: '100%',
                  borderRadius: 3,
                  '&:hover': {
                    zIndex: 3,
                    ...imageSize,
                    borderRadius: 0,
                    transform: 'translate(-50%, -50%) scale(2)',
                  },
                }}
                onClick={(e) => {
                  e.stopPropagation()
                }}
              >
                <img
                  ref={imageRef}
                  src={imageSrc}
                  alt=""
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    ...imageSize,
                  }}
                />
              </Box>
            </Box>
          </Stack>
        </Paper>
      </Fade>
    </Box>
  )
}
