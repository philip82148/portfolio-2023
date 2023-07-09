import type { NextPage } from 'next'

import { MainVisual } from '@/components/MainVisual'

const Home: NextPage = () => {
  return (
    <>
      <MainVisual
        listItems={[
          { display: 'About Me' },
          { display: 'Skills' },
          { display: 'History' },
          { display: 'Portfolio Ver. 2' },
          { display: 'Portfolio Ver. 3' },
        ]}
      />
    </>
  )
}
export default Home
