import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [auth, setAuth] = useState();
  const [authUser, setAuthUser] = useState();
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [isAdmin, setIsAdmin] = useState();
  const [highscore, setHighscore] = useState();
  const [result, setResult] = useState({});


  const api = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");

    (async () => {
      if (token) {
        try {
          const res = await axios.get(`${api}/api/users/verify`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (res.status === 200) {
            const user = res.data;
            setAuth(true);
            setAuthUser(user);
          } else {
            setAuth(false);
            window.location.href = "/login";
          }
        } catch (error) {
          setAuth(false);
          window.location.href = "/login";
        }
      } else {
        setAuth(false);
      }
    })();
  }, [auth]);

  useEffect(() => {
    if (authUser) {
      (async () => {
        try {
          const res = await axios.get(`${api}/api/users/${authUser._id}`);
          if (res.status === 200) {
            setId(res.data._id);
            setName(res.data.name);
            setEmail(res.data.email);
            setIsAdmin(res.data.isAdmin);
            setHighscore(res.data.highscore);
          }
        } catch (error) {
          console.error("Failed to fetch user details", error);
        }
      })();
    }else {
      setIsAdmin(false)
    }
  }, [authUser, api, setHighscore]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        authUser,
        setAuthUser,
        name,
        email,
        isAdmin,
        setIsAdmin,
        highscore,
        setHighscore,
        result,
        setResult,
        id,
        setId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
