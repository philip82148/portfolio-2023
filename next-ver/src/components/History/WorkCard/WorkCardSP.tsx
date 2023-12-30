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
import { useEffect, useRef, useState } from 'react'

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
  const [parentBoxHeight, setParentBoxHeight] = useState<number>()
  const [titleTop, setTitleTop] = useState<number>()

  const paperRef = useRef<HTMLDivElement>(null)
  const dummyTitleRef = useRef<HTMLAnchorElement>(null)

  const open = (): void => {
    if (!paperRef.current || !dummyTitleRef.current) return

    setParentBoxHeight(paperRef.current.offsetHeight)
    setTitleTop(dummyTitleRef.current.offsetTop)
  }

  const close = (): void => {
    if (!dummyTitleRef.current) return

    const titleHeight = dummyTitleRef.current.getBoundingClientRect().height
    setParentBoxHeight(titleHeight)
    setTitleTop(0)
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

  // modal用
  const [openModal, setOpenModal] = useState(false)

  const theme = useTheme()
  const isOverSm = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <Box
      sx={{
        position: 'relative',
        transition: 'height 1s',
        height: parentBoxHeight,
        color: '#fff',
      }}
    >
      <MovableCard
        align={isClosed && isOverSm ? 'center-start' : 'left'}
        outerSx={{ width: '100%' }}
      >
        <Link
          href={url}
          target="_blank"
          underline="none"
          sx={{
            display: 'block',
            position: 'absolute',
            zIndex: 1,
            ml: isClosed && isOverSm ? -25 : 2,
            mr: 2,
            fontWeight: 700,
            fontSize: '1.4rem',
            transition: 'all 1s',
            top: titleTop,
            color: isClosed ? cardColor : '#fff',
          }}
          onClick={(e) => {
            if (isClosed) {
              e.preventDefault()
              onClick?.()
            }
          }}
        >
          {title}
        </Link>
      </MovableCard>
      <Fade in={!isClosed} timeout={1000}>
        <Paper
          ref={paperRef}
          elevation={2}
          sx={{ bgcolor: cardColor, color: '#fff' }}
          onClick={onClick}
        >
          <Box
            sx={{ height: 200 }}
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
          <Stack sx={{ p: 2, pt: 3, pb: 3 }}>
            <Link
              underline="none"
              ref={dummyTitleRef}
              color="inherit"
              sx={{
                display: 'block',
                fontWeight: 700,
                visibility: 'hidden',
                fontSize: '1.4rem',
              }}
            >
              {title}
            </Link>
            {demoUrl && (
              <Link
                href={demoUrl}
                underline="none"
                color="inherit"
                target="_blank"
                sx={{ width: 'min-content' }}
                onClick={(e) => {
                  e.stopPropagation()
                }}
              >
                {demoUrl}
              </Link>
            )}
            <Typography sx={{ pt: 2 }}>{caption}</Typography>
            {techs && (
              <Stack
                direction="row"
                // justifyContent="center"
                flexWrap="wrap"
                useFlexGap
                spacing={1}
                sx={{ pt: 2 }}
              >
                {techs?.map((tag, i) => (
                  <TechTag
                    key={i}
                    techType={tag}
                    sx={{ color: '#fff', borderColor: '#fff', fontSize: '0.8rem' }}
                  />
                ))}
              </Stack>
            )}
          </Stack>
        </Paper>
      </Fade>
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
            color: '#fff',
          }}
        >
          <IconButton
            onClick={() => {
              setOpenModal(false)
            }}
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
    </Box>
  )
}
