import { useContext, createContext, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from './../config/firebase';
import { useNavigate, useLocation } from 'react-router-dom';
import { upsertUser } from '../api/user';


const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    // provider.addScope("https://www.googleapis.com/auth/devstorage.read_only")
    signInWithRedirect(auth, provider);
  };

  const googleSignOut = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {

      console.log('User signed in / out', currentUser);
      setUser(currentUser);

      if (currentUser && currentUser.uid) {
        try {

          const token = await currentUser.getIdToken();
          const response = await upsertUser(token);
          console.log('upsertUser response', response);
          navigate(location.pathname, { replace: true });

        } catch (error) {
          console.log('upsertUser error', error);
          await signOut(auth);
        }
      } else {
        navigate('/', { replace: true });
      }

    });
    
    return () => {
      unsubscribe();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ googleSignIn, googleSignOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};