import { Paper, Stack, Typography } from '@mui/material'

import type { TechType } from './TechTag'
import { TechTag } from './TechTag'

export const EpochCard: React.FC<{ title: string; caption?: string; newTechs?: TechType[] }> = ({
  title,
  caption,
  newTechs,
}) => {
  return (
    <Paper
      elevation={2}
      sx={{ m: 'auto', borderRadius: 5, p: caption ? '30px 80px' : '20px 40px' }}
    >
      <Stack alignItems="center">
        <Typography sx={{ fontSize: '1.6rem', fontWeight: 700 }}>{title}</Typography>
        {caption && <Typography sx={{ width: 400, mt: 1 }}>{caption}</Typography>}
        {newTechs && (
          <>
            <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, mt: 3, mb: 1 }}>
              新しく覚えた言語/フレームワーク
            </Typography>
            <Stack
              direction="row"
              justifyContent="center"
              flexWrap="wrap"
              useFlexGap
              sx={{ width: 400 }}
              spacing={1}
            >
              {newTechs?.map((tech, i) => <TechTag key={i} techType={tech} />)}
            </Stack>
          </>
        )}
      </Stack>
    </Paper>
  )
}
