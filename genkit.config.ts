import { configureGenkit } from '@genkit-ai/core';
import { firebase } from '@genkit-ai/firebase';
import { googleAI } from '@genkit-ai/googleai';

export default configureGenkit({
  // A list of plugins to load and configure.
  plugins: [
    // The Firebase plugin is used for deploying flows and for auth.
    firebase(),
    // The Google AI plugin is used to connect to the Gemini API.
    googleAI({
      // The API key is loaded from the GEMINI_API_KEY environment variable.
    }),
  ],
  // Where to find the flow definitions.
  flowPath: 'src/flows',
  // Log level for the Genkit development UI and logs.
  logLevel: 'debug',
  // Enable the Genkit developer UI.
  enableDevUi: true,
});
