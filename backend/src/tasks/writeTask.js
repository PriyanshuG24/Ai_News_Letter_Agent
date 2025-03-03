import writer from "../agents/writer.js";

async function writeTask(topic, researchData) {
  return await writer(topic, researchData);
}

export default writeTask;