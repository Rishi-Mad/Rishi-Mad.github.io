import React from 'react';

export const TestContent: React.FC = () => (
    <div className="p-4 bg-blue-500/20 border border-blue-500/40 rounded-lg">
        <h2 className="text-2xl font-bold text-white mb-4">Test Content</h2>
        <p className="text-gray-300">
            This is a test content component to verify that content rendering is working properly.
        </p>
        <div className="mt-4 p-2 bg-green-500/20 border border-green-500/40 rounded">
            <p className="text-green-300">If you can see this, content rendering is working!</p>
        </div>
    </div>
); 