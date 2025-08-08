import Summarizer from '@/components/app/summarizer/Summarizer';

export default function SummarizerPage() {
  return (
    <div className="w-screen h-screen overflow-hidden flex justify-center items-center">
      <Summarizer />
    </div>
  );
}

// legacy reference start
// ///I want this :
// ///!pip install flask openai PyPDF2 pyngrok --quiet

// # Step 2: Imports & Env
// import os
// from flask import Flask, request, jsonify
// from PyPDF2 import PdfReader
// from openai import OpenAI
// from pyngrok import ngrok

// # Assume your OPENAI_API_KEY is set in Colab env already
// from google.colab import userdata

// openai_client = OpenAI(api_key=userdata.get("OPENAI_API_KEY"))

// # Step 3: Helpers
// def extract_text_from_pdf(path: str) -> str:
//     reader = PdfReader(path)
//     text = []
//     for page in reader.pages:
//         text.append(page.extract_text() or "")
//     return "\n".join(text)

// def summarize_text(text: str, max_tokens: int = 300) -> str:
//     response = openai_client.chat.completions.create(
//         model="gpt-4o-mini",
//         messages=[
//             {"role": "system", "content": "You are a concise summarizer."},
//             {"role": "user", "content": f"Summarize this:\n\n{text}"}
//         ],
//         max_tokens=max_tokens
//     )
//     return response.choices[0].message.content.strip()


// # Step 4: Flask App
// from flask import Flask, request, jsonify
// import os

// app = Flask(__name__)

// @app.route("/summarize", methods=["POST"])
// def summarize_endpoint():
//     print("🔥 POST /summarize hit:", request.files.keys())
//     print("🔥 summarize_endpoint called with files:", request.files)
//     pdf = request.files.get("file")
//     if not pdf or not pdf.filename.lower().endswith(".pdf"):
//         return jsonify({"error": "Please upload a PDF file."}), 400

//     temp_path = f"/tmp/{pdf.filename}"
//     pdf.save(temp_path)

//     try:
//         text = extract_text_from_pdf(temp_path)
//         summary = summarize_text(text)
//         return jsonify({"summary": summary})
//     except Exception as e:
//         return jsonify({"error": str(e)}), 500

// @app.route("/", methods=["GET"])
// def index():
//     return '''
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="utf-8">
//       <title>AI PDF Summarizer</title>
//       <!-- Bootstrap 5 CSS -->
//       <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
//       <!-- Google Font -->
//       <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
//       <style>
//     body {
//       font-family: sans-serif;
//       padding: 2rem;
//       background: #f5f5f5;
//       color: #333;
//     }
//     form {
//       margin-bottom: 1rem;
//     }
//     button {
//       padding: 0.5rem 1rem;
//       border: none;
//       background: #007bff;
//       color: white;
//       border-radius: 4px;
//       cursor: pointer;
//     }
//     button:hover {
//       background: #0056b3;
//     }
//     #result {
//       margin-top: 1rem;
//       padding: 1rem;
//       background: white;
//       border: 1px solid #ddd;
//       border-radius: 4px;
//       white-space: pre-wrap;
//     }
//     .spinner {
//       display: inline-block;
//       width: 1rem;
//       height: 1rem;
//       border: 2px solid #ccc;
//       border-top-color: #007bff;
//       border-radius: 50%;
//       animation: spin 0.8s linear infinite;
//       vertical-align: middle;
//       margin-right: 0.5rem;
//     }
//     @keyframes spin {
//       to { transform: rotate(360deg); }
//     }
//   </style>
//     </head>
//     <body>
//       <div class="container py-5">
//         <div class="row justify-content-center">
//           <div class="col-lg-8 col-md-10">
//             <div class="card shadow-sm">
//               <div class="card-body">
//                 <h2 class="card-title text-center mb-4">📄 AI PDF Summarizer</h2>
//                 <form id="summarize-form" enctype="multipart/form-data">

//                   <input type="file" name="file" accept="application/pdf" required />
//                   <button id="summarize-btn" type="button">Summarize</button>
//                 </form>
//                 <div id="result" class="mt-3"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <!-- JS: Bootstrap bundle for optional components -->
//       <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
// <script>
// document
//   .getElementById('summarize-btn')
//   .addEventListener('click', async () => {
//     const form = document.getElementById('summarize-form');
//     const data = new FormData(form);
//     const resultDiv = document.getElementById('result');
//     resultDiv.innerHTML = '<span class="spinner"></span>Summarizing…';

//     try {
//   const resp = await fetch('/summarize', {
//     method: 'POST',
//     body: data
//   });
//   const json = await resp.json();
//   if (json.error) {
//     resultDiv.textContent = '❌ ' + json.error;
//   } else {
//     // Show the entire JSON object, nicely formatted
//     resultDiv.textContent = JSON.stringify(json, null, 2);
//   }
// } catch (err) {
//   resultDiv.textContent = '💥 Network error: ' + err.message;
// }

//   });

// </script>

//     </body>
//     </html>
//     ''', 200


// # token
// !ngrok config add-authtoken 30tQT19CLKfFMgEXHxywtMemTLS_5DCLLG9pWDmLxp5Mz36x2


// # Step 5: Expose via ngrok
// if __name__ == "__main__":
//     public_url = ngrok.connect(5000).public_url
//     print(f"🚀 Public URL: {public_url}/")
//     app.run(port=5000)
//```
///To be a summarizer in NextJS in my app. I want the above code to be rewritten in NextJS.
//It has to be modular, responsive, and have a good UI.
//All components and functions must be located in `C:\Users\giost\CascadeProjects\websites\passive_income\justtools\lib\functions`
///and `C:\Users\giost\CascadeProjects\websites\passive_income\justtools\components\app\summarizer`
///The ui components are to be located in `C:\Users\giost\CascadeProjects\websites\passive_income\justtools\components\app\summarizer`
//the functions are to be located in `C:\Users\giost\CascadeProjects\websites\passive_income\justtools\lib\functions`
//create ALL tests for functions. created in `C:\Users\giost\CascadeProjects\websites\passive_income\justtools\tests`
//hooks are to be located at `C:\Users\giost\CascadeProjects\websites\passive_income\justtools\hooks` 