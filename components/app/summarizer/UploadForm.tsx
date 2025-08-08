"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

interface UploadFormProps {
  isLoading: boolean;
  onSubmit: (file: File) => void;
}

export default function UploadForm({ isLoading, onSubmit }: UploadFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    const file = fileInputRef.current?.files?.[0];
    if (file) {
      onSubmit(file);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        className="file-input file-input-bordered"
        disabled={isLoading}
      />
      <button
        type="button"
        onClick={handleClick}
        disabled={isLoading}
        className={cn(
          "btn btn-primary self-start",
          isLoading && "opacity-50 cursor-not-allowed",
        )}
      >
        {isLoading ? "Summarizing…" : "Summarize"}
      </button>
    </div>
  );
}
