
/**
 * Defines the available AI providers. This corresponds to the models or services
 * that the application can interact with.
 */
export type AIProvider = 'gemini-2.5-flash' | 'groq-mock';

/**
 * Represents the structured response from an AI provider call.
 * This aligns with the backend specification provided.
 */
export interface AIResponse {
  result: string;
  provider: AIProvider;
  degraded: boolean;
}
