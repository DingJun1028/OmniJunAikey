const { logger } = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");
const julesAgent = require("./agents/julesAgent");

initializeApp();

// A simple test function
exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from the Terminus Matrix!");
});

// The main endpoint for the Jules agent
exports.agentExecutor = onRequest(async (request, response) => {
  if (request.method !== "POST") {
    response.status(405).send("Method Not Allowed");
    return;
  }

  const task = request.body.task;

  if (!task || !task.description) {
    logger.error("Received invalid task object", { body: request.body });
    response.status(400).send("Bad Request: Task object with description is required.");
    return;
  }

  try {
    const result = await julesAgent.execute(task);
    response.status(200).json(result);
  } catch (error) {
    logger.error("Agent execution failed", { error: error.message, task });
    response.status(500).send("Internal Server Error");
  }
});
