import { Container, Stack, Typography } from '@mui/material'

import { useIsPC } from '@/lib/useIsPC'

export const Skills: React.FC = () => {
  const isPC = useIsPC()

  return (
    <Container fixed={isPC} sx={{ pt: 10, pb: 10 }} disableGutters={!isPC}>
      <Stack sx={{ width: '100%' }}>
        <Typography variant="h2">Skills</Typography>
        <Stack alignItems="center">
          <img
            src="https://skillicons.dev/icons?i=ts,js,nextjs,react,nestjs,prisma,nodejs,docker,cpp,c,java,py,php,jquery,html,css,flutter,kotlin,graphql,mysql,wordpress,gcp,firebase,raspberrypi&perline=8"
            alt=""
            style={{ width: 500 }}
          />
        </Stack>
      </Stack>
    </Container>
  )
}
