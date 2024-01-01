import { Stack, Typography } from '@mui/material'
import React from 'react'

import type { TechType } from './TechTag'
import { TechTag } from './TechTag'

export const EpochCard = React.memo<{ title: string; caption?: string; newTechs?: TechType[] }>(
  ({ title, caption, newTechs }) => {
    return (
      <Stack alignItems="center">
        <Stack alignItems="center" sx={{ maxWidth: { md: 600, xs: 700 }, p: 4, pl: 0, pr: 0 }}>
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
  },
)
EpochCard.displayName = 'EpochCard'
