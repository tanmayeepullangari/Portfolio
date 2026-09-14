import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "*";

// Middleware
app.use(cors({
  origin: ALLOWED_ORIGIN === "*" ? "*" : [ALLOWED_ORIGIN, "http://localhost:5173", "http://127.0.0.1:5173"]
}));
app.use(express.json());

// Paths (loaded from env variables if specified, or default local relative paths)
const projectsFilePath = process.env.PROJECTS_FILE_PATH
  ? path.resolve(__dirname, process.env.PROJECTS_FILE_PATH)
  : path.join(__dirname, "data", "projects.json");

const submissionsFilePath = process.env.SUBMISSIONS_FILE_PATH
  ? path.resolve(__dirname, process.env.SUBMISSIONS_FILE_PATH)
  : path.join(__dirname, "data", "contactSubmissions.json");

// Helper function to read projects from JSON file
async function getProjects() {
  try {
    const data = await fs.readFile(projectsFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading projects.json:", error);
    return [];
  }
}

// Helper function to read submissions
async function getSubmissions() {
  try {
    const data = await fs.readFile(submissionsFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist yet, return empty array
    return [];
  }
}

// Helper function to save submission
async function saveSubmission(submission) {
  const submissions = await getSubmissions();
  submissions.push(submission);
  await fs.writeFile(submissionsFilePath, JSON.stringify(submissions, null, 2), "utf-8");
  return submission;
}

// Email Regex Helper
const isValidEmail = (email) => {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};

// B1: GET / - Health Check Endpoint
app.get("/", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// B2: GET /api/projects - Serve All Projects
app.get("/api/projects", async (req, res, next) => {
  try {
    const projects = await getProjects();
    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
});

// B3: GET /api/projects/:id - Serve a Single Project by ID
app.get("/api/projects/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const projects = await getProjects();
    const project = projects.find((p) => p.id === id);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
});

// B4: POST /api/contact - Handle Contact Form Submissions
app.post("/api/contact", async (req, res, next) => {
  try {
    const { name, email, message } = req.body || {};
    const errors = {};

    if (!name || typeof name !== "string" || !name.trim()) {
      errors.name = "Name is required.";
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      errors.email = "Email is required.";
    } else if (!isValidEmail(email)) {
      errors.email = "Invalid email format. Email must contain '@' and a valid domain.";
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      errors.message = "Message is required.";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        error: "Validation failed",
        details: errors,
      });
    }

    const newSubmission = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    await saveSubmission(newSubmission);

    res.status(201).json({
      message: "Contact submission received successfully",
      submission: newSubmission,
    });
  } catch (error) {
    next(error);
  }
});

// B5: GET /api/contact - List Submissions (open verification endpoint)
app.get("/api/contact", async (req, res, next) => {
  try {
    const submissions = await getSubmissions();
    res.status(200).json(submissions);
  } catch (error) {
    next(error);
  }
});

// B6: Catch-all 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// B6: Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(err.status || 500).json({
    error: "Internal Server Error",
    message: err.message || "An unexpected error occurred on the server.",
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
