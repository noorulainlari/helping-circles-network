
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
}

const AuthGuard = ({ children, requireAuth = true, requireAdmin = false }: AuthGuardProps) => {
  const { user, role, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !user) {
        navigate('/');
      } else if (!requireAuth && user) {
        // Redirect authenticated users to appropriate dashboard
        if (role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/dashboard');
        }
      } else if (requireAdmin && role !== 'admin') {
        // If user is not admin but trying to access admin area, redirect to regular dashboard
        if (user) {
          navigate('/dashboard');
        } else {
          navigate('/admin'); // Redirect to admin login if not logged in
        }
      }
    }
  }, [user, role, loading, requireAuth, requireAdmin, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (requireAuth && !user) {
    return null;
  }

  if (!requireAuth && user) {
    return null;
  }

  if (requireAdmin && role !== 'admin') {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
