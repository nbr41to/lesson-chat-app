import { FC, useState } from 'react';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { useRouter } from 'next/router';
import styles from './SignUpTemplate.module.css';
import { signUp } from '@/firebase/authentication';

type Props = {};

export const SignUpTemplate: FC<Props> = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    signUp({ name, email, password });
  };

  return (
    <div className={styles.root}>
      <h1>新規会員登録</h1>
      <div className={styles.form}>
        <div className={styles.inputWrapper}>
          <Input
            label='ユーザー名/ID'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        </div>
      </div>

      <div className={styles.buttonWrapper}>
        <Button label='登録' variant='primary' onClick={handleSignUp} />
      </div>
      <div className={styles.buttonWrapper}>
        <p>すでにアカウントをお持ちの方</p>
        <Button
          label='ログイン'
          variant='secondary'
          onClick={() => router.push('/login')}
        />
      </div>
    </div>
  );
};
