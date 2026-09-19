export const TASKS_CACHE_KEY = "taskboard_tasks_cache";
export const OUTBOX_KEY = "taskboard_outbox";
export const USER_KEY = "taskboard_user";

export function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJSON(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
  }
}

export function removeKey(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
  }
}