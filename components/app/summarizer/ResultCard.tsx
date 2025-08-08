import { cn } from "@/lib/utils";

interface ResultCardProps {
  summary: string | null;
  error: string | null;
}

export default function ResultCard({ summary, error }: ResultCardProps) {
  if (!summary && !error) return null;

  const cardClass = cn(
    "rounded-lg border p-4 whitespace-pre-wrap",
    error ? "border-destructive/50 bg-destructive/20 text-destructive" : "bg-background",
  );

  return (
    <div className={cardClass}>
      {error ? `❌ ${error}` : summary}
    </div>
  );
}
