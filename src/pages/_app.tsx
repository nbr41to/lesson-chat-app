import type { AppProps } from 'next/app';
import { Header } from '@/components/Header';
import { AuthContext } from '@/context/auth';
import { User } from 'firebase/auth';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { onAuthStateChange } from '@/firebase/authentication';
import { useRouter } from 'next/router';
import { FooterMenu } from '@/components/FooterMenu';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });
const publicRoutes = ['/login', '/signup'];

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const isPublicRoute = publicRoutes.includes(router.pathname);
    const unsubscribe = onAuthStateChange((user) => {
      if (!user && !isPublicRoute) {
        router.push('/login');
      }
      setUser(user);
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <div className={inter.className}>
        <Header />
        <Component {...pageProps} />
        {user !== null && <FooterMenu />}

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
    </AuthContext.Provider>
  );
}
