type Task = {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "done";
  priority: "high" | "medium" | "low";
  description: string;
  progress: number;
};

export const tasks: Task[] = [
  {
    id: "1",
    title: "Task 1",
    status: "todo",
    priority: "high",
    description: "Description of Task 1",
    progress: 50,
  },
  {
    id: "2",
    title: "Task 2",
    status: "in-progress",
    priority: "medium",
    description: "Description of Task 2",
    progress: 20,
  },
  {
    id: "3",
    title: "Task 3",
    status: "done",
    priority: "low",
    description: "Description of Task 3",
    progress: 100,
  },
  {
    id: "4",
    title: "Task 4",
    status: "todo",
    priority: "medium",
    description: "Description of Task 4",
    progress: 0,
  },
  {
    id: "5",
    title: "Task 5",
    status: "in-progress",
    priority: "high",
    description: "Description of Task 5",
    progress: 75,
  },
  {
    id: "6",
    title: "Task 6",
    status: "done",
    priority: "medium",
    description: "Description of Task 6",
    progress: 100,
  },
  {
    id: "7",
    title: "Task 7",
    status: "todo",
    priority: "low",
    description: "Description of Task 7",
    progress: 10,
  },
  {
    id: "8",
    title: "Task 8",
    status: "in-progress",
    priority: "high",
    description: "Description of Task 8",
    progress: 60,
  },
  {
    id: "9",
    title: "Task 9",
    status: "done",
    priority: "low",
    description: "Description of Task 9",
    progress: 100,
  },
  {
    id: "10",
    title: "Task 10",
    status: "todo",
    priority: "medium",
    description: "Description of Task 10",
    progress: 5,
  },
];
