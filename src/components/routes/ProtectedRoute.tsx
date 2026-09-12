import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../../hooks/useSession";


function ProtectedRoute() {
  const { data: session, isLoading, isError } = useSession();

  if (isLoading) {
    return (
      <div>
        <span></span>
      </div>
    );
  }

  if (isError || !session) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

export default ProtectedRoute;
