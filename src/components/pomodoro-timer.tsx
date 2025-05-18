// components/pomodoro-timer.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { CircularProgress } from "./circular-progress";

const WORK_DURATION = 25 * 60; // 25 minutes in seconds
const BREAK_DURATION = 5 * 60; // 5 minutes in seconds

export function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(WORK_DURATION);
  const [isWorking, setIsWorking] = useState(true);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerEnd();
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleTimerEnd = () => {
    setIsActive(false);
    alert(
      isWorking
        ? "Work session ended! Take a break!"
        : "Break ended! Back to work!"
    );
    toggleSession();
  };

  const toggleSession = () => {
    setIsWorking(!isWorking);
    setTimeLeft(isWorking ? BREAK_DURATION : WORK_DURATION);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(isWorking ? WORK_DURATION : BREAK_DURATION);
  };

  const progressValue =
    ((isWorking ? WORK_DURATION - timeLeft : BREAK_DURATION - timeLeft) /
      (isWorking ? WORK_DURATION : BREAK_DURATION)) *
    100;

  return (
    <Card className="w-100">
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          {isWorking ? "⏳ Work Session" : "☕ Break Time"}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6">
        <div className="relative">
          <CircularProgress
            value={progressValue}
            size={240}
            strokeWidth={10}
            className="text-primary"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold text-foreground">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center gap-4">
        <Button
          variant={isActive ? "destructive" : "default"}
          onClick={() => setIsActive(!isActive)}
          className="px-8 py-4 text-lg"
        >
          {isActive ? " Pause" : " Start"}
        </Button>
        <Button
          variant="outline"
          onClick={resetTimer}
          className="px-8 py-4 text-lg"
        >
          Reset
        </Button>
      </CardFooter>
    </Card>
  );
}
