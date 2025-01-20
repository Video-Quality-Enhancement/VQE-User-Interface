import { useContext, createContext, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  // signInWithRedirect,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from './../config/firebase';
import { useNavigate, useLocation } from 'react-router-dom';
// import { upsertUser } from '../api/user';


const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    // provider.addScope("https://www.googleapis.com/auth/devstorage.read_only")
    // signInWithRedirect(auth, provider);
    const userCred = await signInWithPopup(auth, provider);
    const user = userCred.user;
    // upsert user here
    console.log("here", await user.getIdToken());
  };

  const googleSignOut = async () => {
    await signOut(auth);
  };

  const initializeUser = async (currentUser) => {
    console.log('User signed in / out', currentUser);

    if (currentUser && currentUser.uid) {
      try {

        // const token = await currentUser.getIdToken();
        // const response = await upsertUser(token);
        // console.log('upsertUser response', response);
        // retrieve user data here
        setUser(currentUser);
        navigate(location.pathname, { replace: true });

      } catch (error) {

        console.log('unable to retrieve user details', error);
        await signOut(auth);
      }

    } else {

      setUser({});
      navigate('/', { replace: true });
    }

  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
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