import { Box, Container, Stack, Typography } from '@mui/material'

import { AutoHeightDivider } from './AutoHeightDivider'

export const PersonalHistory: React.FC<React.PropsWithChildren<{ bgcolor: string }>> = ({
  children,
  bgcolor,
}) => {
  return (
    <Box sx={{ bgcolor }}>
      <Container fixed sx={{ pt: 10, pb: 10 }}>
        <Stack alignItems="center">
          <Typography variant="h2" sx={{ borderBottom: '2px solid #333', p: 3, pb: 1, mb: 10 }}>
            History
          </Typography>
          <Stack divider={<AutoHeightDivider />} sx={{ width: '100%' }}>
            {children}
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
