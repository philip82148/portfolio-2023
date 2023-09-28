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
  const [openingOrClosingTimeout, setOpeningOrClosingTimeout] = useState<NodeJS.Timeout | null>(
    null,
  )

  const paperRef = useRef<HTMLDivElement>(null)
  const dummyTitleRef = useRef<HTMLAnchorElement>(null)

  const open = (): void => {
    if (paperRef.current) setParentBoxHeight(paperRef.current.offsetHeight)
  }

  const close = (): void => {
    if (dummyTitleRef.current) {
      const span = dummyTitleRef.current.firstElementChild
      const lineCount = span?.getClientRects().length ?? 1
      const lineHeight = dummyTitleRef.current.getBoundingClientRect().height / lineCount
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

  useEffect(() => {
    if (openingOrClosingTimeout) clearTimeout(openingOrClosingTimeout)

    const timeoutId = setTimeout(() => {
      setOpeningOrClosingTimeout(null)
    }, 1000)
    setOpeningOrClosingTimeout(timeoutId)
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

  // Paper/Titleホバー時用
  const [isPaperHovered, setIsPaperHovered] = useState(false)
  const [isTitleHovered, setIsTitleHovered] = useState(false)
  const [hoverChangingTimeout, setHoverChangingTimeout] = useState<NodeJS.Timeout | null>(null)

  const titleRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const makeHandler = (type: 'mouseenter' | 'mouseleave', setter: (value: boolean) => void) => {
      return () => {
        setter(type === 'mouseenter')

        if (hoverChangingTimeout) clearTimeout(hoverChangingTimeout)

        const timeoutId = setTimeout(() => {
          setHoverChangingTimeout(null)
        }, 500)
        setHoverChangingTimeout(timeoutId)
      }
    }

    paperRef.current?.addEventListener('mouseenter', makeHandler('mouseenter', setIsPaperHovered))
    paperRef.current?.addEventListener('mouseleave', makeHandler('mouseleave', setIsPaperHovered))

    titleRef.current?.addEventListener('mouseenter', makeHandler('mouseenter', setIsTitleHovered))
    titleRef.current?.addEventListener('mouseleave', makeHandler('mouseleave', setIsTitleHovered))
  }, [])

  return (
    <Box
      className={isClosed ? 'closed' : undefined} // AutoDivider状態判定用
      sx={[
        {
          transition: 'all 1s, filter 0.2s ease, transform 0.2s ease',
          position: 'relative',
          height: parentBoxHeight,
          fontSize: '1.6rem',
        },
        (isTitleHovered || (!isClosed && isPaperHovered)) && {
          filter: 'brightness(1.1)',
          transform: 'translateY(-4px)',
        },
        (isTitleHovered || isPaperHovered || !!hoverChangingTimeout) && {
          zIndex: 10,
        },
      ]}
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
          ref={titleRef}
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
              color: '#f3f3f3',
              position: 'relative',
              zIndex: 1,
              transition: 'all 1s',
              maxWidth: { lg: 430, xs: 350 },
              width: 'fit-content',
              '&:after': {
                content: '""',
                display: 'block',
                width: '100%',
                height: '2px',
                bgcolor: '#f3f3f3',
                opacity: 0,
                transition: 'all .1s ease',
                transform: 'translateY(6px)',
              },
            },
            !!url && {
              '&:hover:after': {
                transform: 'translateY(0)',
                opacity: 1,
              },
            },
            !!isClosed && {
              cursor: 'pointer',
              color: '#2daf67',
              maxWidth: { xs: '100vw' },
              ml: -25,
              '&:after': {
                height: 0,
              },
            },
            !!openingOrClosingTimeout && {
              '&:after': {
                height: 0,
              },
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
          <Box>
            <Paper
              ref={paperRef}
              elevation={2}
              sx={{
                borderRadius: 5,
                bgcolor: '#259758',
                position: 'relative',
                color: '#f3f3f3',
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
                  <Box
                    sx={{
                      mb: 1,
                      '&:after': {
                        content: '""',
                        display: 'block',
                        width: '100%',
                        height: '2px',
                      },
                    }}
                  >
                    <Link
                      underline="none"
                      ref={dummyTitleRef}
                      sx={{ display: 'block', fontWeight: 700, visibility: 'hidden' }}
                    >
                      <span>{title}</span>
                    </Link>
                  </Box>
                  {demoUrl && (
                    <Link
                      href={demoUrl}
                      underline="none"
                      variant="body1"
                      target="_blank"
                      sx={{
                        zIndex: 1,
                        color: '#f3f3f3c7',
                        width: 'fit-content',
                        mt: -1,
                        mb: 1.5,
                        '&:after': {
                          content: '""',
                          display: 'block',
                          width: '100%',
                          height: '1px',
                          bgcolor: '#f3f3f3c7',
                          opacity: 0,
                          transition: 'all .1s ease',
                          transform: 'translateY(6px)',
                        },
                        '&:hover:after': {
                          transform: 'translateY(0)',
                          opacity: 1,
                        },
                      }}
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                    >
                      {demoUrl}
                    </Link>
                  )}
                  <Typography>{caption}</Typography>
                  <Stack direction="row" flexWrap="wrap" useFlexGap spacing={1} sx={{ mt: 6 }}>
                    {techs?.map((tag, i) => (
                      <TechTag
                        key={i}
                        techType={tag}
                        sx={{ color: '#f3f3f3', borderColor: '#f3f3f3' }}
                      />
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
          </Box>
        </Fade>
      </MovableCard>
    </Box>
  )
}
