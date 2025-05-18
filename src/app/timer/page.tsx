import { PomodoroTimer } from "@/components/pomodoro-timer";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const accordianData = [
  {
    title: "What is Pomodoro Technique? ",
    description: `The Pomodoro Technique is a time management method developed by Francesco Cirillo in the 1980s. It is a simple yet effective way to boost your productivity by breaking down your work into short, focused intervals (typically 25 minutes) called "Pomodoros", separated by short breaks. This technique helps you stay focused and avoid distractions.`,
  },
  {
    title: "How to use Pomodoro Technique? ",
    description: `
      1. Choose a task you want to work on.
      2. Set the timer for 25 minutes (or another length of time that works for you).
      3. Work on the task without any breaks or interruptions until the timer goes off.
      4. Take a 5-minute break.
      5. Repeat steps 2-4 until you have completed the task or reached the end of your workday.
    `,
  },

  {
    title: "What are the benefits of Pomodoro Technique? ",
    description: `
      1. It helps you stay focused and productive.
      2. It helps you break down complex tasks into smaller, more manageable tasks.
      3. It helps you avoid distractions and stay organized.
    `,
  },
];

const page = () => {
  return (
    <div className="p-6 ">
      <h1 className="text-4xl font-semibold mb-8">Pomodoro Timer</h1>
      <div className="flex items-center justify-center w-[100%] p-4  relative ">
        <PomodoroTimer />
      </div>

      <div className="mt-10  w-[100%]">
        <div className="flex items-center justify-center w-full">
          <Accordion
            type="single"
            collapsible
            className="w-[80%] md:w-[50%] lg:w-[50%]"
          >
            {accordianData.map((item) => (
              <AccordionItem value={item.title} key={item.title}>
                <AccordionTrigger className="text-lg">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="text-lg leading-normal">
                  {item.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default page;
