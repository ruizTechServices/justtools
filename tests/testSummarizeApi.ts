import { readFileSync } from "fs";
import { join } from "path";
import { POST } from "../app/api/summarize/route";

(async () => {
  try {
    const pdfPath = join(__dirname, "sample.pdf");
    const buffer = readFileSync(pdfPath);

    // Node 18+ has the Web File & FormData APIs globally available
    const file = new File([buffer], "sample.pdf", {
      type: "application/pdf",
    });

    const form = new FormData();
    form.set("file", file);

    // Minimal mock that satisfies the route's needs
    const mockRequest = {
      formData: async () => form,
    } as any;

    const res = await POST(mockRequest);
    const json = await res.json();

    console.log("✅ API summary length:", json.summary.length);
    console.log("📄 First 200 chars:\n", json.summary.slice(0, 200) + "...");
  } catch (err) {
    console.error("❌ API route test failed:", err);
    process.exit(1);
  }
})();
