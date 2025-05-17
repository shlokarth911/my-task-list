"use client";

import * as React from "react";

import { Calendar } from "@/components/ui/calendar";

export default function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 scale-150">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border shadow"
      />

      <p className="text-center text-zinc-600 mt-2">**Just a calender**</p>
    </div>
  );
}
