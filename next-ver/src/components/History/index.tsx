import { Container, Stack, Typography } from '@mui/material'

import { EpochCard } from './EpochCard'
import { HistoryBody } from './HistoryBody'
import { WorkCard } from './WorkCard'

import { useIsPC } from '@/lib/useIsPC'

export const History: React.FC = () => {
  const isPC = useIsPC()

  return (
    <Container fixed={isPC} sx={{ mt: { lg: 2, xs: 0 }, pb: 14 }}>
      <Stack alignItems="center">
        <Typography variant="h2" id="history">
          HISTORY
        </Typography>
        <HistoryBody>
          <EpochCard
            title="小学6年~"
            caption="小説「ぼくらの七日間戦争」に出てくるエレクトロニクスの天才中学生のキャラクターに憧れ、独学で電子工作を始める。同時にパソコンの仕組みが知りたくてJavaを学ぶ。本を読みながらメモ帳を作ったりした。"
            newTechs={['Java']}
          />
          <WorkCard
            type="craft"
            title="ボート(工作)"
            imageSrc="images/in-preparation.jpg"
            caption="父と二人で人が乗れるボートを作った。"
          />
          <WorkCard
            type="programming"
            title="メモ帳"
            imageSrc="images/in-preparation.jpg"
            caption="プログラミングで初めて作ったアプリ"
            techs={['Java']}
          />
          <EpochCard
            title="中学校"
            caption="電子工作でマイコン用にC言語とPICのアセンブリ言語を学んだ。ここには載せていないが、SDカードライブラリをPICのアセンブリ言語でも書いており、そのおかげでC言語のポインタの概念が理解できた。"
            newTechs={['C', 'PICアセンブラ']}
          />
          <WorkCard
            type="electronics"
            title="電気ショックタイマー(電子工作)"
            imageSrc="images/in-preparation.jpg"
            caption="中毒並みに時間を忘れて作業に熱中してしまうことがあり、普通のタイマーでは作業をやめられなかったため、電気ショックで時間を知らせるタイマーを作った。"
            techs={['PICアセンブラ']}
          />
          <WorkCard
            type="craft"
            title="ボート3台目(工作)"
            imageSrc="images/in-preparation.jpg"
            caption="今度は自分一人で3mのボートを作った。"
          />
          <WorkCard
            type="programming"
            title="SDカードライブラリ"
            url="https://github.com/philip82148/SDCardLibrary"
            imageSrc="images/sd-card-library.png"
            caption="電子工作でICレコーダー用に作ったSDカードライブラリ。PICの少ないリソースでも動くようにメモリとプログラムメモリをなるだけ使わないように書いている。"
            techs={['C']}
          />
          <EpochCard
            title="高校"
            caption="電子工作で水中ドローンを作った。その際、ブラウザで操作できるコントローラを作ったため、HTML等ウェブ系の言語と、サーバー用にPythonを使った。"
            newTechs={['HTML', 'CSS', 'JavaScript', 'Python']}
          />
          <WorkCard
            type="electronics"
            title="水中ドローン(電子工作)"
            imageSrc="images/underwater-drone.jpg"
            caption="高校2年の文化祭で作って展示した。ブラウザ上でモーターの制御とカメラ映像が見れる。なお、水中ドローンという名目だが、水中で電波が届かないので実際には水上ドローンである。"
            techs={['C', 'HTML', 'CSS', 'JavaScript', 'Python']}
          />
          <EpochCard
            title="大学"
            caption="大学で自治寮(日吉寄宿舎)に入った関係で、いくつかの自動化プログラムを作る。大学3年ごろからプログラマとしての就職を意識し始め、さまざまな言語/フレームワークに触れたり、それに伴ってプログラミングのバイト・インターンを行うようになる。"
            newTechs={[
              'jQuery',
              'PHP',
              'MySQL',
              'WordPress',
              'Flutter',
              'Kotlin',
              'TypeScript',
              'React',
              'Next.js',
              'NestJS',
              'C++',
            ]}
          />
          <WorkCard
            type="programming"
            title="授業評定サイト用WordPressテーマ「selva」"
            url="https://github.com/philip82148/selva"
            imageSrc="images/in-preparation.jpg"
            demoUrl="http://khaosbbs.com/"
            caption="友達と二人で授業の評定サイト(WordPressテーマ)を作る。学部2年の時に作ったもので、いつかデザインを改善したいと思っている。"
            techs={['WordPress', 'PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS']}
          />
          <WorkCard
            type="programming"
            title="メンション生成Chrome拡張「M-GEN」"
            url="https://github.com/philip82148/mention-generator"
            imageSrc="images/mention-generator.png"
            caption="日吉寄宿舎でアンケートに回答しなかった人全員をLINEでメンションしており、手作業で回答していない人を調べてメンションするのは大変なので、自動化するChrome拡張を作った。"
            techs={['JavaScript', 'HTML', 'CSS']}
          />
          <WorkCard
            type="programming"
            title="LINE BOT「寄宿舎届出サポート」"
            url="https://github.com/philip82148/kishukusha-report-supporter"
            imageSrc="images/kishukusha-report-supporter.jpg"
            caption="日吉寄宿舎の各種届出を、届出を出す側も見る側も便利になるようにLINE BOTを作成した。"
            techs={['PHP']}
          />
          <WorkCard
            type="programming"
            title="名簿自動生成アプリ"
            url="https://github.com/philip82148/kishukusha-meibo"
            demoUrl="https://philip82148.github.io/kishukusha-meibo/"
            imageSrc="images/in-preparation.jpg"
            caption="日吉寄宿舎で寮生の名簿を作る作業があり、電話番号や住所のフォーマットを整える作業が毎年大変だったので、自動化するプログラムを作った。"
            techs={['Next.js', 'TypeScript']}
          />
          <WorkCard
            type="programming"
            title="ポートフォリオ"
            url="https://github.com/philip82148/portfolio"
            demoUrl="https://philip82148.github.io/portfolio/"
            imageSrc="images/in-preparation.jpg"
            caption="このポートフォリオを作る。"
            techs={['Next.js', 'TypeScript']}
          />
          <WorkCard
            type="programming"
            title="Oh My Zshテーマ「simplerich-zsh-theme」"
            url="https://github.com/philip82148/simplerich-zsh-theme"
            imageSrc="https://github.com/philip82148/simplerich-zsh-theme/raw/main/readme/demo.png"
            caption="Oh My Zshのテーマを作った。Gitの、いくつのファイルがstaged, changed, untrackedかやリモートリポジトリから何コミット前にある、後にある、という情報が一目でわかるテーマ。既存のリポジトリを組み合わせて作っただけだが。"
            techs={['Shell']}
          />
          <WorkCard
            type="programming"
            title="競プロ用デバッグツール「cpp-dump」"
            url="https://github.com/philip82148/cpp-dump"
            imageSrc="https://github.com/philip82148/cpp-dump/raw/main/readme/supports-various-types.png"
            caption={
              <>
                競プロをはじめたが、C++にダンプ関数がなかったので、あらゆる型の変数を文字列表現にして標準エラー出力に出力するダンプ関数を
                <b style={{ fontSize: '120%' }}>本気で作ってみた。</b>
              </>
            }
            techs={['C++']}
          />
          <EpochCard title="現在" />
        </HistoryBody>
      </Stack>
    </Container>
  )
}
