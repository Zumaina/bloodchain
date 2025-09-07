const STORAGE_KEY = "bc_auth"; // { user, token }

/** Save { user, token } to localStorage */
export const saveAuth = ({ user, token }) => {
  if (!user || !token) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, token }));
};

/** Load { user, token } from localStorage (or null) */
export const loadAuth = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.user && parsed?.token) return parsed;
    return null;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

/** Clear auth from localStorage */
export const clearAuth = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export { STORAGE_KEY };
