import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Globe, Database, Cpu, ChevronRight } from 'lucide-react';

interface SkillCategory {
    icon: React.ReactNode;
    skills: string[];
    color: string;
}

const skillCategories: Record<string, SkillCategory> = {
    "AI/ML & Data Science": { icon: <Code className="w-5 h-5" />, skills: ["TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "OpenCV", "NLTK", "Hugging Face"], color: "blue" },
    "MLOps & Production": { icon: <Cpu className="w-5 h-5" />, skills: ["MLflow", "Kubeflow", "Airflow", "Docker", "Kubernetes", "AWS SageMaker", "Vertex AI"], color: "green" },
    "Full-Stack Development": { icon: <Globe className="w-5 h-5" />, skills: ["React", "Next.js", "Node.js", "FastAPI", "GraphQL", "TypeScript", "Python"], color: "purple" },
    "Cloud & Infrastructure": { icon: <Database className="w-5 h-5" />, skills: ["AWS", "GCP", "Azure", "Terraform", "CI/CD", "Serverless", "Microservices"], color: "orange" }
};

export const SkillsContent: React.FC = () => {
    const [openCategory, setOpenCategory] = useState<string | null>('AI/ML & Data Science');
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Technical Skills</h2>
            <div className="space-y-4">
                {Object.entries(skillCategories).map(([category, data]: [string, SkillCategory]) => (
                    <div key={category} className="bg-gray-800/40 rounded-lg overflow-hidden border border-gray-700/50">
                        <motion.button onClick={() => setOpenCategory(openCategory === category ? null : category)} className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-700/30 transition-colors">
                            <div className="flex items-center space-x-3">
                                <div className={`text-${data.color}-400`}>{data.icon}</div>
                                <h3 className="text-lg font-semibold text-white">{category}</h3>
                            </div>
                            <motion.div animate={{ rotate: openCategory === category ? 90 : 0 }}><ChevronRight className="text-purple-400" /></motion.div>
                        </motion.button>
                        <AnimatePresence>
                            {openCategory === category && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-4 pb-4">
                                    <div className="flex flex-wrap gap-3 pt-2 border-t border-gray-700/50">
                                        {data.skills.map((item: string) => (<span key={item} className="bg-indigo-700/50 text-gray-200 px-3 py-1 rounded-md text-sm border border-indigo-600/50">{item}</span>))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};