import Head from 'next/head';
import { AccountTemplate } from '@/templates/AccountTemplate';
import { useEffect, useState } from 'react';
import { User } from '@/types';
import { getCurrentUser } from '@/firebase/authentication';
import { getUser } from '@/firebase/users';

export default function Account() {
  const [user, setUser] = useState<User>();

  const currentUser = getCurrentUser();
  console.log(currentUser);
  useEffect(() => {
    if (!currentUser) return;
    (async () => {
      const response = await getUser(currentUser.uid);
      setUser(response);
    })();
  }, [currentUser]);

  return (
    <>
      <Head>
        <title>Account</title>
      </Head>
      {user && <AccountTemplate user={user} />}
    </>
  );
}
