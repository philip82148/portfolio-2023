import { useEffect, useState } from 'react'

export const useTextAnimationState = (): unknown => {
  const [textAnimationState, setTextAnimationState] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTextAnimationState(Math.random())
    }, 20000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return textAnimationState
}
