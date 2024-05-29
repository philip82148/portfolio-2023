import { Box, Container, Stack } from '@mui/material'
import { Crete_Round } from 'next/font/google'

import { useIsPC } from '@/lib/useIsPC'

const mainFont = Crete_Round({ weight: '400', preload: false })

export const MainVisual: React.FC = () => {
  const isPC = useIsPC()

  return (
    <Container disableGutters={isPC} maxWidth={false}>
      <Stack
        justifyContent={{ sm: 'end', xs: 'center' }}
        alignItems="center"
        className={mainFont.className}
        sx={{
          height: { md: 550, sm: 440, xs: 350 },
          width: '100%',
          background: 'url(images/bg.jpg)',
          backgroundSize: 'cover',
          overflow: 'hidden',
          mt: '60px',
          color: '#fff',
          p: 1,
          pb: { md: 12, sm: 11, xs: 0 },
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            fontSize: { lg: 100, sm: 80, xs: 44 },
            ml: { lg: '-6px', sm: '-2px', xs: '-2px' },
          }}
        >
          Ryota Sasaki
        </Box>
        <Box sx={{ fontSize: { lg: 26, sm: 20, xs: 16 } }}>
          <span style={{ display: 'inline-block' }}>Keio University Student</span>&nbsp;
          <span style={{ display: 'inline-block' }}>Software Engineer</span>
        </Box>
      </Stack>
    </Container>
  )
}
