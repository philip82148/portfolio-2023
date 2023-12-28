import { Box, Button, Container, Stack, Typography } from '@mui/material'

export const Header: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 100,
        width: '100%',
        height: 60,
        bgcolor: 'background.default',
      }}
    >
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Button sx={{ textTransform: 'none' }}>
            <Stack direction="row" alignItems="center">
              <Box sx={{ width: 48, height: 48, borderRadius: 24, overflow: 'hidden', mr: 3 }}>
                <img src="https://avatars.githubusercontent.com/u/92205270?s=48&v=4" alt="" />
              </Box>
              <Typography>philip82148</Typography>
            </Stack>
          </Button>
          <Stack direction="row" alignItems="center">
            <Button>About Me</Button>
            <Button>My Skills</Button>
            <Button>My History</Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
