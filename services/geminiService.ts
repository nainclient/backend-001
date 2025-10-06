
import { GoogleGenAI } from "@google/genai";
import { AIProvider, AIResponse } from '../types';

/**
 * Service layer for interacting with AI models.
 * This file abstracts the logic for communicating with different AI providers,
 * including the Gemini API and mock services. It implements a fallback mechanism
 * for fault tolerance.
 */

// IMPORTANT: This assumes the API_KEY is set in the environment variables.
// In a production frontend application, this key should be protected by a backend proxy.
if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });


/**
 * Simulates a call to a secondary AI provider (Groq).
 * Used for demonstration and as a fallback.
 * @param prompt The user's prompt.
 * @returns A mocked AIResponse.
 */
const callGroqMock = (prompt: string): Promise<AIResponse> => {
    console.log(`Mocking Groq call with prompt: "${prompt}"`);
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                result: `This is a mocked response from Groq for the prompt: "${prompt}". It demonstrates the multi-provider architecture.`,
                provider: 'groq-mock',
                degraded: false,
            });
        }, 1000); // Simulate network latency
    });
};

/**
 * Calls the Google Gemini API to generate content. If the API call fails,
 * it attempts to use the Groq mock as a fallback.
 * @param prompt The user's prompt.
 * @returns An AIResponse from Gemini or a fallback provider.
 */
const callGemini = async (prompt: string): Promise<AIResponse> => {
    try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });
        
        return {
            result: response.text,
            provider: 'gemini-2.5-flash',
            degraded: false,
        };
    } catch (error) {
        console.error("Gemini API call failed:", error);
        // Fallback logic as described in the architecture document
        console.log("Gemini failed, attempting fallback to Groq mock...");
        const fallbackResponse = await callGroqMock(prompt);
        // Mark as degraded since the primary provider failed
        return { ...fallbackResponse, degraded: true };
    }
};

/**
 * Main inference function that acts as a factory/dispatcher.
 * It selects the appropriate AI provider based on the user's choice and executes the call.
 * @param prompt The user's prompt.
 * @param provider The selected AI provider from the UI.
 * @returns A promise that resolves to a structured AIResponse.
 */
export const getAIResponse = (prompt: string, provider: AIProvider): Promise<AIResponse> => {
    switch (provider) {
        case 'gemini-2.5-flash':
            return callGemini(prompt);
        case 'groq-mock':
            return callGroqMock(prompt);
        default:
            // This case should not be reachable with TypeScript, but provides a safe default.
            console.error(`Unknown provider: ${provider}. Defaulting to Groq mock.`);
            return callGroqMock(prompt);
    }
};
