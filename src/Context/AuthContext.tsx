import * as React from "react";
import { useHistory } from 'react-router-dom'
interface IUserContext {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  logout(): void;
  token: string
  setToken: (token: string) => void;
  cardData: any;
  setCardData: React.Dispatch<React.SetStateAction<any>>;
}

export const UserContext = React.createContext<IUserContext>({} as IUserContext);

export const AuthProvider: React.FC = ({ children }) => {
  const history = useHistory()
  const [user, setUser] = React.useState<any>({});
  const [cardData, setCardData] = React.useState<any>({});
  const [token, settoken] = React.useState<string>('');

  const logout = () => {
    setToken('');
    setUser(null);
    history.push('/login')
  };

  const setToken = (token: string) => {
    settoken(token);
    localStorage.setItem('token', token)
  }

  React.useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, logout, token, setToken, cardData, setCardData }}>
      {children}
    </UserContext.Provider>
  );
};
