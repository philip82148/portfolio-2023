import { Box, Container, Stack, Typography } from '@mui/material'

import { useIsPC } from '@/lib/useIsPC'

export const About: React.FC = () => {
  const isPC = useIsPC()

  return (
    <Container fixed={isPC} sx={{ pt: 10, pb: 15 }} disableGutters={!isPC} id="about">
      <Stack sx={{ width: '100%' }} alignItems="center">
        <Typography variant="h2">ABOUT</Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: '100%', maxWidth: 950 }}
        >
          <Box sx={{ width: 400, borderRadius: 200, overflow: 'hidden', display: 'flex' }}>
            <img
              src="https://avatars.githubusercontent.com/u/92205270?v=4"
              alt=""
              style={{ width: '100%' }}
            />
          </Box>
          <Stack sx={{ width: 400 }}>
            <Typography sx={{ fontSize: '2.8rem' }}>Ryota Sasaki</Typography>
            <Typography>所属</Typography>
            <Typography>慶應義塾大学 理工学部 電気情報工学科 4年</Typography>
            <Typography>趣味</Typography>
            <Typography>電子工作/カラオケ/アニメ/ピアノ</Typography>
            <Typography>特技</Typography>
            <Typography>円周率100桁言える</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  )
}
