
import React from 'react';

/**
 * Renders the application header with a stylized title and subtitle.
 * This component is purely presentational.
 */
export const Header: React.FC = () => (
    <header className="text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Modular AI Interface
        </h1>
        <p className="mt-2 text-lg text-gray-400">
            A frontend demonstrating a scalable, multi-provider AI architecture with Gemini.
        </p>
    </header>
);
