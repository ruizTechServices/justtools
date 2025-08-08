import { NextResponse } from "next/server";
import extractTextFromPdf from "@/lib/functions/extractTextFromPdf";
import summarizeText from "@/lib/functions/summarizeText";

// Ensure this route runs in the Node runtime (not Edge) so we can use Buffer & pdf-parse
export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    if (!file.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json({ error: "Please upload a PDF file." }, { status: 400 });
    }

    // Convert to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const text = await extractTextFromPdf(buffer);
    const summary = await summarizeText(text);

    return NextResponse.json({ summary });
  } catch (error: unknown) {
    console.error("[summarize]", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
