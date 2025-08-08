import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Clipboard, Download, Maximize2, Minimize2, Check } from "lucide-react";
import { toast } from "sonner";

interface ResultCardProps {
  summary: string | null;
  error: string | null;
}

export default function ResultCard({ summary, error }: ResultCardProps) {
  // Hooks must be called unconditionally at the top level
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!summary && !error) return null;

  if (error) {
    return (
      <Alert variant="destructive" className="rounded-lg">
        <AlertTitle>Something went wrong</AlertTitle>
        <AlertDescription className="mt-1">{error}</AlertDescription>
      </Alert>
    );
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
      toast.success("Summary copied to clipboard");
    } catch {
      toast.error("Failed to copy");
    }
  };

  const handleDownload = () => {
    const blob = new Blob([summary || ""], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "summary.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-lg border bg-muted/30">
      <div className="flex items-center justify-between gap-2 border-b px-4 py-3">
        <div className="text-sm font-medium text-muted-foreground">Summary</div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleCopy} className="gap-1">
            {copied ? <Check className="size-4" /> : <Clipboard className="size-4" />} {copied ? "Copied" : "Copy"}
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload} className="gap-1">
            <Download className="size-4" /> Download
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setExpanded((v) => !v)} className="gap-1">
            {expanded ? (
              <>
                <Minimize2 className="size-4" /> Collapse
              </>
            ) : (
              <>
                <Maximize2 className="size-4" /> Expand
              </>
            )}
          </Button>
        </div>
      </div>
      <div className={cn(
        "relative px-4 py-4 text-sm leading-7 whitespace-pre-wrap",
        expanded ? "" : "max-h-72 overflow-hidden"
      )}>
        {summary}
        {!expanded && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent" />
        )}
      </div>
    </div>
  );
}
