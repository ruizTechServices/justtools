"use client";

import UploadForm from "./UploadForm";
import ResultCard from "./ResultCard";
import LoadingSpinner from "./LoadingSpinner";
import { useSummarizer } from "@/hooks/useSummarizer";

export default function Summarizer() {
  const [{ summary, error, loading }, summarize] = useSummarizer();

  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">📄 AI PDF Summarizer</h1>

      <UploadForm isLoading={loading} onSubmit={summarize} />

      {loading && <LoadingSpinner className="self-start" />}

      <ResultCard summary={summary} error={error} />
    </section>
  );
}
