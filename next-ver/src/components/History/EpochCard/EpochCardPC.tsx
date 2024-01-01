import { Stack, Typography } from '@mui/material'

import { TechTag } from '../TechTag'

import type { EpochCardProps } from '.'

export const EpochCardPC: React.FC<EpochCardProps> = ({ title, caption, newTechs }) => {
  return (
    <Stack alignItems="center">
      <Stack alignItems="center" sx={{ width: { lg: 600, xs: 700 }, p: 4 }}>
        <Typography sx={{ fontSize: '1.3rem', fontWeight: 700 }}>{title}</Typography>
        {caption && (
          <>
            <Typography variant="body2" sx={{ pt: 1 }}>
              {caption}
            </Typography>
            {newTechs && (
              <>
                <Typography sx={{ pt: 1, pb: 1, fontWeight: 700 }}>
                  新しく覚えた言語/フレームワーク
                </Typography>
                <Stack
                  direction="row"
                  flexWrap="wrap"
                  useFlexGap
                  justifyContent="center"
                  spacing={0.5}
                >
                  {newTechs.map((tag, i) => (
                    <TechTag key={i} techType={tag} />
                  ))}
                </Stack>
              </>
            )}
          </>
        )}
      </Stack>
    </Stack>
  )
}
