import researcher from "../agents/researcher.js";

async function researchTask(topic) {
  console.log("🟢 Starting research task for:", topic);
  
  try {
    const result = await researcher.invoke({ 
      topic: topic,  // ✅ Fix: Pass the topic variable
      input: `Research about ${topic}` 
    });

    console.log("✅ Research task completed. Result:", result);
    return result.output;
  } catch (error) {
    console.error("❌ Error in researchTask:", error);
    throw error;
  }
}

export default researchTask;
