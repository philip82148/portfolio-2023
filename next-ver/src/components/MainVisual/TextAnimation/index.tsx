import { useEffect, useState } from 'react'

import { CharacterAnimation } from './CharacterAnimation'

export const TextAnimation: React.FC<{ children: string }> = ({ children }) => {
  const [state, setState] = useState(0)

  useEffect(() => {
    setInterval(() => {
      setState((state) => state + 1)
    }, 20000)
  }, [setState])

  return (
    <>
      {children.split('').map((character, i) => (
        <CharacterAnimation durationS={5} key={i} state={state}>
          {character}
        </CharacterAnimation>
      ))}
    </>
  )
}
