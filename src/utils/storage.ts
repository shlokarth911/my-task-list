// utils/storage.ts
/**
 * Save a JSON-serializable value to localStorage with a TTL.
 * @param key Storage key
 * @param value Data to store
 * @param ttl Time-to-live in ms
 */

import { Task } from "@/data/tasks";

export const NAME_KEY = "task-app-user-name";
export const ONE_DAY = 24 * 60 * 60 * 1000;
export const ACCENT_KEY = "task-app-accent";
export const TASKS_KEY = "task-app-tasks";

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

/**
 * Adds a new task to the storage
 * @param task Task to add
 */
export function addTask(task: Task) {
  const tasks = getWithExpiry<Task[]>(TASKS_KEY) ?? [];
  tasks.push(task);
  setWithExpiry(TASKS_KEY, tasks, ONE_DAY);
}

/**
 * Deletes a task from the storage
 * @param id Task id to delete
 */
export function deleteTask(id: string) {
  const tasks = getWithExpiry<Task[]>(TASKS_KEY) ?? [];
  const newTasks = tasks.filter((task) => task.id !== id);
  setWithExpiry(TASKS_KEY, newTasks, ONE_DAY);
  updateProgress();
}

/**
 * Updates the progress bar
 */
export function updateProgress() {
  const tasks = getWithExpiry<Task[]>(TASKS_KEY) ?? [];
  const completed = tasks.filter((task) => task.status === "done").length;
  const total = tasks.length;
  const progress = total ? (completed / total) * 100 : 0;
  setWithExpiry("task-app-progress", progress, ONE_DAY);
}
