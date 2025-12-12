import React from 'react';
import { motion } from 'framer-motion';
import { FaBrain, FaRocket, FaClock, FaChartBar } from 'react-icons/fa';
import SpotlightCard from '../components/SpotlightCard';
import styles from './Features.module.css';

const features = [
    {
        icon: <FaBrain />,
        title: "Smart Job Matching",
        desc: "Our LLM analyzes your profile against thousands of job descriptions to find your perfect match."
    },
    {
        icon: <FaRocket />,
        title: "One-Click Apply",
        desc: "Auto-fill applications on major portals with 99% accuracy, saving you hours of repetitive work."
    },
    {
        icon: <FaClock />,
        title: "Real-time Assistance",
        desc: "Get live suggestions during interviews. The AI listens and prompts you with the best answers."
    },
    {
        icon: <FaChartBar />,
        title: "Growth Analytics",
        desc: "Track your application status, interview performance, and skill gaps in one intuitive dashboard."
    }
];

const Features = () => {
    return (
        <section id="features" className={styles.section}>
            <div className={styles.container}>
                <div className={styles.llmBlock}>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className={styles.llmContent}
                    >
                        <h2>Role of <span className={styles.highlight}>LLM</span></h2>
                        <p>
                            At the core of Career AI Agent is a fine-tuned Large Language Model that understands context,
                            nuance, and recruiting standards. It doesn't just match keywords; it understands your story.
                        </p>
                    </motion.div>
                    <div className={styles.llmVisual}>
                        <div className={styles.brainPulse}></div>
                    </div>
                </div>

                <div className={styles.grid}>
                    {features.map((feature, index) => (
                        <SpotlightCard key={index} className={styles.card}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
                            >
                                <div className={styles.iconWrapper}>{feature.icon}</div>
                                <h3>{feature.title}</h3>
                                <p>{feature.desc}</p>
                            </motion.div>
                        </SpotlightCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
