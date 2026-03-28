import { useContext } from "react";
import { authUserContext } from "./AuthUserContext";
import { Navigate, useLocation } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(authUserContext);

  const location = useLocation();
  // وهو بيعمل ريفريش لسه الموقع معرفش اليوزر كان مسجل ولا لا ولو هو علي صفحه لوحه التحكم يبقي كان مسجل
  if (location.pathname == "/dashboard") return <Dashboard />;
  if (!user.email) return <Navigate to="/login" replace />;

  return children;
};

export default PrivateRoute;
