import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectDetail {
    id: string;
    title: string;
    tags: string[];
    details: string;
    github: string;
    demo: string;
    status: string;
    year: string;
    category: string;
}

interface ProjectDetailContentProps {
    project: { id: string };
}

const projectDetailsData: Record<string, ProjectDetail> = {
    "project-alpha": { 
        id: "project-alpha", 
        title: "AI-Powered E-commerce Analytics Platform", 
        tags: ["TensorFlow", "React", "AWS SageMaker", "Kafka", "Redis", "Docker"], 
        details: "Architected and deployed a comprehensive ML platform processing 10M+ daily transactions. Built custom recommendation engines using collaborative filtering and deep learning, achieving 95% accuracy. Implemented real-time fraud detection using anomaly detection algorithms, reducing fraud losses by 60%. The system handles 100K+ requests/second with sub-100ms latency using distributed inference across multiple AWS regions.",
        github: "https://github.com/johndoe/ecommerce-ml-platform",
        demo: "https://ecommerce-ml-demo.com",
        status: "Production",
        year: "2024",
        category: "AI/ML"
    },
    "project-beta": { 
        id: "project-beta", 
        title: "Computer Vision for Autonomous Drones", 
        tags: ["PyTorch", "OpenCV", "ROS", "CUDA", "Python", "C++"], 
        details: "Developed end-to-end computer vision system for autonomous drone navigation. Custom CNN architecture achieves 98% object detection accuracy with <50ms inference time. Implemented real-time obstacle avoidance, path planning, and landing zone detection. System deployed on 500+ drones across 3 continents with zero safety incidents. Optimized for edge devices using TensorRT and CUDA acceleration.",
        github: "https://github.com/johndoe/drone-vision-system",
        demo: "https://drone-vision-demo.com",
        status: "Production",
        year: "2023",
        category: "Computer Vision"
    },
    "project-gamma": { 
        id: "project-gamma", 
        title: "NLP-Powered Customer Service Bot", 
        tags: ["Hugging Face", "FastAPI", "React", "PostgreSQL", "Redis", "Docker"], 
        details: "Built intelligent chatbot handling 50K+ customer inquiries daily with 92% resolution rate. Fine-tuned BERT and GPT models for domain-specific knowledge. Implemented context-aware conversations with memory management. Reduced support costs by 70% and improved customer satisfaction scores by 45%. System includes bias detection and ethical AI safeguards.",
        github: "https://github.com/johndoe/nlp-chatbot",
        demo: "https://chatbot-demo.com",
        status: "Production",
        year: "2024",
        category: "NLP"
    }
};

export const ProjectDetailContent: React.FC<ProjectDetailContentProps> = ({ project }) => {
    const projectInfo = projectDetailsData[project.id];

    if (!projectInfo) {
        return <div>Project not found.</div>;
    }

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">{projectInfo.title}</h1>
                    <div className="flex items-center space-x-4 mb-4">
                        <span className={`px-3 py-1 text-sm rounded-full ${projectInfo.status === 'Production' ? 'bg-green-900/50 text-green-300 border border-green-700/50' : 'bg-yellow-900/50 text-yellow-300 border border-yellow-700/50'}`}>{projectInfo.status}</span>
                        <span className="text-gray-400 text-sm">{projectInfo.year}</span>
                        <span className="text-gray-400 text-sm">• {projectInfo.category}</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
                {projectInfo.tags.map((tag: string) => (<span key={tag} className="text-sm bg-purple-900/50 text-purple-200 px-3 py-1 rounded-full border border-purple-700/50">{tag}</span>))}
            </div>
            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-blue-300">Project Overview</h2>
                <p className="text-gray-300 leading-relaxed">{projectInfo.details}</p>
            </div>
            <div className="flex space-x-4">
                <motion.a href={projectInfo.demo} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><ExternalLink className="w-4 h-4" /><span>Live Demo</span></motion.a>
                <motion.a href={projectInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Github className="w-4 h-4" /><span>Source Code</span></motion.a>
            </div>
        </motion.div>
    );
};