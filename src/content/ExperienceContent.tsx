import React from 'react';
import { motion } from 'framer-motion';

interface Experience {
    role: string;
    company: string;
    period: string;
    desc: string;
}

const experiences: Experience[] = [
    { role: "Senior ML Engineer", company: "AI Solutions Corp.", period: "2023 - Present", desc: "Leading ML initiatives across 5 product teams, deploying production models serving 10M+ users. Architected MLOps pipeline reducing model deployment time by 80%." },
    { role: "Full-Stack Developer & ML Engineer", company: "Tech Innovations Inc.", period: "2021 - 2023", desc: "Built end-to-end AI applications, from data pipelines to production ML models. Led team of 8 developers, achieving 95% customer satisfaction." },
    { role: "Software Engineer", company: "Digital Solutions Co.", period: "2020 - 2021", desc: "Developed full-stack features for SaaS platform serving 50k+ users. Implemented first ML features, improving user engagement by 35%." },
];

export const ExperienceContent: React.FC = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Work Experience</h2>
        <div className="space-y-4">
            {experiences.map((exp: Experience, index: number) => (
                <motion.div key={exp.company} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="bg-gray-800/30 p-6 rounded-lg border-l-4 border-purple-500">
                    <h3 className="text-xl font-semibold text-white">{exp.role}</h3>
                    <p className="text-blue-300 font-medium">{exp.company}</p>
                    <p className="text-gray-400 text-sm mb-2">{exp.period}</p>
                    <p className="text-gray-300 leading-relaxed">{exp.desc}</p>
                </motion.div>
            ))}
        </div>
    </motion.div>
);
