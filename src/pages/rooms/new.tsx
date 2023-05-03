import Head from 'next/head';

import { RoomNewTemplate } from '@/templates/RoomNewTemplate';

export default function RoomNew() {
  return (
    <>
      <Head>
        <title>New Room</title>
      </Head>
      <RoomNewTemplate />
    </>
  );
}
