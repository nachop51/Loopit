import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../assets/nobg.gif";

const ProtectedRoute = ({ userStatus, children }) => {
  useAuth(userStatus);

  if (!userStatus) {
    return <img src={LoadingSpinner} alt="Spinner" className="spinner" />;
  }

  return children;
};

export default ProtectedRoute;
