import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Fade,
  IconButton,
  Link,
  Modal,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import type { SyntheticEvent } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { MovableCard } from '../MovableCard'
import { TechTag } from '../TechTag'

import type { WorkCardProps } from '.'

export const WorkCardSP: React.FC<WorkCardProps> = ({
  type,
  title,
  imageSrc,
  url,
  demoUrl,
  caption,
  techs,
  isClosed,
  onClick,
}) => {
  const cardColor = {
    programming: 'primary.main',
    electronics: 'secondary.main', // '#259758', // '#9edd52',
    craft: 'secondary.main',
  }[type]

  // open/close用
  const [openParentBoxHeight, setOpenParentBoxHeight] = useState<number>()
  const [closedParentBoxHeight, setClosedParentBoxHeight] = useState<number>()
  const [openTitleTop, setOpenTitleTop] = useState<number>()

  const paperRef = useRef<HTMLDivElement>(null)
  const dummyTitleRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const onResize = (): void => {
      if (!paperRef.current || !dummyTitleRef.current) return

      setOpenParentBoxHeight(paperRef.current.offsetHeight)
      setOpenTitleTop(dummyTitleRef.current.offsetTop)

      const titleHeight = dummyTitleRef.current.getBoundingClientRect().height
      setClosedParentBoxHeight(titleHeight)
    }

    onResize()
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  // modal用
  const [isModalOpen, setIsModalOpen] = useState(false)

  const theme = useTheme()
  const isOverSm = useMediaQuery(theme.breakpoints.up('sm'))

  // パフォーマンス改善
  const onTitleClick = useCallback(
    (e: SyntheticEvent<HTMLAnchorElement>) => {
      if (isClosed) {
        e.preventDefault()
        onClick?.()
      }
    },
    [isClosed, onClick],
  )

  const onDemoClick = useCallback((e: SyntheticEvent<HTMLAnchorElement>) => {
    e.stopPropagation()
  }, [])

  const openModal = useCallback(
    (e: SyntheticEvent<HTMLAnchorElement>) => {
      e.stopPropagation()
      if (!demoUrl) setIsModalOpen(true)
    },
    [demoUrl],
  )

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  return (
    <Box
      sx={{
        position: 'relative',
        transition: 'height 1s',
        height: isClosed ? closedParentBoxHeight : openParentBoxHeight,
      }}
    >
      <MovableCard
        align={isClosed && isOverSm ? 'center-start' : 'left'}
        outerSx={{ width: '100%' }}
      >
        <Link
          onClick={onTitleClick}
          href={url}
          target="_blank"
          underline="none"
          sx={{
            display: 'block',
            position: 'absolute',
            zIndex: 1,
            color: cardColor,
            fontWeight: 700,
            fontSize: '1.3rem',
            width: 'fit-content',
            pl: { sm: 3, xs: 2 },
            pr: { sm: 3, xs: 2 },
            overflowWrap: 'anywhere',
            transition: 'margin-left 1s, top 1s',
            ml: !!isClosed && isOverSm ? -25 : 0,
            top: isClosed ? 0 : openTitleTop,
          }}
        >
          {title}
        </Link>
      </MovableCard>
      <Fade in={!isClosed} timeout={1000}>
        <Paper
          ref={paperRef}
          variant="outlined"
          sx={{ borderRadius: 4, overflow: 'hidden' }}
          onClick={onClick}
        >
          <Link
            href={demoUrl}
            target="_blank"
            sx={{
              display: 'block',
              width: '100%',
              height: { sm: 300, xs: 200 },
              background: `url(${imageSrc})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
              [theme.breakpoints.between(380, 'sm')]: {
                height: 220,
              },
            }}
            onClick={openModal}
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
          </Link>
          <Stack sx={{ p: { sm: 3, xs: 2 } }}>
            <Link
              underline="none"
              ref={dummyTitleRef}
              color="inherit"
              sx={{
                display: 'block',
                fontWeight: 700,
                visibility: 'hidden',
                fontSize: '1.3rem',
                overflowWrap: 'anywhere',
              }}
            >
              {title}
            </Link>
            {demoUrl && (
              <Link
                href={demoUrl}
                variant="body2"
                underline="none"
                target="_blank"
                sx={{
                  color: '#999',
                  fontSize: '0.9rem',
                  width: 'fit-content',
                  overflowWrap: 'anywhere',
                }}
                onClick={onDemoClick}
              >
                {demoUrl}
              </Link>
            )}
            <Typography variant="body2" sx={{ pt: 1 }}>
              {caption}
            </Typography>
            {techs && (
              <Stack direction="row" flexWrap="wrap" useFlexGap spacing={0.5} sx={{ pt: 2 }}>
                {techs.map((tag, i) => (
                  <TechTag key={i} techType={tag} color={cardColor} />
                ))}
              </Stack>
            )}
          </Stack>
        </Paper>
      </Fade>
      {!demoUrl && (
        <Modal open={isModalOpen} onClose={closeModal}>
          <Box
            sx={{
              display: 'flex',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              boxShadow: 24,
              color: '#fff',
            }}
          >
            <IconButton
              onClick={closeModal}
              color="inherit"
              sx={{
                position: 'absolute',
                left: '100%',
                bottom: '100%',
                transform: 'translate(-20%, 20%)',
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
                objectFit: 'contain',
              }}
            />
          </Box>
        </Modal>
      )}
    </Box>
  )
}
