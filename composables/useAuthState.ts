interface User {
  email: string;
  name: string;
  image?: string | null;
}

interface AuthData {
  user: User | null;
}

const AUTH_COOKIE_KEY = 'surprise_me_auth_user';

export const useAuthState = () => {
  const userCookie = useCookie<User | null>(AUTH_COOKIE_KEY, {
    default: () => null,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    httpOnly: false,
    secure: true,
    sameSite: 'lax'
  });

  const user = useState<User | null>('auth.user', () => userCookie.value);
  const isAuthenticated = computed(() => !!user.value);
  const status = computed(() => isAuthenticated.value ? 'authenticated' : 'unauthenticated');

  const setUser = (userData: User | null) => {
    user.value = userData;
    userCookie.value = userData;
  };

  const clearUser = () => {
    user.value = null;
    userCookie.value = null;
  };

  // Return data in format compatible with the old useAuth
  const data = computed<AuthData | null>(() => {
    if (!user.value) return null;
    return { user: user.value };
  });

  return {
    user: readonly(user),
    isAuthenticated: readonly(isAuthenticated),
    status: readonly(status),
    data: readonly(data),
    setUser,
    clearUser,
  };
};