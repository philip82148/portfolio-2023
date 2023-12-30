import { Stack, useTheme } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner'

export const Loading: React.FC = () => {
  const [display, setDisplay] = useState<string | undefined>()
  const [animation, setAnimation] = useState<string>('none')

  const timeoutId = useRef<NodeJS.Timeout>()
  const lastWindowWidth = useRef<number>()

  useEffect(() => {
    const onResize = (): void => {
      if (lastWindowWidth.current === window.innerWidth) return
      lastWindowWidth.current = window.innerWidth

      if (timeoutId.current) clearTimeout(timeoutId.current)

      setDisplay(undefined)
      setAnimation('none')

      timeoutId.current = setTimeout(() => {
        setDisplay(undefined)
        setAnimation('fadeOut 0.5s forwards')

        timeoutId.current = setTimeout(() => {
          setDisplay('none')
          timeoutId.current = undefined
        }, 500)
      }, 1000)
    }

    onResize()
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const theme = useTheme()

  return (
    <>
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 200,
          bgcolor: 'background.default',
          display,
          animation,
        }}
      >
        <ThreeDots color={theme.palette.primary.main} />
      </Stack>
      <style jsx global>{`
        @keyframes fadeOut {
          0% {
            opacity: 1;
          }

          100% {
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
}
