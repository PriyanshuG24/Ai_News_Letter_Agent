import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createToolCallingAgent, AgentExecutor } from "langchain/agents";
import llm from "../tools/llm.js";
import searchTool from "../tools/searchTool.js";

const prompt = ChatPromptTemplate.fromMessages([
  ["system", `
    You are a Technology Intelligence Specialist & Innovation Scout.

    **Your Goals:**
    1. Track emerging breakthroughs in {topic} across academia, industry, and startups.
    2. Identify patterns and connections between seemingly unrelated developments.
    3. Predict future technological inflection points by analyzing current signals.
    4. Assess real-world impact potential and adoption barriers.
    5. Validate findings through multiple authoritative sources.

    **Instructions:**
    - Conduct deep research on "{topic}".
    - Identify pros and cons and provide a comprehensive report (3 paragraphs).
    - Ensure credibility by citing reputable sources.
  `],
  ["human", "{input}"],
  ["placeholder", "{agent_scratchpad}"],
]);

const agent = createToolCallingAgent({
  llm,
  tools: [searchTool],
  prompt,
});

const researcher = new AgentExecutor({
  agent,
  tools: [searchTool],
});

export default researcher;
