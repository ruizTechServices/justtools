"use client";

import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { UploadCloud, FileText, X } from "lucide-react";
import { toast } from "sonner";

interface UploadFormProps {
  isLoading: boolean;
  onSubmit: (file: File) => void;
}

const MAX_SIZE_MB = 15;

export default function UploadForm({ isLoading, onSubmit }: UploadFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selected, setSelected] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const validateFile = useCallback((file: File): boolean => {
    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file.");
      return false;
    }
    const sizeMb = file.size / (1024 * 1024);
    if (sizeMb > MAX_SIZE_MB) {
      toast.error(`File is too large. Max ${MAX_SIZE_MB}MB.`);
      return false;
    }
    return true;
  }, []);

  const onFileSelect = useCallback((file?: File | null) => {
    if (!file) return;
    if (!validateFile(file)) return;
    setSelected(file);
  }, [validateFile]);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    onFileSelect(file ?? null);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    onFileSelect(file ?? null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleSummarize = () => {
    const file = selected ?? fileInputRef.current?.files?.[0] ?? null;
    if (!file) {
      toast("Select a PDF to summarize.");
      return;
    }
    onSubmit(file);
  };

  const clearSelection = () => {
    setSelected(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const fileMeta = selected
    ? `${selected.name} · ${(selected.size / (1024 * 1024)).toFixed(2)} MB`
    : "No file selected";

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-3">
        <Label htmlFor="pdf" className="text-sm text-muted-foreground">
          Upload a PDF (max {MAX_SIZE_MB}MB)
        </Label>

        <Label
          htmlFor="pdf"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            "rounded-xl border-2 border-dashed p-6 text-center cursor-pointer select-none",
            "transition-colors hover:bg-accent",
            dragActive && "border-primary bg-accent",
            isLoading && "pointer-events-none opacity-70"
          )}
        >
          <div className="flex flex-col items-center gap-2">
            <UploadCloud className="size-6 text-muted-foreground" />
            <div className="text-sm text-muted-foreground">
              Drag & drop your PDF here, or click to browse
            </div>
          </div>
          <input
            id="pdf"
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            disabled={isLoading}
            onChange={handleFileInputChange}
            className="sr-only"
          />
        </Label>

        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <FileText className="size-4" />
            <span className="truncate max-w-[240px] sm:max-w-[360px]">{fileMeta}</span>
          </div>
          {selected && (
            <Button variant="ghost" size="sm" onClick={clearSelection} className="gap-1">
              <X className="size-4" /> Clear
            </Button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button onClick={handleSummarize} disabled={isLoading} className="gap-2">
          {isLoading && (
            <span className="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          )}
          {isLoading ? "Summarizing…" : "Summarize"}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading}
        >
          Choose PDF
        </Button>
      </div>
    </div>
  );
}
