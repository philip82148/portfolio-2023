import CloseIcon from '@mui/icons-material/Close'
import { Box, Fade, IconButton, Link, Modal, Paper, Stack, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

import { MovableCard } from '../MovableCard'
import { TechTag } from '../TechTag'

import type { WorkCardProps } from '.'

export const WorkCardPC: React.FC<WorkCardProps> = ({
  type,
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
  const cardColor = {
    programming: 'primary.main',
    electronics: 'secondary.main', // '#259758', // '#9edd52',
    craft: 'secondary.main',
  }[type]

  // open/close用
  const [parentBoxHeight, setParentBoxHeight] = useState<number>()

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
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  // modal用
  const [openModal, setOpenModal] = useState(false)

  // Paper/Titleホバー時用
  const [isPaperHovered, setIsPaperHovered] = useState(false)
  const [isTitleHovered, setIsTitleHovered] = useState(false)

  const titleRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const makeHandler = (setter: (value: boolean) => void, value: boolean) => {
      return () => {
        setter(value)
      }
    }

    paperRef.current?.addEventListener('mouseenter', makeHandler(setIsPaperHovered, true))
    paperRef.current?.addEventListener('mouseleave', makeHandler(setIsPaperHovered, false))

    titleRef.current?.addEventListener('mouseenter', makeHandler(setIsTitleHovered, true))
    titleRef.current?.addEventListener('mouseleave', makeHandler(setIsTitleHovered, false))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box
      className={isClosed ? 'closed' : undefined} // AutoDivider状態判定用
      sx={[
        {
          display: 'grid',
          transition: 'height 1s',
          height: parentBoxHeight,
          fontSize: '1.6rem',
        },
        !isClosed &&
          (isTitleHovered || isPaperHovered) && {
            transform: 'translateY(-4px)',
            filter: 'brightness(1.1)',
          },
      ]}
    >
      <MovableCard
        align={isClosed ? 'center-start' : rightAlign ? 'right' : 'left'}
        outerSx={{
          gridArea: '1 / 1 / 2 / 2',
          transition: 'padding-top 1s',
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
              color: '#fff',
              position: 'relative',
              zIndex: 1,
              transition: 'all 1s, transform 0s, filter 0s',
              maxWidth: { lg: 430, xs: 350 },
              width: 'fit-content',
            },
            !!url && {
              '&:hover': {
                transform: 'translateY(-4px)',
                filter: isClosed ? 'brightness(1.2)' : 'brightness(0.8)',
              },
            },
            !!isClosed && {
              cursor: 'pointer',
              color: cardColor,
              maxWidth: { xs: '100vw' },
              ml: -25,
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
                bgcolor: cardColor,
                display: 'grid',
                color: '#fff',
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
                    minHeight: 200,
                  }}
                >
                  <Link
                    underline="none"
                    ref={dummyTitleRef}
                    sx={{ display: 'block', fontWeight: 700, visibility: 'hidden', mb: 1 }}
                  >
                    <span>{title}</span>
                  </Link>
                  {demoUrl && (
                    <Link
                      href={demoUrl}
                      underline="none"
                      variant="body1"
                      target="_blank"
                      sx={{
                        zIndex: 1,
                        color: '#fff',
                        width: 'fit-content',
                        mt: -1,
                        mb: 1.5,
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          filter: 'brightness(0.8)',
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
                  {techs && (
                    <Stack direction="row" flexWrap="wrap" useFlexGap spacing={1} sx={{ mt: 6 }}>
                      {techs.map((tag, i) => (
                        <TechTag
                          key={i}
                          techType={tag}
                          sx={{ color: '#fff', borderColor: '#fff' }}
                        />
                      ))}
                    </Stack>
                  )}
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
                    height: imageBoxHeight,
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
          <IconButton
            onClick={() => {
              setOpenModal(false)
            }}
            sx={{
              position: 'absolute',
              left: '100%',
              bottom: '100%',
              transform: 'translate(-20%, 20%)',
              color: '#fff',
            }}
          >
            <CloseIcon color="inherit" fontSize="large" />
          </IconButton>
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
      </Modal>
    </Box>
  )
}
