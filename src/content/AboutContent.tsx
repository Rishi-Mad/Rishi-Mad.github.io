import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, MapPin, Calendar, Award, Star, Code, Brain, Zap, Target, TrendingUp, Github, Linkedin, Mail, Download } from 'lucide-react';

interface Achievement {
    icon: React.ReactNode;
    title: string;
    year: string;
    desc: string;
    impact: string;
}

interface Skill {
    name: string;
    level: number;
    category: 'AI/ML' | 'Full-Stack' | 'DevOps' | 'Research';
    icon: React.ReactNode;
}

const achievements: Achievement[] = [
    { 
        icon: <Award className="w-6 h-6" />, 
        title: "AWS Solutions Architect", 
        year: "2023", 
        desc: "Professional certification",
        impact: "Deployed 50+ production ML models"
    },
    { 
        icon: <Brain className="w-6 h-6" />, 
        title: "TensorFlow Developer", 
        year: "2024", 
        desc: "Google certification",
        impact: "Built custom models for 10M+ users"
    },
    { 
        icon: <Zap className="w-6 h-6" />, 
        title: "MLOps Specialist", 
        year: "2023", 
        desc: "Production ML deployment",
        impact: "Reduced deployment time by 80%"
    }
];

const skills: Skill[] = [
    { name: "TensorFlow", level: 95, category: "AI/ML", icon: <Brain className="w-4 h-4" /> },
    { name: "PyTorch", level: 90, category: "AI/ML", icon: <Brain className="w-4 h-4" /> },
    { name: "React", level: 92, category: "Full-Stack", icon: <Code className="w-4 h-4" /> },
    { name: "Python", level: 95, category: "AI/ML", icon: <Code className="w-4 h-4" /> },
    { name: "AWS", level: 88, category: "DevOps", icon: <Zap className="w-4 h-4" /> },
    { name: "Docker", level: 85, category: "DevOps", icon: <Zap className="w-4 h-4" /> },
    { name: "TypeScript", level: 90, category: "Full-Stack", icon: <Code className="w-4 h-4" /> },
    { name: "Kubernetes", level: 82, category: "DevOps", icon: <Zap className="w-4 h-4" /> },
];

