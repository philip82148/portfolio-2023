import { Box, Button, Modal, Stack, Typography } from '@mui/material'
import type { NextPage } from 'next'
import { useState } from 'react'

import { About } from '@/components/About'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { History } from '@/components/History'
import { Loading } from '@/components/Loading'
import { MainVisual } from '@/components/MainVisual'
import { Skills } from '@/components/Skills'

const Home: NextPage = () => {
  const [modalOpen, setModalOpen] = useState(true)
  const handleClose = (): void => {
    setModalOpen(false)
  }

  return (
    <>
      <Modal
        open={modalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            2024年版の新しいポートフォリオがあります。
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            2024年版の新しいポートフォリオを開きますか？
          </Typography>
          <Stack direction="row" justifyContent="space-between" sx={{ mt: 4 }}>
            <Button variant="contained" href="https://philip82148.dev/">
              2024年版を見る
            </Button>
            <Button variant="contained" color="inherit" onClick={handleClose}>
              ダイアログを閉じて2023年版を見る
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Header />
      <MainVisual />
      <About />
      <Skills />
      <History />
      <Footer />
      <Loading />
      <style jsx global>{`
        body {
          overflow-x: hidden;
        }
      `}</style>
    </>
  )
}
export default Home
