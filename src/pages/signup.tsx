import Head from 'next/head';

import { SignUpTemplate } from '@/templates/SignUpTemplate';

export default function SignUp() {
  return (
    <>
      <Head>
        <title>SignUp</title>
      </Head>
      <SignUpTemplate />
    </>
  );
}
