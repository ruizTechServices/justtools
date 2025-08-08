"use client";

import { useState, useCallback } from "react";

interface SummaryState {
  summary: string | null;
  error: string | null;
  loading: boolean;
}

export function useSummarizer(): [SummaryState, (file: File) => void] {
  const [state, setState] = useState<SummaryState>({
    summary: null,
    error: null,
    loading: false,
  });

  const summarize = useCallback((file: File) => {
    setState({ summary: null, error: null, loading: true });

    const form = new FormData();
    form.append("file", file);

    fetch("/api/summarize", {
      method: "POST",
      body: form,
    })
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) {
          throw new Error(json.error || "Failed to summarize");
        }
        setState({ summary: json.summary as string, error: null, loading: false });
      })
      .catch((err: Error) => {
        setState({ summary: null, error: err.message, loading: false });
      });
  }, []);

  return [state, summarize];
}
