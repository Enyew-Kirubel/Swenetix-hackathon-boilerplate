import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store/hook';

export default function ProtectedRoute({ children }: { children?: ReactNode }) {
  const location = useLocation();
  const { isAuthenticated } = useAppSelector((state) => state.auth || {});

  if (!isAuthenticated) {
    // Redirect to /login and preserve attempted URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}