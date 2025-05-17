// data/tasks.ts
export type Task = {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "done";
  priority: "high" | "medium" | "low";
  due: string; // ISO date string
};

export const tasks: Task[] = [
  // {
  //   id: "t1",
  //   title: "Design UI blocks",
  //   status: "todo",
  //   priority: "high",
  //   due: "2025-05-20",
  // },
  // {
  //   id: "t2",
  //   title: "Implement table",
  //   status: "in-progress",
  //   priority: "medium",
  //   due: "2025-05-21",
  // },
  // {
  //   id: "t3",
  //   title: "Add dark mode",
  //   status: "done",
  //   priority: "low",
  //   due: "2025-05-19",
  // },
  //this was a dummy data for test purposes
];