export const AboutContent: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<'AI/ML' | 'Full-Stack' | 'DevOps' | 'Research'>('AI/ML');
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

    const filteredSkills = skills.filter(skill => skill.category === selectedCategory);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="space-y-8 max-w-6xl mx-auto"
        >
            {/* Hero Section */}
            <div className="text-center mb-12">
                <motion.div 
                    className="w-40 h-40 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-full mx-auto mb-8 flex items-center justify-center shadow-2xl"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    animate={{ 
                        boxShadow: [
                            "0 0 0 0 rgba(59, 130, 246, 0.4)",
                            "0 0 0 20px rgba(59, 130, 246, 0)",
                            "0 0 0 0 rgba(59, 130, 246, 0)"
                        ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <User className="w-20 h-20 text-white" />
                </motion.div>
                
                <motion.h1 
                    className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    John Doe
                </motion.h1>
                
                <motion.p 
                    className="text-2xl text-blue-300 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    Senior AI/ML Engineer & Full-Stack Developer
                </motion.p>
                
                <motion.div 
                    className="flex justify-center space-x-8 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <div className="flex items-center space-x-2 text-gray-300">
                        <MapPin className="w-5 h-5" />
                        <span>San Francisco, CA</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                        <Calendar className="w-5 h-5" />
                        <span>5+ Years Experience</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                        <Target className="w-5 h-5" />
                        <span>Available for Opportunities</span>
                    </div>
                </motion.div>

                {/* Social Links */}
                <motion.div 
                    className="flex justify-center space-x-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <motion.a 
                        href="https://github.com/johndoe" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-3 bg-gray-800/50 rounded-full hover:bg-blue-600/50 transition-colors"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Github className="w-6 h-6 text-white" />
                    </motion.a>
                    <motion.a 
                        href="https://linkedin.com/in/johndoe" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-3 bg-gray-800/50 rounded-full hover:bg-blue-600/50 transition-colors"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Linkedin className="w-6 h-6 text-white" />
                    </motion.a>
                    <motion.a 
                        href="mailto:john@example.com"
                        className="p-3 bg-gray-800/50 rounded-full hover:bg-blue-600/50 transition-colors"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Mail className="w-6 h-6 text-white" />
                    </motion.a>
                    <motion.button
                        className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:from-blue-700 hover:to-purple-700 transition-colors"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Download className="w-6 h-6 text-white" />
                    </motion.button>
                </motion.div>
            </div>

            {/* Achievements Grid */}
            <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
            >
                {achievements.map((achievement, index) => (
                    <motion.div 
                        key={achievement.title} 
                        initial={{ opacity: 0, x: -20 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ delay: 1.2 + index * 0.1 }}
                        className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-xl border border-gray-700/50 text-center hover:border-blue-500/50 transition-all duration-300 group"
                        whileHover={{ scale: 1.02, y: -5 }}
                    >
                        <div className="text-blue-400 mb-4 flex justify-center group-hover:scale-110 transition-transform">
                            {achievement.icon}
                        </div>
                        <h3 className="font-semibold text-white mb-2 text-lg">{achievement.title}</h3>
                        <p className="text-sm text-gray-400 mb-2">{achievement.year}</p>
                        <p className="text-xs text-gray-500 mb-3">{achievement.desc}</p>
                        <div className="bg-blue-500/20 px-3 py-1 rounded-full">
                            <p className="text-xs text-blue-300 font-medium">{achievement.impact}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Skills Section */}
            <motion.div 
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
            >
                <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    Technical Expertise
                </h2>
                
                {/* Category Tabs */}
                <div className="flex justify-center mb-8">
                    <div className="bg-gray-800/50 rounded-lg p-1 flex">
                        {(['AI/ML', 'Full-Stack', 'DevOps', 'Research'] as const).map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                                    selectedCategory === category
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AnimatePresence mode="wait">
                        {filteredSkills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-gray-800/30 p-4 rounded-lg border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
                                onMouseEnter={() => setHoveredSkill(skill.name)}
                                onMouseLeave={() => setHoveredSkill(null)}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center space-x-2">
                                        <div className="text-blue-400">{skill.icon}</div>
                                        <span className="font-medium text-white">{skill.name}</span>
                                    </div>
                                    <span className="text-sm text-gray-400">{skill.level}%</span>
                                </div>
                                <div className="w-full bg-gray-700/50 rounded-full h-2">
                                    <motion.div
                                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${skill.level}%` }}
                                        transition={{ duration: 1, delay: index * 0.1 }}
                                    />
                                </div>
                                {hoveredSkill === skill.name && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-2 text-xs text-gray-400"
                                    >
                                        Expert level proficiency
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Story Section */}
            <motion.div 
                className="prose prose-invert max-w-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 }}
            >
                <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 p-8 rounded-xl border border-gray-700/50">
                    <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        My Journey in AI & Technology
                    </h3>
                    
                    <div className="space-y-6 text-gray-300 leading-relaxed">
                        <p>
                            Hi, I'm John Doe—a passionate AI/ML engineer and full-stack developer who bridges the gap between cutting-edge machine learning and production-ready applications. My journey began with curiosity about how computers learn, leading me from building neural networks to architecting scalable AI systems that serve millions of users.
                        </p>
                        
                        <p>
                            I specialize in <span className="text-blue-400 font-semibold">MLOps</span>, deploying machine learning models at scale, and building intuitive interfaces that make AI accessible. My expertise spans from training custom models with <span className="text-green-400 font-semibold">TensorFlow/PyTorch</span> to building robust APIs and real-time inference systems on <span className="text-orange-400 font-semibold">AWS</span>.
                        </p>
                        
                        <p>
                            What drives me is solving complex problems with AI—whether it's <span className="text-purple-400 font-semibold">computer vision for autonomous systems</span>, <span className="text-pink-400 font-semibold">NLP for intelligent chatbots</span>, or <span className="text-yellow-400 font-semibold">predictive analytics that transform business decisions</span>. I believe in responsible AI development and always consider the ethical implications of the systems I build.
                        </p>
                        
                        <p>
                            When I'm not coding, you'll find me contributing to <span className="text-green-400 font-semibold">open-source ML projects</span>, attending <span className="text-blue-400 font-semibold">AI conferences</span>, or experimenting with the latest research papers. Let's build the future of AI together!
                        </p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};