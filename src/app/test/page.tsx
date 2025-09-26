"use client";
import { Button } from "@/components/ui/button";
import { quickMsg } from "@/components/ui/sonner";
import { DataTableDemo } from "./components/table";
import { UploadFile } from "./components/upload-file";
export default function Test() {
  return (
    <div>
      <h1>Test</h1>
      <Button onClick={() => quickMsg.success("Event has been created")}>
        Test
      </Button>

      <UploadFile />
    </div>
  );
}
