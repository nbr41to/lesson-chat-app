import { FC, useState } from 'react';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { useRouter } from 'next/router';
import styles from './LoginTemplate.module.css';
import { login } from '@/firebase/authentication';

type Props = {};

export const LoginTemplate: FC<Props> = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login(email, password);
      router.push('/rooms');
    } catch (error) {}
  };

  return (
    <div className={styles.root}>
      <h1>ログイン</h1>
      <div className={styles.form}>
        <div className={styles.inputWrapper}>
          <Input
            label='メールアドレス'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.inputWrapper}>
          <Input
            label='パスワード'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <a className={styles.forgetPassword}>パスワードをお忘れの方</a>
        </div>
      </div>

      <div className={styles.buttonWrapper}>
        <Button label='ログイン' variant='primary' onClick={handleLogin} />
        <div className={styles.stayLoggedIn}>
          <input type='checkbox' />
          <span>ログイン状態を維持する</span>
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <p>アカウントをお持ちでない方</p>
        <Button
          label='新規会員登録'
          variant='secondary'
          onClick={() => router.push('/signup')}
        />
      </div>
    </div>
  );
};
