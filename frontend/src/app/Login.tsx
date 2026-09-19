import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { loginUser, clearAuthError } from '../store/slices/authSlice';
import AuthCard from '../components/auth/AuthCard';
import LoginForm from '../components/auth/LoginForm';

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error } = useAppSelector((state) => state.auth || {});

  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

  const handleSubmit = async (email: string, password: string) => {
    dispatch(clearAuthError());

    try {
      await dispatch(loginUser({ email, password })).unwrap();
      navigate(from, { replace: true });
    } catch {
      // Error handled via Redux state
    }
  };

  return (
    <AuthCard
      title="Sign In"
      footer={
        <>
          Back to <Link to="/">Home</Link>
        </>
      }
    >
      <LoginForm loading={loading} error={error} onSubmit={handleSubmit} />
    </AuthCard>
  );
}