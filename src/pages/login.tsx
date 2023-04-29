import Head from 'next/head';
import { LoginTemplate } from '@/templates/LoginTemplate';

export default function Login() {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <LoginTemplate />
    </>
  );
}
