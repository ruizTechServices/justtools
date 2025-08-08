"use client";

import UploadForm from "./UploadForm";
import ResultCard from "./ResultCard";
import LoadingSpinner from "./LoadingSpinner";
import { useSummarizer } from "@/hooks/useSummarizer";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function Summarizer() {
  const [{ summary, error, loading }, summarize] = useSummarizer();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">📄 AI PDF Summarizer</CardTitle>
        <CardDescription>
          Upload a PDF and get a concise, high‑quality summary. Works great on mobile and desktop.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <UploadForm isLoading={loading} onSubmit={summarize} />

        {loading && (
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <LoadingSpinner />
            Summarizing your document…
          </div>
        )}

        <ResultCard summary={summary} error={error} />

        <div className="text-xs text-muted-foreground">
          Tip: For best results, prefer text-based PDFs over scanned images.
        </div>
      </CardContent>
    </Card>
  );
}
