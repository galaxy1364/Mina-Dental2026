/**
 * Authentication state. Backed by Supabase Auth, with the active session mirrored
 * into the local SQLite cache so the app can authorize while offline.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { eq } from 'drizzle-orm';
import { db } from '@/core/db/client';
import { userSessionCache } from '@/core/db/schema';
import { AppError } from '@/core/errors/AppError';
import { createLogger } from '@/core/logger/logger';
import { getSupabase, isCloudConfigured } from '@/core/supabase/client';

const log = createLogger('auth');
const CACHE_ID = 'current';

export interface Session {
  userId: string;
  email: string | null;
  role: string | null;
  clinicId: string | null;
  displayName: string | null;
}

type Status = 'loading' | 'authenticated' | 'unauthenticated';

interface AuthState {
  status: Status;
  session: Session | null;
  cloudConfigured: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

function readCachedSession(): Session | null {
  const row = db.select().from(userSessionCache).where(eq(userSessionCache.id, CACHE_ID)).get();
  if (!row) return null;
  return {
    userId: row.userId,
    email: row.email,
    role: row.role,
    clinicId: row.clinicId,
    displayName: row.displayName,
  };
}

function writeCachedSession(s: Session): void {
  db.delete(userSessionCache).where(eq(userSessionCache.id, CACHE_ID)).run();
  db.insert(userSessionCache)
    .values({
      id: CACHE_ID,
      userId: s.userId,
      email: s.email,
      role: s.role,
      clinicId: s.clinicId,
      displayName: s.displayName,
    })
    .run();
}

function clearCachedSession(): void {
  db.delete(userSessionCache).where(eq(userSessionCache.id, CACHE_ID)).run();
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<Status>('loading');
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      const cached = readCachedSession();
      if (!isCloudConfigured()) {
        if (active) {
          setSession(cached);
          setStatus(cached ? 'authenticated' : 'unauthenticated');
        }
        return;
      }
      try {
        const supabase = getSupabase();
        const { data } = await supabase.auth.getSession();
        if (!active) return;
        if (data.session?.user) {
          const next = mapSession(data.session.user);
          writeCachedSession(next);
          setSession(next);
          setStatus('authenticated');
        } else {
          setSession(cached);
          setStatus(cached ? 'authenticated' : 'unauthenticated');
        }
      } catch (err) {
        log.warn('Session bootstrap failed; using cache', { err: String(err) });
        if (active) {
          setSession(cached);
          setStatus(cached ? 'authenticated' : 'unauthenticated');
        }
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    if (!isCloudConfigured()) throw new AppError('CONFIG_MISSING');
    const supabase = getSupabase();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.user) throw new AppError('AUTH_INVALID_CREDENTIALS', { cause: error });
    const next = mapSession(data.user);
    writeCachedSession(next);
    setSession(next);
    setStatus('authenticated');
    log.info('Signed in', { role: next.role ?? 'unknown' });
  }, []);

  const signOut = useCallback(async () => {
    if (isCloudConfigured()) {
      try {
        await getSupabase().auth.signOut();
      } catch (err) {
        log.warn('Cloud sign-out failed', { err: String(err) });
      }
    }
    clearCachedSession();
    setSession(null);
    setStatus('unauthenticated');
  }, []);

  const value = useMemo<AuthState>(
    () => ({ status, session, cloudConfigured: isCloudConfigured(), signIn, signOut }),
    [status, session, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function mapSession(user: { id: string; email?: string; user_metadata?: Record<string, unknown> }): Session {
  const meta = user.user_metadata ?? {};
  return {
    userId: user.id,
    email: user.email ?? null,
    role: typeof meta.role === 'string' ? meta.role : null,
    clinicId: typeof meta.clinic_id === 'string' ? meta.clinic_id : null,
    displayName: typeof meta.display_name === 'string' ? meta.display_name : null,
  };
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
