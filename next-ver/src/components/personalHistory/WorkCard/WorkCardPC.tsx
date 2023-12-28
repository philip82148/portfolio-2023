import CloseIcon from '@mui/icons-material/Close'
import { Box, Fade, IconButton, Link, Modal, Paper, Stack, Typography } from '@mui/material'
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
    if (!paperRef.current) return

    setParentBoxHeight(paperRef.current.offsetHeight)
  }

  const close = (): void => {
    if (!dummyTitleRef.current) return

    const span = dummyTitleRef.current.firstElementChild
    const lineCount = span?.getClientRects().length ?? 1
    const lineHeight = dummyTitleRef.current.getBoundingClientRect().height / lineCount
    setParentBoxHeight(lineHeight)
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

  // image box用
  const [imageBoxHeight, setImageBoxHeight] = useState(0)

  const captionBoxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onResize = (): void => {
      if (!captionBoxRef.current) return

      const { offsetHeight: captionBoxHeight } = captionBoxRef.current

      setImageBoxHeight(captionBoxHeight)
    }

    onResize()
    captionBoxRef.current?.addEventListener('resize', onResize)
  }, [])

  // modal用
  const [openModal, setOpenModal] = useState(false)

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
          display: 'grid',
          transition: 'all 1s, filter 0.2s ease, transform 0.2s ease',
          height: parentBoxHeight,
          fontSize: '1.6rem',
        },
        (isTitleHovered || (!isClosed && isPaperHovered)) && {
          filter: 'brightness(1.1)',
          transform: 'translateY(-4px)',
        },
      ]}
    >
      <MovableCard
        align={isClosed ? 'center-start' : rightAlign ? 'right' : 'left'}
        outerSx={{
          gridArea: '1 / 1 / 2 / 2',
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
        outerSx={{ gridArea: '1 / 1 / 2 / 2' }}
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
                display: 'grid',
                color: '#f3f3f3',
              }}
              onClick={onClick}
            >
              <MovableCard
                align={rightAlign ? 'right' : 'left'}
                outerSx={{ gridArea: '1 / 1 / 2 / 2', p: 4 }}
              >
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
                outerSx={{ gridArea: '1 / 1 / 2 / 2', p: 4 }}
                innerSx={{
                  display: 'grid',
                  alignItems: 'center',
                  justifyItems: 'center',
                  height: '100%',
                }}
              >
                <Box
                  sx={{
                    width: { lg: 250, xs: 200 },
                    maxHeight: imageBoxHeight,
                    overflow: 'hidden',
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    setOpenModal(true)
                  }}
                >
                  <img
                    src={imageSrc}
                    alt=""
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center top',
                    }}
                  />
                </Box>
              </MovableCard>
            </Paper>
          </Box>
        </Fade>
      </MovableCard>
      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false)
        }}
      >
        <Box>
          <IconButton
            onClick={() => {
              setOpenModal(false)
            }}
            sx={{ position: 'absolute', right: 0 }}
          >
            <CloseIcon sx={{ color: '#fff' }} fontSize="large" />
          </IconButton>
          <Box
            sx={{
              display: 'flex',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              boxShadow: 24,
            }}
          >
            <img
              src={imageSrc}
              alt=""
              style={{
                maxHeight: '80vh',
                maxWidth: '80vw',
                height: '100%',
                width: '100%',
                objectFit: 'contain',
              }}
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}
