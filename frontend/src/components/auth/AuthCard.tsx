import type { ReactNode } from 'react';

interface AuthCardProps {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

export default function AuthCard({ title, children, footer }: AuthCardProps) {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">{title}</h2>
        {children}
        {footer && <p className="auth-footer">{footer}</p>}
      </div>
    </div>
  );
}