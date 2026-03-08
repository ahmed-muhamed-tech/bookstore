import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { supabase } from "../utils/supabaseClient";
import { useNavigate } from "react-router-dom";
const authUserContext = createContext();

const initialDataUser = {
  id: "",
  email: "",
  isAdmin: false,
};

const AuthUserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(initialDataUser);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, password) => {
    if (email.trim().length === 0 || email === undefined) {
      toast.error("ادخل الاميل");
      return;
    }

    if (password.trim().length === 0 || password === undefined) {
      toast.error("ادخل الباسوورد");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.log(error);
      toast.error(error.message);
    }

    const is_admin = data.user.email === import.meta.env.VITE_ADMIN_EMAIL;

    if (data.user) {
      navigate("/");
      setUser({
        id: data.user.id,
        email: data.user.email,
        isAdmin: is_admin,
      });
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          isAdmin: session.user.email === import.meta.env.VITE_ADMIN_EMAIL,
        });
      }
      setIsLoading(false);
    };

    initializeAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          setUser({
            id: session.user.id,
            email: session.user.email,
            isAdmin: session.user.email === import.meta.env.VITE_ADMIN_EMAIL,
          });
        } else {
          setUser(null);
        }
        setIsLoading(false);
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);



  const logout = async () => {
    await supabase.auth.signOut();
    setUser(initialDataUser);
    navigate("/login");
  };

  return (
    <authUserContext.Provider value={{ login, user, logout, isLoading }}>
      {children}
    </authUserContext.Provider>
  );
};

export default AuthUserProvider;
export { authUserContext };
