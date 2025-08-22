import { firebase } from "@genkit-ai/firebase";
import { configureGenkit } from "genkit";
import { googleAI } from "genkit/plugins/googleai";

export default configureGenkit({
  plugins: [
    firebase(),
    googleAI({
      // In a production environment, this should be a secret or environment variable.
      apiKey: "AIzaSyAczoTLQksrMIvUTYKRnnykfXvSvK5Qo24",
    }),
  ],
  logLevel: "debug",
  enableTracingAndMetrics: true,
});
