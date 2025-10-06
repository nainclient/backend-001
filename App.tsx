
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PromptForm } from './components/PromptForm';
import { ResultDisplay } from './components/ResultDisplay';
import { getAIResponse } from './services/geminiService';
import { AIProvider, AIResponse } from './types';

/**
 * The root component of the application.
 * It manages state and orchestrates data flow between components.
 */
const App: React.FC = () => {
    // State management for the application
    const [prompt, setPrompt] = useState<string>('');
    const [provider, setProvider] = useState<AIProvider>('gemini-2.5-flash');
    const [response, setResponse] = useState<AIResponse | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Handles the form submission by calling the AI service and updating state.
     * Uses useCallback for performance optimization.
     */
    const handleSubmit = useCallback(async (event: React.FormEvent) => {
        event.preventDefault();
        if (!prompt.trim()) {
            setError('Please enter a prompt.');
            return;
        }
        
        setIsLoading(true);
        setError(null);
        setResponse(null);

        try {
            const result = await getAIResponse(prompt, provider);
            setResponse(result);
        } catch (e) {
            console.error(e);
            const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred.';
            setError(`Failed to get response. ${errorMessage}`);
            setResponse(null);
        } finally {
            setIsLoading(false);
        }
    }, [prompt, provider]);

    return (
        <div className="bg-gray-900 text-white min-h-screen font-sans antialiased">
            <div className="container mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
                <Header />
                <main className="mt-8 space-y-8">
                    <PromptForm
                        prompt={prompt}
                        setPrompt={setPrompt}
                        provider={provider}
                        setProvider={setProvider}
                        onSubmit={handleSubmit}
                        isLoading={isLoading}
                    />
                    <ResultDisplay
                        isLoading={isLoading}
                        error={error}
                        response={response}
                    />
                </main>
            </div>
        </div>
    );
};

export default App;
