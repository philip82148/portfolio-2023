import { Paper, Stack, Typography } from '@mui/material'

import type { TechType } from './TechTag'
import { TechTag } from './TechTag'

export const EpochCard: React.FC<{
  title: string
  caption?: string
  newTechs?: TechType[]
  rightAlign?: boolean
}> = ({ title, caption, newTechs, rightAlign }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: 5,
        width: { lg: 800, xs: 650 },
        ml: rightAlign ? 'auto' : 0,
        mr: !rightAlign ? 'auto' : 0,
        p: { md: caption ? '30px 80px' : '20px 40px', xs: 4 },
      }}
    >
      <Stack>
        <Typography sx={{ fontSize: '1.6rem', fontWeight: 700, textAlign: 'left' }}>
          {title}
        </Typography>
        {caption && <Typography sx={{ mt: 1 }}>{caption}</Typography>}
        {newTechs && (
          <>
            <Typography
              sx={{ fontSize: '1.2rem', fontWeight: 700, mt: 3, mb: 1, textAlign: 'left' }}
            >
              新しく覚えた言語/フレームワーク
            </Typography>
            <Stack direction="row" justifyContent="start" flexWrap="wrap" useFlexGap spacing={1}>
              {newTechs?.map((tech, i) => <TechTag key={i} techType={tech} />)}
            </Stack>
          </>
        )}
      </Stack>
    </Paper>
  )
}
