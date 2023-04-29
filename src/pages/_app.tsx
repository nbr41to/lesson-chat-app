import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <Component {...pageProps} />
      <div style={{ position: 'fixed', top: 0, left: 0, zIndex: 999 }}>
        <Link href='/'>Top</Link>
        <br />
        <Link href='/signup'>SignUp</Link>
        <br />
        <Link href='/login'>Login</Link>
        <br />
        <Link href='/rooms'>Rooms</Link>
        <br />
        <Link href='/rooms/room-id'>Room</Link>
        <br />
        <Link href='/account'>Account</Link>
        <br />
      </div>
    </div>
  );
}
