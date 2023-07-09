import { useEffect, useLayoutEffect, useState } from 'react'

import { CharacterAnimation } from './CharacterAnimation'

export const TextAnimation: React.FC<{ children: string }> = ({ children }) => {
  const [durationSs, setDurationSs] = useState<number[]>([])

  const randomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min

  useLayoutEffect(() => {
    setDurationSs([...Array(children.length)].map(() => randomInt(5, 10)))
  }, [children.length])

  useEffect(() => {
    setInterval(() => {
      setDurationSs([...Array(children.length)].map(() => randomInt(5, 10)))
    }, 20000)
  }, [children.length])

  return (
    <>
      {children.split('').map((character, i) => (
        <CharacterAnimation durationS={durationSs[i] ?? 5} key={i} state={durationSs}>
          {character}
        </CharacterAnimation>
      ))}
    </>
  )
}
