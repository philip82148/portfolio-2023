import { Box, Container, Divider, Stack, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

export const PersonalHistory: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Box sx={{ background: '#e9e9e9', overflow: 'hidden' }}>
      <Box
        sx={{
          width: '100%',
          height: 200,
          background: '#fff',
          zIndex: 0,
          transform: 'skewY(-4deg)',
          transformOrigin: 'top left',
        }}
      />
      <Container fixed sx={{ pt: 10, pb: 10 }}>
        <Stack alignItems="center">
          <Typography variant="h2" sx={{ borderBottom: '2px solid #333', p: 3, pb: 1, mb: 10 }}>
            History
          </Typography>
          <Stack divider={<AutoHeightDivider />} sx={{ width: '100%' }}>
            {children}
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

const AutoHeightDivider: React.FC = () => {
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
