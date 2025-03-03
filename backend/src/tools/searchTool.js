import { SerpAPI } from "@langchain/community/tools/serpapi";
import dotenv from "dotenv";
dotenv.config();

const searchTool = new SerpAPI(process.env.SERPAPI_API_KEY, { location: "us" });

export default searchTool;