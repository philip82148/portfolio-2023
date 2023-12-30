import { Container, Stack, Typography } from '@mui/material'

export const Skills: React.FC = () => {
  return (
    <Stack
      sx={{ bgcolor: 'primary.main', pt: { lg: 8, md: 5, xs: 3 }, pb: { lg: 8, md: 5, xs: 3 } }}
      alignItems="center"
    >
      {/* <Typography variant="h2" color="#fff" borderColor="#fff">
        SKILLS
      </Typography> */}
      <Container>
        <Stack
          sx={{
            width: '100%',
            bgcolor: 'background.default',
            pb: { lg: 10, md: 7, xs: 6 },
            pl: { lg: 16, md: 14, sm: 8, xs: 4 },
            pr: { lg: 16, md: 14, sm: 8, xs: 4 },
          }}
          alignItems="center"
        >
          {/* <Typography variant="h3">LANGUAGES</Typography> */}
          <Typography variant="h2" sx={{ mt: { lg: 0, md: -3, xs: -4 } }} id="skills">
            SKILLS
          </Typography>
          {/* <Box sx={{ width: 500 }}>
            <img
              src="https://skillicons.dev/icons?i=ts,js,cpp,c,java,py,php,html,css,mysql&perline=5"
              alt=""
              style={{ width: '100%' }}
            />
          </Box>
        </Stack>
        <Stack sx={{ width: '100%', bgcolor: 'background.default' }} alignItems="center">
          <Typography variant="h3">FRAMEWORKS</Typography> */}
          <img
            src="https://skillicons.dev/icons?i=ts,js,nextjs,react,nestjs,prisma,nodejs,docker,cpp,c,java,py,php,jquery,html,css,flutter,kotlin,graphql,mysql,wordpress,gcp,firebase,raspberrypi&perline=6"
            alt=""
            style={{ width: '100%' }}
          />
        </Stack>
      </Container>
    </Stack>
  )
}
