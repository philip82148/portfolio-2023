import { Box, Stack } from '@mui/material'
import { Pacifico, Crete_Round } from 'next/font/google'
import type { MouseEventHandler } from 'react'

const nameFont = Pacifico({ weight: '400', preload: false })
const mainFont = Crete_Round({ weight: '400', preload: false })

export const MainVisual: React.FC<{
  listItems: Array<{ display: string; onClick?: MouseEventHandler<HTMLDivElement>; href?: string }>
}> = () => {
  return (
    <Stack
      justifyContent="end"
      alignItems="center"
      className={mainFont.className}
      sx={{
        height: '550px',
        width: '100%',
        background: 'url(images/bg.jpg)',
        backgroundSize: 'cover',
        overflow: 'hidden',
        mt: '60px',
        color: '#fff',
        pb: 12,
      }}
    >
      <Box
        sx={{
          fontSize: { lg: 100, sm: 60, xs: 40 },
          ml: { lg: '-6px', sm: '-4px', xs: '-2px' },
        }}
      >
        Ryota Sasaki
      </Box>
      <Box sx={{ fontSize: { lg: 26, md: 18, sm: 22 } }}>
        Keio University Student Software Engineer
      </Box>
    </Stack>
  )
}
