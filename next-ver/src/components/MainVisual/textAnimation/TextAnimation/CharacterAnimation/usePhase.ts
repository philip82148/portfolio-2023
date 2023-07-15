import { useEffect, useRef, useState } from 'react'

export const usePhase = (): {
  phase: number
  spanRef: React.RefObject<HTMLSpanElement>
  setPhase: React.Dispatch<React.SetStateAction<number>>
} => {
  const [phase, setPhase] = useState(0)
  const spanRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!spanRef.current) return

    spanRef.current.addEventListener('animationend', () => {
      setPhase((phase) => phase + 1)
    })
  }, [])

  return { phase, spanRef, setPhase }
}
