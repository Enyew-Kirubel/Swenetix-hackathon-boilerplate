import { useState } from 'react';

interface LoginFormProps {
  loading?: boolean;
  error?: string | null;
  onSubmit: (email: string, password: string) => void;
}

export default function LoginForm({ loading = false, error = null, onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      {error && <div className="auth-error">{error}</div>}

      <div className="form-field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="user@example.com"
        />
      </div>

      <div className="form-field">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
      </div>

      <button type="submit" disabled={loading} className="btn-block">
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
}