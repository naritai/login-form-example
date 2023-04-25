import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const HomeLayout = () => {
  const { auth } = useAuth();
  return auth?.user ? <Navigate to="/" /> : <Outlet />
}

export { HomeLayout };