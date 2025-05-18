// components/TaskTable.tsx
"use client";

import * as React from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  RowSelectionState,
  ColumnDef,
} from "@tanstack/react-table";
import { Task } from "@/data/tasks";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

// 1️⃣ Import Dialog primitives
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export interface TaskTableProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export function TaskTable({ tasks, setTasks }: TaskTableProps) {
  // Table state
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  // 2️⃣ Dialog open state
  const [isDialogOpen, setDialogOpen] = React.useState(false);

  // 3️⃣ New task form state
  const [newTitle, setNewTitle] = React.useState("");
  const [newDue, setNewDue] = React.useState(
    new Date().toISOString().slice(0, 10)
  );
  const [newPriority, setNewPriority] =
    React.useState<Task["priority"]>("medium");

  // 4️⃣ Handlers
  const toggleDone = (id: string, done: boolean) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: done ? "done" : "todo" } : t
      )
    );
  };

  const handleAddTask = () => {
    if (!newTitle.trim()) return;
    const newTask: Task = {
      id: `t${Date.now()}`,
      title: newTitle.trim(),
      due: newDue,
      priority: newPriority,
      status: "todo",
    };
    setTasks((prev) => [newTask, ...prev]);
    // reset form & close dialog
    setNewTitle("");
    setNewDue(new Date().toISOString().slice(0, 10));
    setNewPriority("medium");
    setDialogOpen(false);
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // Column definitions (unchanged)
  const columns = React.useMemo<ColumnDef<Task, unknown>[]>(
    () => [
      {
        id: "done",
        header: "Done",
        enableSorting: false,
        cell: ({ row }) => {
          const done = row.original.status === "done";
          return (
            <Checkbox
              checked={done}
              onCheckedChange={(val) => toggleDone(row.original.id, !!val)}
              aria-label={done ? "Mark not done" : "Mark done"}
            />
          );
        },
      },
      {
        accessorKey: "title",
        header: "Task",
        cell: ({ row }) => row.getValue<string>("title"),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <span className="capitalize">
            {row.getValue<string>("status").replace("-", " ")}
          </span>
        ),
      },
      {
        accessorKey: "priority",
        header: "Priority",
        cell: ({ row }) => {
          const p = row.getValue<Task["priority"]>("priority");
          const bg =
            p === "high"
              ? "bg-red-100 text-red-800"
              : p === "medium"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-green-100 text-green-800";
          return (
            <span className={`px-2 py-1 rounded-full text-sm ${bg} capitalize`}>
              {p}
            </span>
          );
        },
      },
      {
        accessorKey: "due",
        header: "Due",
        cell: ({ row }) =>
          new Date(row.getValue<string>("due")).toLocaleDateString(),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="p-1">
                <span className="sr-only">Actions</span>
                <MoreHorizontal size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() =>
                  toggleDone(row.original.id, row.original.status !== "done")
                }
              >
                {row.original.status === "done" ? "Mark Not Done" : "Mark Done"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleDeleteTask(row.original.id)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [setTasks]
  );

  // Table instance
  const table = useReactTable({
    data: tasks,
    columns,
    enableRowSelection: true,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full">
      {/* Filter + Add via Dialog */}
      <div className="flex items-center gap-2 py-4">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("title")?.setFilterValue(e.target.value)
          }
          className="max-w-sm"
        />

        {/* 5️⃣ Dialog Trigger */}
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Task</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>New Task</DialogTitle>
              <DialogDescription>
                Fill in the details below to add a new task.
              </DialogDescription>
            </DialogHeader>
            {/* Form Fields */}
            <div className="space-y-4 py-2">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <Input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Enter task title"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Due Date
                </label>
                <Input
                  type="date"
                  value={newDue}
                  onChange={(e) => setNewDue(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Priority
                </label>
                <select
                  value={newPriority}
                  onChange={(e) =>
                    setNewPriority(e.target.value as Task["priority"])
                  }
                  className="w-full border rounded px-2 py-1"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddTask}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No tasks found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
