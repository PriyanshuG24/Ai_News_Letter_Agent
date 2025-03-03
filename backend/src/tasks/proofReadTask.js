import proofreader from "../agents/proofreader.js";

async function proofReadTask(article) {
  return await proofreader(article);
}

export default proofReadTask;