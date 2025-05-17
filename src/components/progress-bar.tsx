"use client";

import * as React from "react";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2 } from "lucide-react";

export interface ProgressBarProps {
  tasks: { status: "todo" | "in-progress" | "done" }[];
}

export function ProgressBar({ tasks }: ProgressBarProps) {
  // Compute completion percentage
  const target = React.useMemo(() => {
    if (!tasks.length) return 0;
    return Math.round(
      (tasks.filter((t) => t.status === "done").length / tasks.length) * 100
    );
  }, [tasks]);

  // Animate count-up
  const [display, setDisplay] = React.useState(0);
  React.useEffect(() => {
    let start = display;
    const end = target;
    const duration = 800;
    const stepTime = Math.abs(Math.floor(duration / (end - start || 1)));
    const timer = setInterval(() => {
      start += start < end ? 1 : -1;
      setDisplay(start);
      if (start === end) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [target]);

  // Filled bar color: accent if complete
  const fillColor =
    target === 100
      ? "bg-green-500 dark:bg-green-400"
      : "bg-indigo-500 dark:bg-indigo-400";

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={target}
      className="w-full fixed top-full left-[50%] transform -translate-x-1/2 -translate-y-[120%]  max-w-md p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg shadow-lg"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-xl text-gray-700 dark:text-gray-200">
          Progress
        </span>
        <div className="flex items-center space-x-1">
          <span className="font-bold text-gray-800 dark:text-gray-100">
            {display}%
          </span>
          {target === 100 && (
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          )}
        </div>
      </div>
      <div className="relative h-4 rounded-full overflow-hidden bg-gray-300 dark:bg-zinc-600">
        <div
          className={`absolute inset-0 ${fillColor} transition-[width] ease-out duration-700`}
          style={{ width: `${target}%` }}
        />
        {/* Animated stripes overlay */}
        <div
          className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(110, 110, 110, 0.986),rgba(255, 255, 255, 0.644)10px,transparent10px,transparent20px)] animate-stripes"
          style={{ width: `${target}%` }}
        />
      </div>
      <style jsx>{`
        @keyframes stripes {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 40px 0;
          }
        }
        .animate-stripes {
          animation: stripes 1s linear infinite;
        }
      `}</style>
    </div>
  );
}
