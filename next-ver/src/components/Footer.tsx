import { Box, Container, Stack, Typography } from '@mui/material'

export const Footer: React.FC = () => {
  return (
    <Box sx={{ bgcolor: '#343434' }}>
      <Container>
        <Stack direction="row" alignItems="center" sx={{ height: 60 }}>
          <Typography color="#fff">(C) 2023 Ryota Sasaki</Typography>
        </Stack>
      </Container>
    </Box>
  )
}
