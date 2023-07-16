import { Box, Fade, Link, Paper, Stack, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

import { MovableCard } from '../MovableCard'
import { TechTag } from '../TechTag'

import type { WorkCardProps } from '.'

export const WorkCardPC: React.FC<WorkCardProps> = ({
  title,
  imageSrc,
  url,
  demoUrl,
  caption,
  techs,
  isClosed,
  rightAlign,
  onClick,
}) => {
  // open/close用
  const [parentBoxHeight, setParentBoxHeight] = useState<number>()

  const paperRef = useRef<HTMLDivElement>(null)
  const dummyTitleRef = useRef<HTMLAnchorElement>(null)

  const open = (): void => {
    if (paperRef.current) setParentBoxHeight(paperRef.current.offsetHeight)
  }

  const close = (): void => {
    if (dummyTitleRef.current) {
      const span = dummyTitleRef.current.firstElementChild
      const lineHeight = span?.getClientRects()[0].height
      setParentBoxHeight(lineHeight)
    }
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
  }, [isClosed, rightAlign])

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
      <MovableCard
        align={isClosed ? 'center-start' : rightAlign ? 'right' : 'left'}
        outerSx={{
          position: 'absolute',
          top: 0,
          left: 0,
          transition: 'all 1s',
          p: 4,
          pt: !isClosed ? 4 : 0,
        }}
        innerSx={{ width: { lg: 430, xs: 350 } }}
      >
        <Link
          onClick={(e) => {
            if (isClosed) {
              e.preventDefault()
              onClick?.()
            }
          }}
          href={url}
          target="_blank"
          sx={[
            {
              display: 'block',
              fontWeight: 700,
              textDecoration: 'none',
              color: '#333',
              position: 'relative',
              zIndex: 1,
              transition: 'all 1s',
              width: { lg: 430, xs: 350 },
            },
            !!isClosed && {
              cursor: 'pointer',
              color: '#129c70', // '#258d6c'
              width: { xs: 'auto' },
              ml: -25,
            },
          ]}
        >
          {title}
        </Link>
      </MovableCard>
      <MovableCard
        align={rightAlign ? 'right' : 'left'}
        outerSx={{ position: 'absolute', top: 0, left: 0 }}
        innerSx={{ width: { lg: 800, xs: 650 } }}
      >
        <Fade in={!isClosed} timeout={1000}>
          <Paper
            ref={paperRef}
            elevation={2}
            sx={{
              borderRadius: 5,
              bgcolor: '#d3e1df', // '#1e765a',
              position: 'relative',
            }}
            onClick={onClick}
          >
            <MovableCard align={rightAlign ? 'right' : 'left'} outerSx={{ p: 4 }}>
              <Stack
                ref={captionBoxRef}
                sx={{
                  width: { lg: 430, xs: 350 },
                }}
              >
                <Link
                  underline="none"
                  ref={dummyTitleRef}
                  sx={{ fontWeight: 700, visibility: 'hidden' }}
                >
                  <span>{title}</span>
                </Link>
                {demoUrl && (
                  <Link href={demoUrl} color="#333" underline="hover" variant="body1">
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
            </MovableCard>
            <MovableCard
              align={rightAlign ? 'left' : 'right'}
              outerSx={{ position: 'absolute', top: 0, left: 0, p: 4 }}
            >
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
            </MovableCard>
          </Paper>
        </Fade>
      </MovableCard>
    </Box>
  )
}
