import openaiClient from "@/lib/clients/openai/client";

/**
 * Calls the OpenAI Chat Completion endpoint with a concise summarization prompt.
 *
 * @param text - The full text to summarize.
 * @param maxTokens - The maximum tokens for the summary (default 300).
 * @returns The summary string returned by OpenAI.
 */
export default async function summarizeText(
  text: string,
  maxTokens = 300,
): Promise<string> {
  const response = await openaiClient.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a concise summarizer." },
      { role: "user", content: `Summarize this:\n\n${text}` },
    ],
    max_tokens: maxTokens,
  });

  return response.choices[0].message.content?.trim() ?? "";
}
