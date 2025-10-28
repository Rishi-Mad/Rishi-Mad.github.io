import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

interface ProjectData {
    id: string;
    title: string;
    desc: string;
    tags: string[];
    status: string;
    year: string;
    role: string;
    challenges: string;
    learnings: string;
}

interface ProjectsContentProps {
    onProjectClick?: (project: ProjectData) => void;
}

const projectData: ProjectData[] = [
    { 
        id: "project-alpha", 
        title: "AI-Powered E-commerce Analytics Platform", 
        desc: "Built a comprehensive ML platform that processes 10M+ daily transactions, providing real-time product recommendations, demand forecasting, and fraud detection with 95% accuracy.", 
        tags: ["TensorFlow", "React", "AWS SageMaker", "Kafka", "Redis", "Docker"], 
        status: "Production",
        year: "2024",
        role: "Lead ML Engineer",
        challenges: "Scaling real-time inference to handle 100K+ requests/second, implementing A/B testing for ML models, and ensuring GDPR compliance for personal data processing.",
        learnings: "Mastered distributed ML systems, real-time data pipelines, and production MLOps practices. Achieved 40% increase in conversion rates and 60% reduction in fraud losses."
    },
    { 
        id: "project-beta", 
        title: "Computer Vision for Autonomous Drones", 
        desc: "Developed an end-to-end computer vision system for autonomous drone navigation using YOLO and custom CNN architectures, achieving 98% object detection accuracy in real-time.", 
        tags: ["PyTorch", "OpenCV", "ROS", "CUDA", "Python", "C++"], 
        status: "Production",
        year: "2023",
        role: "Computer Vision Engineer",
        challenges: "Optimizing inference speed for edge devices, handling varying lighting conditions, and ensuring safety-critical real-time performance with <50ms latency.",
        learnings: "Deep expertise in edge AI, real-time computer vision, and safety-critical systems. Successfully deployed on 500+ drones with zero safety incidents."
    },
    { 
        id: "project-gamma", 
        title: "NLP-Powered Customer Service Bot", 
        desc: "Created an intelligent chatbot using BERT and GPT models that handles 50K+ customer inquiries daily with 92% resolution rate, reducing support costs by 70%.", 
        tags: ["Hugging Face", "FastAPI", "React", "PostgreSQL", "Redis", "Docker"], 
        status: "Production",
        year: "2024",
        role: "NLP Engineer",
        challenges: "Fine-tuning language models for domain-specific knowledge, implementing context-aware conversations, and ensuring ethical AI responses without bias.",
        learnings: "Advanced NLP techniques, conversational AI design, and responsible AI development. The system now handles 80% of customer inquiries without human intervention."
    }
];

export const ProjectsContent: React.FC<ProjectsContentProps> = ({ onProjectClick }) => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Featured Projects</h2>
            <div className="text-sm text-gray-400">{projectData.length} projects</div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projectData.map((project: ProjectData, index: number) => (
                <motion.button
                    key={project.id}
                    onClick={() => onProjectClick && onProjectClick(project)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, borderColor: "rgb(59 130 246)" }}
                    className="text-left bg-gray-800/30 p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 group backdrop-blur-sm"
                >
                    <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors">{project.title}</h3>
                        <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs rounded-full ${project.status === 'Production' ? 'bg-green-900/50 text-green-300' : 'bg-yellow-900/50 text-yellow-300'}`}>{project.status}</span>
                            <span className="text-xs text-gray-500">{project.year}</span>
                        </div>
                    </div>
                    <p className="text-gray-300 mb-4 text-sm leading-relaxed">{project.desc}</p>
                    <div className="mb-2 text-xs text-blue-200"><strong>Role:</strong> {project.role}</div>
                    <div className="mb-2 text-xs text-yellow-200"><strong>Challenges:</strong> {project.challenges}</div>
                    <div className="mb-4 text-xs text-green-200"><strong>Learnings:</strong> {project.learnings}</div>
                    <div className="flex items-center space-x-3">
                        <FileText className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                        <span className="text-sm text-gray-400 group-hover:text-blue-400 transition-colors">Open Details</span>
                    </div>
                </motion.button>
            ))}
        </div>
    </motion.div>
);
