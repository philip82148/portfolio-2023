import { Box, Container, Stack, Typography, styled } from '@mui/material'

const NameTypography = styled(Typography)(({ theme }) => ({
  fontSize: '2.8rem',
  fontWeight: 600,
  marginBottom: theme.spacing(0.5),
  [theme.breakpoints.down('md')]: {
    textAlign: 'center',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
}))

const ItemTypography = styled(Typography)(({ theme }) => ({
  marginTop: 10,
  color: theme.palette.text.secondary,
  fontSize: '1.2rem',
}))

const ContentTypography = styled(Typography)(() => ({
  fontSize: '1.2rem',
  wordBreak: 'keep-all',
}))

export const About: React.FC = () => {
  return (
    <Container fixed sx={{ pt: 10, pb: 15 }} id="about">
      <Stack sx={{ width: '100%' }} alignItems="center">
        <Typography variant="h2">ABOUT</Typography>
        <Stack
          direction={{ md: 'row', xs: 'column' }}
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: '100%', maxWidth: 950 }}
        >
          <Box
            sx={{
              width: { lg: 400, sm: 350, xs: 220 },
              borderRadius: '50%',
              overflow: 'hidden',
              display: 'flex',
              mb: { md: 0, xs: 4 },
            }}
          >
            <img
              src="https://avatars.githubusercontent.com/u/92205270?v=4"
              alt=""
              style={{ width: '100%' }}
            />
          </Box>
          <Stack sx={{ width: { md: 400 } }}>
            <NameTypography>Ryota Sasaki</NameTypography>
            <ItemTypography>所属</ItemTypography>
            <ContentTypography>慶應義塾大学 理工学部 電気情報工学科 4年</ContentTypography>
            <ItemTypography>趣味</ItemTypography>
            <ContentTypography>電子工作/カラオケ/アニメ/ピアノ</ContentTypography>
            <ItemTypography>特技</ItemTypography>
            <ContentTypography>円周率100桁言える</ContentTypography>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  )
}
