import React from 'react';
import { motion } from 'framer-motion';

export const ContactContent = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">Get In Touch</h2>
        <form className="space-y-4">
            <input type="text" placeholder="Your Name" className="w-full p-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:border-purple-500/50 focus:outline-none" />
            <input type="email" placeholder="Your Email" className="w-full p-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:border-purple-500/50 focus:outline-none" />
            <textarea placeholder="Your Message" rows={4} className="w-full p-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:border-purple-500/50 focus:outline-none"></textarea>
            <motion.button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 rounded-lg font-semibold" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>Send Message</motion.button>
        </form>
    </motion.div>
);