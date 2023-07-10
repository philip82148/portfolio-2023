import { Box, Stack, Typography } from '@mui/material'

import type { TechType } from './TechTag'
import { TechTag } from './TechTag'

export const EpochCard: React.FC<{ title: string; caption?: string; newTechs?: TechType[] }> = ({
  title,
  caption,
  newTechs,
}) => {
  return (
    <Box sx={{ width: 600, maxWidth: '100%', m: '0 auto', textAlign: 'center' }}>
      <Typography variant="h2">{title}</Typography>
      <Typography>{caption}</Typography>
      <Typography variant="h4">新しく覚えた言語/フレームワーク</Typography>
      <Stack direction="row" flexWrap={'wrap'} justifyContent="center" spacing={1}>
        {newTechs?.map((tech, i) => <TechTag key={i} techType={tech} />)}
      </Stack>
    </Box>
  )
}
