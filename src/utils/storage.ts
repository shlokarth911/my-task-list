// utils/storage.ts
/**
 * Save a JSON-serializable value to localStorage with a TTL.
 * @param key Storage key
 * @param value Data to store
 * @param ttl Time-to-live in ms
 */

export const NAME_KEY = "task-app-user-name";
export const ONE_DAY = 24 * 60 * 60 * 1000;
export const ACCENT_KEY = "task-app-accent";

export function setWithExpiry<T>(key: string, value: T, ttl: number) {
  const now = Date.now();
  const record = { value, expiry: now + ttl };
  localStorage.setItem(key, JSON.stringify(record));
}

/**
 * Retrieve a stored value, returning null if missing or expired.
 * @param key Storage key
 */
export function getWithExpiry<T>(key: string): T | null {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;
  try {
    const record = JSON.parse(itemStr) as { value: T; expiry: number };
    if (Date.now() > record.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return record.value;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
}
