import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TaskTable = () => {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-xl text-zinc-400 font-medium">
            Invoice
          </TableHead>
          <TableHead className="text-xl text-zinc-400 font-medium">
            Status
          </TableHead>
          <TableHead className="text-xl text-zinc-400 font-medium">
            Method
          </TableHead>
          <TableHead className="text-xl text-zinc-400 font-medium">
            Amount
          </TableHead>
          <TableHead className="text-xl text-zinc-400 font-medium">
            Amount
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="text-xl">INV001</TableCell>
          <TableCell className="text-xl">Paid</TableCell>
          <TableCell className="text-xl">Credit Card</TableCell>
          <TableCell className="text-xl">$250.00</TableCell>
          <TableCell className="text-xl">$250.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default TaskTable;
