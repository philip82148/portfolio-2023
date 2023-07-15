import { Divider } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

export const AutoHeightDivider: React.FC = () => {
  const [height, setHeight] = useState(40)

  const dividerRef = useRef<HTMLHRElement>(null)

  useEffect(() => {
    if (!dividerRef.current) return

    const previousElement = dividerRef.current.previousElementSibling
    const nextElement = dividerRef.current.nextElementSibling

    if (!previousElement || !nextElement) return

    const observer = new MutationObserver(() => {
      const isPreviousClosed = previousElement.classList.contains('closed')
      const isNextClosed = nextElement.classList.contains('closed')

      if (isPreviousClosed && isNextClosed) {
        setHeight(0)
      } else {
        setHeight(40)
      }
    })

    observer.observe(previousElement, { attributes: true, attributeFilter: ['class'] })
    observer.observe(nextElement, { attributes: true, attributeFilter: ['class'] })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <Divider
      ref={dividerRef}
      orientation="vertical"
      flexItem
      sx={{ transition: 'all 1s', height, m: '0 auto', borderRight: 2 }}
    />
  )
}
