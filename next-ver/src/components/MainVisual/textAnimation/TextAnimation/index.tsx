import { Box } from '@mui/material'
import { useEffect, useState } from 'react'

import { CharacterAnimation } from './CharacterAnimation'

export const TextAnimation: React.FC<{ children: string; state: unknown }> = ({
  children,
  state,
}) => {
  const [durationSs, setDurationSs] = useState<number[]>([])

  useEffect(() => {
    setDurationSs([...Array(children.length)].map(() => Math.random() * 5 + 5))
  }, [children.length, state])

  return (
    <Box sx={{ transformStyle: 'preserve-3d', perspective: 1000 }}>
      {children.split('').map((character, i) => (
        <CharacterAnimation durationS={durationSs[i] ?? 5} key={i} state={state}>
          {character}
        </CharacterAnimation>
      ))}
    </Box>
  )
}
