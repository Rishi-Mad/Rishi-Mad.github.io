import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Brain, MessageCircle, BarChart3, Sparkles, Zap, Target, TrendingUp } from 'lucide-react';

interface Prediction {
    label: string;
    confidence: number;
    category: string;
}

interface SentimentResult {
    sentiment: 'positive' | 'negative' | 'neutral';
    confidence: number;
    score: number;
}

const AIDemoContent: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'image' | 'text' | 'chat'>('image');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [predictions, setPredictions] = useState<Prediction[]>([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [textInput, setTextInput] = useState('');
    const [sentimentResult, setSentimentResult] = useState<SentimentResult | null>(null);
    const [chatMessages, setChatMessages] = useState<Array<{ type: 'user' | 'bot'; message: string; timestamp: Date }>>([
        { type: 'bot', message: 'Hello! I\'m your AI assistant. How can I help you today?', timestamp: new Date() }
    ]);
    const [chatInput, setChatInput] = useState('');

    // Mock AI predictions for demo
    const mockImagePredictions: Prediction[] = [
        { label: 'Golden Retriever', confidence: 0.95, category: 'Dog' },
        { label: 'Labrador', confidence: 0.87, category: 'Dog' },
        { label: 'German Shepherd', confidence: 0.72, category: 'Dog' },
        { label: 'Cat', confidence: 0.15, category: 'Cat' }
    ];

    const mockSentimentAnalysis = (text: string): SentimentResult => {
        const positiveWords = ['good', 'great', 'amazing', 'excellent', 'wonderful', 'love', 'happy', 'fantastic'];
        const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'disappointing', 'sad', 'angry', 'horrible'];
        
        const words = text.toLowerCase().split(' ');
        let positiveCount = 0;
        let negativeCount = 0;
        
        words.forEach(word => {
            if (positiveWords.includes(word)) positiveCount++;
            if (negativeWords.includes(word)) negativeCount++;
        });
        
        const score = (positiveCount - negativeCount) / words.length;
        let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral';
        let confidence = 0.5;
        
        if (score > 0.1) {
            sentiment = 'positive';
            confidence = 0.7 + Math.random() * 0.3;
        } else if (score < -0.1) {
            sentiment = 'negative';
            confidence = 0.7 + Math.random() * 0.3;
        }
        
        return { sentiment, confidence, score };
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const analyzeImage = () => {
        if (!imageFile) return;
        
        setIsAnalyzing(true);
        // Simulate AI processing
        setTimeout(() => {
            setPredictions(mockImagePredictions);
            setIsAnalyzing(false);
        }, 2000);
    };

    const analyzeSentiment = () => {
        if (!textInput.trim()) return;
        
        const result = mockSentimentAnalysis(textInput);
        setSentimentResult(result);
    };

    const sendChatMessage = () => {
        if (!chatInput.trim()) return;
        
        const userMessage = { type: 'user' as const, message: chatInput, timestamp: new Date() };
        setChatMessages(prev => [...prev, userMessage]);
        
        // Simulate AI response
        setTimeout(() => {
            const responses = [
                "That's an interesting question! Let me think about that...",
                "I understand what you're asking. Here's what I can tell you...",
                "Great question! Based on my knowledge, I'd say...",
                "I'm here to help! Let me provide some insights on that...",
                "That's a fascinating topic. Here's my perspective..."
            ];
            const botMessage = { 
                type: 'bot' as const, 
                message: responses[Math.floor(Math.random() * responses.length)], 
                timestamp: new Date() 
            };
            setChatMessages(prev => [...prev, botMessage]);
        }, 1000);
        
        setChatInput('');
    };

    const getSentimentColor = (sentiment: string) => {
        switch (sentiment) {
            case 'positive': return 'text-green-400';
            case 'negative': return 'text-red-400';
            default: return 'text-gray-400';
        }
    };

    const getSentimentIcon = (sentiment: string) => {
        switch (sentiment) {
            case 'positive': return '😊';
            case 'negative': return '😞';
            default: return '😐';
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="space-y-6 max-w-6xl mx-auto"
        >
            {/* Header */}
            <div className="text-center mb-8">
                <motion.div 
                    className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                >
                    <Brain className="w-10 h-10 text-white" />
                </motion.div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    AI Interactive Demo
                </h1>
                <p className="text-gray-300 text-lg">
                    Experience my AI/ML capabilities in real-time
                </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-center mb-8">
                <div className="bg-gray-800/50 rounded-lg p-1 flex">
                    {[
                        { id: 'image', label: 'Image Classification', icon: <Upload className="w-4 h-4" /> },
                        { id: 'text', label: 'Sentiment Analysis', icon: <BarChart3 className="w-4 h-4" /> },
                        { id: 'chat', label: 'AI Chatbot', icon: <MessageCircle className="w-4 h-4" /> }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                                activeTab === tab.id
                                    ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg'
                                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                            }`}
                        >
                            {tab.icon}
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Tabs */}
            <AnimatePresence mode="wait">
                {activeTab === 'image' && (
                    <motion.div
                        key="image"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Image Upload */}
                            <div className="glass p-6 rounded-xl">
                                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                                    <Upload className="w-5 h-5 mr-2 text-blue-400" />
                                    Upload Image
                                </h3>
                                
                                <div className="border-2 border-dashed border-gray-600/50 rounded-lg p-8 text-center hover:border-blue-500/50 transition-colors">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        id="image-upload"
                                    />
                                    <label htmlFor="image-upload" className="cursor-pointer">
                                        {imagePreview ? (
                                            <img src={imagePreview} alt="Preview" className="max-w-full h-64 object-cover rounded-lg mx-auto" />
                                        ) : (
                                            <div>
                                                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                                <p className="text-gray-400">Click to upload an image</p>
                                                <p className="text-sm text-gray-500 mt-2">Supports: JPG, PNG, GIF</p>
                                            </div>
                                        )}
                                    </label>
                                </div>
                                
                                <motion.button
                                    onClick={analyzeImage}
                                    disabled={!imageFile || isAnalyzing}
                                    className="w-full mt-4 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {isAnalyzing ? (
                                        <span className="flex items-center justify-center">
                                            <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                                            Analyzing...
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center">
                                            <Brain className="w-4 h-4 mr-2" />
                                            Analyze Image
                                        </span>
                                    )}
                                </motion.button>
                            </div>

                            {/* Results */}
                            <div className="glass p-6 rounded-xl">
                                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                                    <Target className="w-5 h-5 mr-2 text-green-400" />
                                    Predictions
                                </h3>
                                
                                {predictions.length > 0 ? (
                                    <div className="space-y-3">
                                        {predictions.map((prediction, index) => (
                                            <motion.div
                                                key={prediction.label}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/50"
                                            >
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="font-medium text-white">{prediction.label}</span>
                                                    <span className="text-sm text-gray-400">{prediction.category}</span>
                                                </div>
                                                <div className="w-full bg-gray-700/50 rounded-full h-2">
                                                    <motion.div
                                                        className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${prediction.confidence * 100}%` }}
                                                        transition={{ duration: 1, delay: index * 0.1 }}
                                                    />
                                                </div>
                                                <div className="text-right mt-1">
                                                    <span className="text-sm text-gray-400">
                                                        {(prediction.confidence * 100).toFixed(1)}%
                                                    </span>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center text-gray-400 py-8">
                                        <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                        <p>Upload an image and click analyze to see predictions</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'text' && (
                    <motion.div
                        key="text"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Text Input */}
                            <div className="glass p-6 rounded-xl">
                                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                                    <BarChart3 className="w-5 h-5 mr-2 text-blue-400" />
                                    Text Analysis
                                </h3>
                                
                                <textarea
                                    value={textInput}
                                    onChange={(e) => setTextInput(e.target.value)}
                                    placeholder="Enter text to analyze sentiment..."
                                    className="w-full h-32 bg-gray-800/50 border border-gray-700/50 rounded-lg p-3 text-white placeholder-gray-400 focus:border-blue-500/50 focus:outline-none resize-none"
                                />
                                
                                <motion.button
                                    onClick={analyzeSentiment}
                                    disabled={!textInput.trim()}
                                    className="w-full mt-4 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span className="flex items-center justify-center">
                                        <Zap className="w-4 h-4 mr-2" />
                                        Analyze Sentiment
                                    </span>
                                </motion.button>
                            </div>

                            {/* Sentiment Results */}
                            <div className="glass p-6 rounded-xl">
                                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                                    <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                                    Sentiment Results
                                </h3>
                                
                                {sentimentResult ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center"
                                    >
                                        <div className="text-6xl mb-4">{getSentimentIcon(sentimentResult.sentiment)}</div>
                                        <div className={`text-2xl font-bold mb-2 ${getSentimentColor(sentimentResult.sentiment)}`}>
                                            {sentimentResult.sentiment.charAt(0).toUpperCase() + sentimentResult.sentiment.slice(1)}
                                        </div>
                                        <div className="text-gray-400 mb-4">
                                            Confidence: {(sentimentResult.confidence * 100).toFixed(1)}%
                                        </div>
                                        <div className="w-full bg-gray-700/50 rounded-full h-3">
                                            <motion.div
                                                className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-3 rounded-full"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${(sentimentResult.score + 1) * 50}%` }}
                                                transition={{ duration: 1 }}
                                            />
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-400 mt-2">
                                            <span>Negative</span>
                                            <span>Neutral</span>
                                            <span>Positive</span>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="text-center text-gray-400 py-8">
                                        <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                        <p>Enter text and click analyze to see sentiment results</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'chat' && (
                    <motion.div
                        key="chat"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <div className="glass p-6 rounded-xl h-96 flex flex-col">
                            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                                <MessageCircle className="w-5 h-5 mr-2 text-blue-400" />
                                AI Chatbot
                            </h3>
                            
                            {/* Chat Messages */}
                            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                                {chatMessages.map((message, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`max-w-xs lg:max-w-md p-3 rounded-lg ${
                                            message.type === 'user' 
                                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                                                : 'bg-gray-800/50 text-gray-300 border border-gray-700/50'
                                        }`}>
                                            <p className="text-sm">{message.message}</p>
                                            <p className="text-xs opacity-70 mt-1">
                                                {message.timestamp.toLocaleTimeString()}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            
                            {/* Chat Input */}
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                                    placeholder="Type your message..."
                                    className="flex-1 bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-blue-500/50 focus:outline-none"
                                />
                                <motion.button
                                    onClick={sendChatMessage}
                                    disabled={!chatInput.trim()}
                                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <MessageCircle className="w-4 h-4" />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default AIDemoContent; 