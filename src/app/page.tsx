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
  // Existing state and effects remain unchanged
  const [tasks, setTasks] = useState<Task[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    const cached = getWithExpiry<Task[]>("task-app-cache");
    setTasks(cached ?? initialTasks);
  }, []);

  useEffect(() => {
    if (tasks.length) {
      setWithExpiry("task-app-cache", tasks, ONE_DAY);
    }
  }, [tasks]);

  useEffect(() => {
    const cachedName = getWithExpiry<string>(NAME_KEY);
    if (cachedName) setName(cachedName);
  }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Morning" : hour < 18 ? "Afternoon" : "Evening";

  return (
    <div className="p-4 md:p-6 w-full relative max-w-7xl mx-auto">
      {/* Improved mobile positioning for theme toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ModeToggleButton />
      </div>

      {/* Header section */}
      <div className="mb-8">
        <h1 className="text-xl md:text-2xl">Good {greeting},</h1>
        <h2 className="text-3xl md:text-4xl font-bold mt-1 md:mt-2">
          {name || "Champion"}
        </h2>
      </div>

      {/* Main content grid */}
      <div className="grid lg:grid-cols-[3fr,1fr] gap-6">
        {/* Task Table - always first in flow */}
        <div className="order-1 lg:order-none">
          <TaskTable tasks={tasks} setTasks={setTasks} />
        </div>

        {/* Functionalities and Progress - stacked on mobile */}
        <div className="order-2 space-y-8">
          {/* Functionalities card */}
          <div className="bg-card rounded-lg p-4 md:p-6 shadow-sm">
            <h2 className="text-lg md:text-xl font-semibold">
              Functionalities
            </h2>
            <ul className="list-disc pl-5 md:pl-6 mt-2 md:mt-3 space-y-2 text-sm md:text-base">
              <li>Create, Read, Update and Delete tasks</li>
              <li>Filter tasks by name, status and due date</li>
              <li>Sort tasks by name, status and due date</li>
              <li>Drag and Drop tasks to reorder them</li>
              <li>Save tasks to local storage</li>
              <li>Auto-save tasks every 1 second</li>
              <li>Persist the user's name</li>
              <li>Toggle between light and dark mode</li>
            </ul>
          </div>

          {/* Progress Bar */}
          <div className="lg:sticky lg:top-20">
            <ProgressBar tasks={tasks} />
          </div>
        </div>
      </div>
    </div>
  );
}
