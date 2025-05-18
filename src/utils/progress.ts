import { Task } from "@/data/tasks";
import { getWithExpiry, ONE_DAY, setWithExpiry } from "./storage";

export function updateProgress() {
  const tasks = getWithExpiry<Task[]>("task-app-tasks") ?? [];
  const target = getCompletionPercent(tasks);
  setWithExpiry("task-app-progress", target, ONE_DAY);
}

export function getCompletionPercent(tasks: Task[]): number {
  if (tasks.length === 0) return 0;
  const doneCount = tasks.filter((t) => t.status === "done").length;
  return Math.round((doneCount / tasks.length) * 100);
}
