import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { supabase } from "../utils/supabaseClient";
import { useNavigate } from "react-router-dom";
const authUserContext = createContext();

const initialDataUser = {
  email: "",
};

const AuthUserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(initialDataUser);

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

    if (data.user) {
      navigate("/");
      setUser({
        email: data.user.email,
        accessToken: data.session.access_token,
        refreshToken: data.session.refresh_token,
      });
    }
  };

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser({
        email: data.session?.user.email ?? "",
      });
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser({
          email: session?.user.email ?? "",
          accessToken: "",
          refreshToken: "",
        });
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(initialDataUser);
    navigate("/login");
  };

  return (
    <authUserContext.Provider value={{ login, user, logout }}>
      {children}
    </authUserContext.Provider>
  );
};

export default AuthUserProvider;
export { authUserContext };
