import { Navigate } from 'react-router-dom';
import useCurrentUser from '../hooks/useCurrentUser';

export default function ProtectedRoute({ children, requiredRole }) {
  const user = useCurrentUser();

  if (!user) return <Navigate to="/login" />;
  if (requiredRole && user.role !== requiredRole) return <Navigate to="/" />;

  return children;
}
