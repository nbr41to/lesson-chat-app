import { User } from 'firebase/auth';
import { Dispatch, SetStateAction, createContext } from 'react';

export const AuthContext = createContext<{
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}>({
  user: null,
  setUser: () => {},
});
