import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>トープ</title>
      </Head>
      <div>
        <h1>Overview</h1>
        <ol>
          <li>会員登録</li>
          <li>友達追加</li>
          <li>ルーム作成</li>
          <li>メッセージを送信</li>
        </ol>
      </div>
    </>
  );
}
