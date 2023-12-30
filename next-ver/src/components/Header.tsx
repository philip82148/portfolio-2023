import MenuIcon from '@mui/icons-material/Menu'
import { Box, Button, Container, Drawer, IconButton, Stack, styled } from '@mui/material'
import { Dosis } from 'next/font/google'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { useIsPC } from '@/lib/useIsPC'

const h2Font = Dosis({ preload: false })

const HpButton = styled(Button)(({ theme }) => ({
  height: 60,
  borderRadius: 0,
  textTransform: 'none',
  fontWeight: 600,
  padding: '0 12px',
  [theme.breakpoints.down('md')]: {
    padding: 0,
  },
}))

const SnsButton = styled(Button)({
  height: 60,
  width: 54,
  borderRadius: 0,
  minWidth: 0,
  padding: '15px 0',
})

const HeaderButton = styled(Button)(({ theme }) => ({
  height: 60,
  borderRadius: 0,
  fontFamily: h2Font.style.fontFamily,
  fontWeight: 700,
  fontSize: '1rem',
  width: 80,
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}))

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

  const { basePath } = useRouter()

  const [drawerOpened, setDrawerOpened] = useState(false)

  const isPC = useIsPC()

  const DrawerComponent = isPC ? Stack : Drawer

  return (
    <Box
      sx={{
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
          <HpButton href={`${basePath}/`} color="inherit">
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
          </HpButton>
          <DrawerComponent
            {...(isPC
              ? {
                  direction: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  sx: { flexGrow: 1 },
                }
              : {
                  anchor: 'right',
                  open: drawerOpened,
                  onClose: () => {
                    setDrawerOpened(false)
                  },
                  PaperProps: { sx: { p: 2, pt: 1 } },
                })}
          >
            <Stack
              direction="row"
              flexWrap={isPC ? 'nowrap' : 'wrap'}
              sx={{
                width: 'min(calc(100vw - 100px), calc(54px * 6))',
              }}
            >
              <SnsButton href="https://github.com/philip82148" color="inherit">
                <img
                  src="images/logos/github.svg"
                  alt=""
                  style={{ height: '100%', width: 'auto' }}
                />
              </SnsButton>
              <SnsButton href="https://zenn.dev/sassan" color="inherit">
                <img src="images/logos/zenn.svg" alt="" style={{ height: '100%', width: 'auto' }} />
              </SnsButton>
              <SnsButton href="https://qiita.com/philip82148" color="inherit">
                <img
                  src="images/logos/qiita.png"
                  alt=""
                  style={{ height: '100%', width: 'auto' }}
                />
              </SnsButton>
              <SnsButton href="https://twitter.com/philip82148" color="inherit">
                <img src="images/logos/x.png" alt="" style={{ height: '100%', width: 'auto' }} />
              </SnsButton>
              <SnsButton href="https://dev.to/philip82148" color="inherit">
                <img src="images/logos/dev.svg" alt="" style={{ height: '100%', width: 'auto' }} />
              </SnsButton>
              <SnsButton href="https://www.wantedly.com/id/ryouta_sasaki_ag" color="inherit">
                <img
                  src="images/logos/wantedly.svg"
                  alt=""
                  style={{ height: '100%', width: 'auto' }}
                />
              </SnsButton>
            </Stack>

            <Stack direction={isPC ? 'row' : 'column'}>
              <HeaderButton
                color="inherit"
                onClick={() => {
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
                  setDrawerOpened(false)
                }}
              >
                ABOUT
              </HeaderButton>
              <HeaderButton
                color="inherit"
                onClick={() => {
                  document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })
                  setDrawerOpened(false)
                }}
              >
                SKILLS
              </HeaderButton>
              <HeaderButton
                color="inherit"
                onClick={() => {
                  document.getElementById('history')?.scrollIntoView({ behavior: 'smooth' })
                  setDrawerOpened(false)
                }}
              >
                HISTORY
              </HeaderButton>
            </Stack>
          </DrawerComponent>
          {!isPC && (
            <IconButton
              onClick={() => {
                setDrawerOpened(true)
              }}
              sx={{ pr: 0 }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Stack>
      </Container>
    </Box>
  )
}
