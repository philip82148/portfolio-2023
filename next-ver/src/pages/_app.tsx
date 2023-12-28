import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import type { AppProps } from 'next/app'
import Head from 'next/head'

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta httpEquiv="Cache-Control" content="no-cache" />
      <meta httpEquiv="Pragma" content="no-cache" />
      <meta httpEquiv="Expires" content="0" />
      {process.env.NODE_ENV !== 'development' && (
        <link
          rel="stylesheet"
          href="https://ss159178.stars.ne.jp/css/normalize.css?1348127897942"
        />
      )}

      <title>{`Ryota Sasaki's Portfolio Ver. 1`}</title>
      <meta name="description" content="Ryota SasakiのPortfolio Ver. 1" />
    </Head>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  </>
)
export default App

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: [
      'Avenir',
      'Open Sans',
      'Helvetica Neue',
      'Helvetica',
      'Arial',
      'Verdana',
      'Roboto',
      '游ゴシック',
      'Yu Gothic',
      '游ゴシック体',
      'YuGothic',
      'ヒラギノ角ゴ Pro W3',
      'Hiragino Kaku Gothic Pro',
      'Meiryo UI',
      'メイリオ',
      'Meiryo',
      'ＭＳ Ｐゴシック',
      'MS PGothic',
      'sans-serif',
    ].join(','),
    h2: {
      textAlign: 'center',
      borderBottom: '2px solid #e5e5e5',
      paddingBottom: 10,
      margin: '0 140px 80px',
      fontSize: '2.8rem',
      color: '#555',
    },
  },
  palette: {
    background: {
      default: '#fff',
    },
    primary: {
      main: '#f7912b',
    },
    text: {
      primary: '#333',
    },
  },
})
