
import React from 'react';
import { AIResponse } from '../types';
import { LoadingSpinner } from './icons/LoadingSpinner';

/**
 * Props for the ResultDisplay component.
 */
interface ResultDisplayProps {
    isLoading: boolean;
    error: string | null;
    response: AIResponse | null;
}

/**
 * Displays the result from the AI service. It handles various states:
 * - Initial state (before any submission)
 * - Loading state (while waiting for a response)
 * - Error state (if the API call fails)
 * - Success state (when a response is received)
 */
export const ResultDisplay: React.FC<ResultDisplayProps> = ({ isLoading, error, response }) => {
    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex flex-col items-center justify-center space-y-4 p-8 text-gray-400">
                    <LoadingSpinner className="w-8 h-8"/>
                    <span>Generating response...</span>
                </div>
            );
        }

        if (error) {
            return (
                <div className="p-6 text-center text-red-400 bg-red-900/20 rounded-lg">
                    <h3 className="font-semibold">An Error Occurred</h3>
                    <p className="mt-1 text-sm">{error}</p>
                </div>
            );
        }
        
        if (response) {
            return (
                <div className="bg-gray-800/50 p-4 sm:p-6 rounded-xl shadow-lg border border-gray-700">
                    <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-700">
                        <h3 className="font-semibold text-lg text-gray-200">AI Response</h3>
                        <div className="flex items-center gap-2">
                            {response.degraded && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-900 text-yellow-300">
                                    Degraded
                                </span>
                            )}
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-900 text-purple-300">
                                {response.provider}
                            </span>
                        </div>
                    </div>
                    <div className="prose prose-invert prose-sm max-w-none text-gray-300 whitespace-pre-wrap">
                        {response.result}
                    </div>
                </div>
            );
        }

        return (
            <div className="text-center p-8 text-gray-500 border-2 border-dashed border-gray-700 rounded-lg">
                <p>Your AI-generated content will appear here.</p>
            </div>
        );
    };

    return <div className="mt-8">{renderContent()}</div>;
};
