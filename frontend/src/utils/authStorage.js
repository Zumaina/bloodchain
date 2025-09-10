const STORAGE_KEY = "bc_auth";

export const saveAuth = ({ user, token }) => {
  if (!user || !token) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, token }));
};

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

export const clearAuth = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export { STORAGE_KEY };
