import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import researchTask from "./tasks/researchTask.js";
import writeTask from "./tasks/writeTask.js";
import proofReadTask from "./tasks/proofReadTask.js";

dotenv.config();
const app = express();
app.use(express.json());

const allowedOrigins = [
  "https://ai-news-letter-agent.vercel.app", 
  "http://localhost:5173", 
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("Blocked origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.options("*", cors());
app.get('/', (req, res) => {
  res.send('Hello World')
})
app.post("/generate-newsletter", async (req, res) => {
  const { topic } = req.body;
  console.log("Topic received:", topic);

  try {
    console.log("Starting research for:", topic);
    const researchData = await researchTask(topic);
    console.log("Research complete:", researchData);

    const article = await writeTask(topic, researchData.content);
    console.log("Article generated:", article);

    const finalArticle = await proofReadTask(article.content);
    console.log("Final article:", finalArticle);

    // Format as Markdown
    const markdownContent = `# ${topic}\n\n${finalArticle.content}`;

    res.json({ success: true, markdown: markdownContent });
  } catch (error) {
    console.error("Error generating newsletter:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
