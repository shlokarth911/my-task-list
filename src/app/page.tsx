// app/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import {
  getWithExpiry,
  setWithExpiry,
  NAME_KEY,
  ONE_DAY,
} from "@/utils/storage";
import { tasks as initialTasks, type Task } from "@/data/tasks";
import { TaskTable } from "@/components/task-table";
import { ProgressBar } from "@/components/progress-bar";
import { ModeToggleButton } from "@/components/mode-toggle-button";

export default function HomePage() {
  // Tasks state (as before)…
  const [tasks, setTasks] = useState<Task[]>([]);
  const [name, setName] = useState("");

  // Load tasks cache
  useEffect(() => {
    const cached = getWithExpiry<Task[]>("task-app-cache");
    setTasks(cached ?? initialTasks);
  }, []);

  // Persist tasks
  useEffect(() => {
    if (tasks.length) {
      setWithExpiry("task-app-cache", tasks, ONE_DAY);
    }
  }, [tasks]);

  // Load name cache
  useEffect(() => {
    const cachedName = getWithExpiry<string>(NAME_KEY);
    if (cachedName) setName(cachedName);
  }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Morning" : hour < 18 ? "Afternoon" : "Evening";

  return (
    <div className="p-6 w-full relative">
      <div className="fixed top-[2%] left-[100%] transform -translate-x-15">
        <ModeToggleButton />
      </div>

      <h1 className="text-2xl">Good {greeting},</h1>
      <h2 className="text-4xl font-bold mt-2">{name || "Champion"}</h2>

      <div className="grid md:grid-cols-[3fr,1fr] gap-6 mt-8">
        <TaskTable tasks={tasks} setTasks={setTasks} />
        <ProgressBar tasks={tasks} />
      </div>
    </div>
  );
}
