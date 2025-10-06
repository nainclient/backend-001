
import React from 'react';
import { AIProvider } from '../types';
import { LoadingSpinner } from './icons/LoadingSpinner';
import { SendIcon } from './icons/SendIcon';

/**
 * Props for the PromptForm component.
 */
interface PromptFormProps {
    prompt: string;
    setPrompt: (prompt: string) => void;
    provider: AIProvider;
    setProvider: (provider: AIProvider) => void;
    onSubmit: (event: React.FormEvent) => void;
    isLoading: boolean;
}

/**
 * A form component for user input, including a text area for the prompt,
 * a dropdown to select the AI provider, and a submit button.
 */
export const PromptForm: React.FC<PromptFormProps> = ({
    prompt,
    setPrompt,
    provider,
    setProvider,
    onSubmit,
    isLoading,
}) => {
    return (
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-lg border border-gray-700">
            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
                        Your Prompt
                    </label>
                    <textarea
                        id="prompt"
                        name="prompt"
                        rows={4}
                        className="block w-full px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-colors"
                        placeholder="e.g., Explain the theory of relativity in simple terms."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        disabled={isLoading}
                    />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <label htmlFor="provider" className="block text-sm font-medium text-gray-300 mb-2">
                            AI Provider
                        </label>
                        <select
                            id="provider"
                            name="provider"
                            className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base bg-gray-900/50 border-gray-600 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md transition-colors"
                            value={provider}
                            onChange={(e) => setProvider(e.target.value as AIProvider)}
                            disabled={isLoading}
                        >
                            <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
                            <option value="groq-mock">Groq (Mock)</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-purple-800 disabled:cursor-not-allowed transition-all duration-300"
                    >
                        {isLoading ? (
                            <>
                                <LoadingSpinner />
                                Generating...
                            </>
                        ) : (
                             <>
                                <SendIcon />
                                Generate
                             </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};
