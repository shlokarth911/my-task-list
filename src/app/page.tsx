import { TaskTable } from "@/components/task-table";
import React from "react";

const page = () => {
  const currentHour = new Date().getHours();
  let greeting = "";

  if (currentHour < 12) {
    greeting = "Morning";
  } else if (currentHour < 18) {
    greeting = "Afternoon";
  } else {
    greeting = "Evening";
  }

  return (
    <div className="flex w-full">
      <div className="p-6 w-[82vw]">
        <h1 className="text-2xl md:1xl">Good {greeting}, </h1>

        <h1 className="text-5xl mt-2 ">Shlok Arth</h1>

        <div className="w-[100%] mt-8 position-relative ">
          <TaskTable />
        </div>
      </div>
    </div>
  );
};

export default page;
