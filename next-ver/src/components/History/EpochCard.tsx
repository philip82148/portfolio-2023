import { Stack, Typography } from '@mui/material'
import React from 'react'

import type { TechType } from './TechTag'
import { TechTag } from './TechTag'

export const EpochCard = React.memo<{ title: string; caption?: string; newTechs?: TechType[] }>(
  ({ title, caption, newTechs }) => {
    return (
      <Stack alignItems="center">
        <Stack alignItems="center" sx={{ maxWidth: { md: 600, xs: 700 }, p: 4, pl: 0, pr: 0 }}>
          <Typography
            sx={{
              fontSize: '1.3rem',
              fontWeight: 700,
              borderBottom: '2px solid #000',
              p: '0 3px 1px',
              mb: 2,
            }}
          >
            {title}
          </Typography>
          {caption && (
            <>
              <Typography variant="body2">{caption}</Typography>
              {newTechs && (
                <>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      borderBottom: '2px solid #000',
                      p: '0 2px 1px',
                      mt: 1.5,
                      mb: 2,
                    }}
                  >
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
