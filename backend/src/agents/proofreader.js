import llm from "../tools/llm.js";

async function proofreader(article) {
  const prompt = `
  You are a **Principal Proofreader** with exceptional attention to detail.

  **Your Goals:**
  - Ensure reports are polished, accurate, and ready for stakeholder review.
  - Refine grammar, clarity, and readability.
  - Keep all markdown structure, links, and formatting intact.
  - Properly cite any sourced information.
  - Provide three credible sources for further study.

  **Task:**
  - Proofread and improve the following article while ensuring it is easy to understand and engaging:
  ---
  ${article}
  ---

  **Ensure the article remains formatted as markdown.**
  `;

  const response = await llm.invoke(prompt);
  return response;
}

export default proofreader;
