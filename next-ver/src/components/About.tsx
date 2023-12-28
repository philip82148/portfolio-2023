import { Container, Stack, Typography } from '@mui/material'

import { useIsPC } from '@/lib/useIsPC'

export const About: React.FC = () => {
  const isPC = useIsPC()

  return (
    <Container fixed={isPC} sx={{ pt: 10, pb: 10 }} disableGutters={!isPC}>
      <Stack sx={{ width: '100%' }}>
        <Typography variant="h2">About</Typography>
        <Typography>特技</Typography>
      </Stack>
    </Container>
  )
}
