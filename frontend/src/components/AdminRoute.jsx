import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminRoute() {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to="/" replace />;
}

export default AdminRoute;
