import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Contact Form Submission
  // In a real production app, you would integrate Resend, SendGrid, or a database here.
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, company, budget, message } = req.body;
      
      console.log("New Lead Received:", { name, email, company, budget, message });

      // SIMULATION: Sending an email or storing in DB
      // Example: await resend.emails.send({ ... })

      res.status(200).json({ 
        success: true, 
        message: "Thank you! We've received your inquiry and will reach out shortly." 
      });
    } catch (error) {
      console.error("Submission Error:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred. Please try again or email us directly." 
      });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`OPSIYS Server running at http://localhost:${PORT}`);
  });
}

startServer();
