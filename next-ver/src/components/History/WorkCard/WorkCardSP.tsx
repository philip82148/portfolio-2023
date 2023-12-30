import CloseIcon from '@mui/icons-material/Close'
import { Box, IconButton, Link, Modal, Paper, Stack, Typography } from '@mui/material'
import { useState } from 'react'

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
}) => {
  const cardColor = {
    programming: 'primary.main',
    electronics: 'secondary.main', // '#259758', // '#9edd52',
    craft: 'secondary.main',
  }[type]

  // modal用
  const [openModal, setOpenModal] = useState(false)

  return (
    <Paper elevation={2} sx={{ bgcolor: cardColor, color: '#fff' }}>
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
          href={url}
          color="inherit"
          sx={{ fontWeight: 700, textDecoration: 'none', fontSize: '1.4rem' }}
        >
          {title}
        </Link>
        {demoUrl && (
          <Link href={demoUrl} color="inherit" sx={{ textDecoration: 'none' }}>
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
              objectFit: 'contain',
            }}
          />
        </Box>
      </Modal>
    </Paper>
  )
}
