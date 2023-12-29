import { css } from '@emotion/react'
import { Box, Button, Container, Stack } from '@mui/material'
import { Dosis } from 'next/font/google'
import { useEffect, useState } from 'react'

const h2Font = Dosis({ preload: false })
// const mainFont = Crete_Round({ weight: '400', preload: false })

const hpButtonCss = css({
  height: 60,
  borderRadius: 0,
  textTransform: 'none',
  fontWeight: 600,
  padding: '0 12px',
})

const snsButtonCss = css({
  height: 60,
  borderRadius: 0,
  minWidth: 0,
  padding: '15px 12px',
})

const headerButtonCss = css({
  height: 60,
  borderRadius: 0,
  fontFamily: h2Font.style.fontFamily,
  fontWeight: 700,
  fontSize: '1rem',
  width: 80,
})

export const Header: React.FC = () => {
  const [pr, setPr] = useState('0')

  // MuiModalによってHeaderがずれないようにする
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setPr(document.body.style.paddingRight)
    })

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['style'],
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 100,
        width: '100%',
        pr,
        bgcolor: 'background.default',
      }}
    >
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center">
            <Button css={hpButtonCss} href="/" color="inherit">
              <Stack direction="row" alignItems="center">
                <Box sx={{ width: 48, height: 48, borderRadius: 24, overflow: 'hidden', mr: 2 }}>
                  <img
                    src="https://avatars.githubusercontent.com/u/92205270?s=48&v=4"
                    alt=""
                    style={{ width: '100%' }}
                  />
                </Box>
                Ryota Sasaki
              </Stack>
            </Button>
            <Stack direction="row">
              <Button href="https://github.com/philip82148" css={snsButtonCss} color="inherit">
                <img
                  src="images/logos/github.svg"
                  alt=""
                  style={{ height: '100%', width: 'auto' }}
                />
              </Button>
              <Button href="https://zenn.dev/sassan" css={snsButtonCss} color="inherit">
                <img src="images/logos/zenn.svg" alt="" style={{ height: '100%', width: 'auto' }} />
              </Button>
              <Button href="https://qiita.com/philip82148" css={snsButtonCss} color="inherit">
                <img
                  src="images/logos/qiita.png"
                  alt=""
                  style={{ height: '100%', width: 'auto' }}
                />
              </Button>
              <Button href="https://twitter.com/philip82148" css={snsButtonCss} color="inherit">
                <img src="images/logos/x.png" alt="" style={{ height: '100%', width: 'auto' }} />
              </Button>
              <Button href="https://dev.to/philip82148" css={snsButtonCss} color="inherit">
                <img src="images/logos/dev.svg" alt="" style={{ height: '100%', width: 'auto' }} />
              </Button>
              <Button
                href="https://www.wantedly.com/id/ryouta_sasaki_ag"
                css={snsButtonCss}
                color="inherit"
              >
                <img
                  src="images/logos/wantedly.svg"
                  alt=""
                  style={{ height: '100%', width: 'auto' }}
                />
              </Button>
            </Stack>
          </Stack>
          <Stack direction="row" alignItems="center">
            <Button
              css={headerButtonCss}
              color="inherit"
              onClick={() =>
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              ABOUT
            </Button>
            <Button
              css={headerButtonCss}
              color="inherit"
              onClick={() =>
                document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              SKILLS
            </Button>
            <Button
              css={headerButtonCss}
              color="inherit"
              onClick={() =>
                document.getElementById('history')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              HISTORY
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
