"use client";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/dropzone";
import { useState } from "react";

import CryptoJS from "crypto-js";
import { Button } from "@/components/ui/button";

interface FileData {
  file: File;
  checksum: string;
}

export const UploadFile = () => {
  const [files, setFiles] = useState<FileData[] | undefined>();

  const calculateChecksum = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer);
    return CryptoJS.MD5(wordArray).toString();
  };

  const handleDrop = async (droppedFiles: File[]) => {
    console.log(droppedFiles);

    const filesWithChecksums = await Promise.all(
      droppedFiles.map(async (file) => {
        const checksum = await calculateChecksum(file);
        return {
          file,
          checksum
        };
      })
    );

    console.log("Files with checksums:", filesWithChecksums);

    setFiles(filesWithChecksums);
  };
  return (
    <div>
      <Dropzone
        //   accept={{ "image/*": [] }}
        maxFiles={10}
        //   maxSize={1024 * 1024 * 10}
        //   minSize={1024}
        onDrop={handleDrop}
        onError={console.error}
        src={files?.map(f => f.file)}
      >
        <DropzoneEmptyState />
        <DropzoneContent />
      </Dropzone>

      {files && files.length > 0 && (
        <div className="mt-4 space-y-2">
          <h3 className="text-lg font-medium">Files with Checksums:</h3>
          {files.map((fileData, index) => (
            <div key={index} className="p-3 border rounded-lg bg-gray-50">
              <div className="font-medium">{fileData.file.name}</div>
              <div className="text-sm text-gray-600">
                Size: {fileData.file.size} bytes
              </div>
              <div className="text-sm text-gray-600 font-mono break-all">
                MD5: {fileData.checksum}
              </div>
            </div>
          ))}
        </div>
      )}

      <Button onClick={() => uploadFiles(files)}>Upload</Button>
    </div>
  );
};

const uploadFiles = async (files: FileData[] | undefined) => {
  if (!files || files.length === 0) {
    alert("Please select files first");
    return;
  }

  const formData = new FormData();
  const checksums: string[] = [];

  // 添加文件和收集校验和
  files.forEach((fileData) => {
    formData.append("files", fileData.file);
    checksums.push(fileData.checksum);
  });

  // 只添加 checksums 字段
  formData.append("checksums", JSON.stringify(checksums));

  try {
    const response = await fetch("http://localhost:3000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log("Upload response:", data);
    console.log("Checksums sent:", checksums);

    if (data.success) {
      alert(`Upload successful! ${data.message}`);
    } else {
      alert(`Upload failed: ${data.message}`);
    }
  } catch (error) {
    console.error("Upload error:", error);
    alert("Upload failed: Network error");
  }
};
