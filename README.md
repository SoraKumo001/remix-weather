# remix-weather

## overview

Remix で SSR を行うためのサンプルです  
ただし`useLoader`を使う標準的な方法では無く、Next.js の getInitialProps 相当の機能を独自実装しています。

- `entry.server.tsx`で props を作成し、HTML データとして出力
- `entry.client.tsx`で HTML から props データを取り出します

Remix の標準機能による SSR は Next.js の`getStaticProps`相当の機能に過ぎず限定された用途でしか利用出来ません。

## 動作確認

- <https://remix-weather.vercel.app/>
