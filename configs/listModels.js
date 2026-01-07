// Utility script to list available Gemini models
// Run this with: node configs/listModels.js

const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config({ path: ".env.local" });

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  console.error("API key not found. Please check your .env.local file.");
  process.exit(1);
}

async function listModels() {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Try to list models using the REST API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.models && data.models.length > 0) {
      console.log("\nAvailable models:");
      console.log("================\n");
      data.models.forEach((model) => {
        console.log(`Name: ${model.name}`);
        console.log(`Display Name: ${model.displayName || "N/A"}`);
        console.log(`Supported Methods: ${model.supportedGenerationMethods?.join(", ") || "N/A"}`);
        console.log("---");
      });
    } else {
      console.log("No models found or unable to list models.");
    }
  } catch (error) {
    console.error("Error listing models:", error.message);
    console.log("\nTrying alternative approach...");
    
    // Try common model names
    const commonModels = [
      "gemini-2.5-flash",
      "gemini-2.5-pro",
      "gemini-1.5-flash",
      "gemini-1.5-pro",
      "gemini-pro",
      "gemini-1.0-pro",
    ];
    
    console.log("\nYou can try these model names:");
    commonModels.forEach((model) => console.log(`- ${model}`));
  }
}

listModels();

