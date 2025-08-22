import { onCall } from "@genkit-ai/firebase/functions";
import { defineFlow, run } from "genkit";
import * as z from "zod";
import * as admin from "firebase-admin";

// Initialize firebase-admin
admin.initializeApp();

export const genesisWeaver = onCall(
  {
    name: "genesisWeaver",
    inputSchema: z.object({
      blueprintName: z.string(),
      initialData: z.any(),
    }),
    outputSchema: z.object({
      status: z.string(),
      message: z.string(),
    }),
  },
  async ({ blueprintName, initialData }) => {
    return await run("create-blueprint", async () => {
      const db = admin.firestore();
      try {
        // Execute the creation command
        await db.collection("blueprints").doc(blueprintName).set(initialData);

        // Trigger the eternal inscription event card
        const eventCard = {
          type: "blueprint_created",
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
          payload: { blueprintName },
        };
        await db.collection("eventCards").add(eventCard);

        return { status: "success", message: "Blueprint created successfully." };
      } catch (error) {
        console.error("Error creating blueprint:", error);
        // Using Genkit's run function will automatically handle errors and tracing
        throw new Error(`Failed to create blueprint: ${error}`);
      }
    });
  }
);
