"use client";

import { useAuth } from "@/context/AuthContext";

export default function AuthButton() {
  const { user, loading, loginWithGoogle, logout } = useAuth();

  if (loading) {
    return <button disabled>Loading...</button>;
  }

  if (user) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span>Welcome, {user.displayName || 'User'}</span>
        {user.photoURL && (
          <img
            src={user.photoURL}
            alt="User avatar"
            style={{ width: '30px', height: '30px', borderRadius: '50%' }}
          />
        )}
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  return <button onClick={loginWithGoogle}>Login with Google</button>;
}
