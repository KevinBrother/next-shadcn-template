"use client";
import { DataTable } from "@/components/data-table/data-table2";
// import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/hooks/use-data-table";

import React, { useEffect, useState } from "react";
import { columns } from "./columns";
import z from "zod";
import { taskSchema, TaskType } from "./schema";

export const runtime = "edge";

async function getTasks() {
  // const res = await import("./data");
  // const data = await res.getTaskData();
  const res = await fetch("test/api");
  const data = await res.json();
  if (!data) {
    throw new Error("Failed to fetch data");
  }

  // ** Workaround as my mock api has date returned as "dd-Mon-yyyy"
  const tasks = z.array(taskSchema).parse(
    data.map((task: any) => {
      task.due_date = new Date(Date.parse(task.due_date));
      return task;
    })
  );
  return tasks;
}
export function DataTableDemo() {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    getTasks().then((data) => setTasks(data));
  }, []);

  const { table } = useDataTable({
    data: tasks,
    columns,
    pageCount: 2,
    initialState: {
      sorting: [{ id: "title", desc: true }],
      columnPinning: { right: ["actions"] },
    },
    getRowId: (row) => row.id,
  });

  // console.log("table", table);

  return (
    <div className="data-table-container">
      {/* <DataTable table={table}></DataTable> */}
      <DataTable data={tasks} columns={columns}></DataTable>
    </div>
  );
}
