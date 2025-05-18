import Link from "next/link";
import React from "react";
import { buttonVariants } from "@/components/ui/button";
import { Github } from "lucide-react";

const page = () => {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-semibold">About</h1>

      <p className="mt-4 text-lg w-[80%]">
        This project is a comprehensive web application designed to enhance
        productivity and organization through a variety of tools and features.
        It offers a Pomodoro timer to help users manage their time effectively,
        a task table for tracking and organizing tasks, and a sidebar for easy
        navigation. The application is built with a focus on user experience,
        providing a clean and intuitive interface. It leverages modern web
        technologies to ensure performance and scalability, making it suitable
        for both individual users and teams. The project aims to streamline
        workflow processes and improve overall efficiency.
      </p>
      <div className="mt-16 text-lg w-[80%]">
        <h2 className="text-2xl font-semibold">
          Made by
          <span className="text-indigo-500">
            {" "}
            <Link href="https://github.com/shlokarth911">Shlok Arth</Link>
          </span>
        </h2>

        <div className="mt-4">
          <Link
            href={"https://github.com/shlokarth911/progrss_pad"}
            className={buttonVariants({ variant: "outline" })}
          >
            <Github color="#ffffff" />
            <span className="text-xl">GitHub Repo</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
