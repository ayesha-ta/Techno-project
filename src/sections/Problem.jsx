import React from 'react';
import { motion } from 'framer-motion';
import { FaUserClock, FaFrownOpen, FaSearch } from 'react-icons/fa';
import styles from './Problem.module.css';

const Problem = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Why Job Hunting is <span className={styles.highlight}>Broken</span></h2>
                    <p style={{ color: '#888' }}>The traditional process is stacked against you.</p>
                </div>

                <div className={styles.grid}>
                    <motion.div
                        className={styles.card}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        <FaSearch className={styles.icon} />
                        <h3>Endless Forms</h3>
                        <p>You spend hours filling out the same repetitive information on dozens of portals, wasting valuable time.</p>
                    </motion.div>

                    <motion.div
                        className={styles.card}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <FaFrownOpen className={styles.icon} />
                        <h3>Interview Anxiety</h3>
                        <p>Walking into interviews unprepared leads to rejection. Lack of specific feedback keeps you stuck.</p>
                    </motion.div>

                    <motion.div
                        className={styles.card}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <FaUserClock className={styles.icon} />
                        <h3>Missed Opportunities</h3>
                        <p>Scattered tools and spreadsheets mean you lose track of applications and miss follow-ups.</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Problem;
