import { Container, Stack, Typography } from '@mui/material'

export const Skills: React.FC = () => {
  return (
    <Stack
      sx={{ bgcolor: 'primary.main', pt: { lg: 8, md: 5, xs: 3 }, pb: { lg: 8, md: 5, xs: 3 } }}
      spacing={{ lg: 8, md: 5, xs: 3 }}
      alignItems="center"
    >
      <Container fixed>
        <Stack
          sx={{ bgcolor: 'background.default', pb: { lg: 10, md: 7, xs: 6 } }}
          alignItems="center"
        >
          <Typography variant="h2" sx={{ mt: { lg: 0, md: -3, xs: -4 } }} id="skills">
            SKILLS
          </Typography>
          <Stack
            sx={{
              maxWidth: { md: 500, sm: 420, xs: 400 },
              width: '100%',
              pl: { sm: 0, xs: 2 },
              pr: { sm: 0, xs: 2 },
            }}
          >
            <img
              src="https://skillicons.dev/icons?i=ts,js,nextjs,react,nestjs,prisma,nodejs,docker,cpp,c,java,py,php,jquery,html,css,flutter,kotlin,graphql,mysql,wordpress,gcp,firebase,raspberrypi&perline=6"
              alt="Skill Icons"
              style={{ width: '100%' }}
            />
          </Stack>
        </Stack>
      </Container>
      <Container fixed>
        <Stack
          sx={{ bgcolor: 'background.default', pb: { lg: 10, md: 7, xs: 6 } }}
          alignItems="center"
        >
          <Typography variant="h2" sx={{ mt: { lg: 0, md: -3, xs: -4 } }}>
            GITHUB STATS
          </Typography>
          <Stack
            sx={{
              maxWidth: { md: 500, sm: 420, xs: 400 },
              width: '100%',
              pl: { sm: 0, xs: 2 },
              pr: { sm: 0, xs: 2 },
            }}
            spacing={2}
          >
            <img
              src="https://github-readme-stats-sooty-nine-75.vercel.app/api?username=philip82148&show_icons=true&exclude_repo=github-readme-stats,qutip-tutorials-ipynb,selva,kishukusha-hp-theme,testrepo"
              alt="GitHub Stats"
              style={{ width: '100%' }}
            />
            <img
              src="https://github-readme-stats-sooty-nine-75.vercel.app/api/top-langs/?username=philip82148&layout=donut&exclude_repo=github-readme-stats,qutip-tutorials-ipynb,selva,kishukusha-hp-theme,testrepo"
              alt="Top Langs"
              style={{ width: '100%' }}
            />
          </Stack>
        </Stack>
      </Container>
    </Stack>
  )
}
