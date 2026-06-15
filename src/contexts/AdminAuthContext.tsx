import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

const ADMIN_SESSION_KEY = 'admin_session';
const SESSION_DURATION_MS = 2 * 60 * 60 * 1000;

interface AdminSession {
  email: string;
  password: string;
  expiresAt: number;
}

interface AdminAuthContextType {
  isAuthenticated: boolean;
  adminEmail: string | null;
  adminPassword: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

function getStoredSession(): AdminSession | null {
  try {
    const raw = sessionStorage.getItem(ADMIN_SESSION_KEY);
    if (!raw) return null;
    const session: AdminSession = JSON.parse(raw);
    if (Date.now() > session.expiresAt) {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AdminSession | null>(getStoredSession);

  useEffect(() => {
    const interval = setInterval(() => {
      const stored = getStoredSession();
      if (!stored && session) {
        setSession(null);
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [session]);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data, error } = await supabase.rpc('verify_admin_login', {
        p_email: email,
        p_password: password,
      });

      if (error) {
        return { success: false, error: 'სერვერის შეცდომა. სცადეთ თავიდან.' };
      }

      if (!data) {
        return { success: false, error: 'არასწორი ელ.ფოსტა ან პაროლი.' };
      }

      const newSession: AdminSession = {
        email,
        password,
        expiresAt: Date.now() + SESSION_DURATION_MS,
      };

      sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(newSession));
      setSession(newSession);
      return { success: true };
    } catch {
      return { success: false, error: 'კავშირის შეცდომა. შეამოწმეთ ინტერნეტი.' };
    }
  };

  const logout = () => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setSession(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated: session !== null,
        adminEmail: session?.email ?? null,
        adminPassword: session?.password ?? null,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
