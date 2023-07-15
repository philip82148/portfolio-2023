import { Box, Container, Stack, Typography } from '@mui/material'
import { forwardRef } from 'react'

import { AutoHeightDivider } from './AutoHeightDivider'

type PersonalHistoryProps = React.PropsWithChildren<{ bgcolor: string }>
const InnerPersonalHistory: React.ForwardRefRenderFunction<HTMLDivElement, PersonalHistoryProps> = (
  { children, bgcolor },
  ref: React.Ref<HTMLDivElement>,
) => {
  return (
    <Box ref={ref} sx={{ bgcolor }}>
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

export const PersonalHistory = forwardRef<HTMLDivElement, PersonalHistoryProps>(
  InnerPersonalHistory,
)
