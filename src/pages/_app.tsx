import type { AppProps } from 'next/app';
import { AuthContext } from '@/context/auth';
import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { onAuthStateChange } from '@/firebase/authentication';
import { useRouter } from 'next/router';
import { Layout } from '@/components/Layout';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

const publicRoutes = ['/', '/login', '/signup'];

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const isPublicRoute = publicRoutes.some(
      (route) => route === router.pathname,
    );
    const unsubscribe = onAuthStateChange((user) => {
      if (!user && !isPublicRoute) {
        router.push('/login');
      }
      setUser(user);
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div className={inter.className}>
      <AuthContext.Provider value={{ user, setUser }}>
        <Layout isLogin={user !== null}>
          <Component {...pageProps} />
        </Layout>
      </AuthContext.Provider>
    </div>
  );
}
