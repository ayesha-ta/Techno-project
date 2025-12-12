import React from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaBriefcase, FaChartLine } from 'react-icons/fa';
import SpotlightCard from '../components/SpotlightCard';
import styles from './Solution.module.css';
import interviewImg from '../assets/interview.png';
import jobMatchImg from '../assets/job-match.png';

const Solution = () => {
    return (
        <section id="solution" className={styles.section}>
            <div className={styles.container}>
                <motion.h2
                    className={styles.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Our <span className={styles.highlight}>Solution</span>
                </motion.h2>

                <p style={{ maxWidth: '600px', margin: '0 auto', color: '#a1a1aa' }}>
                    A unified AI-powered career assistant that streamlines the entire recruitment process.
                </p>

                <div className={styles.grid}>
                    <SpotlightCard className={styles.card}>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
                        >
                            <div className={styles.cardContent}>
                                <div className={styles.iconWrapper}><FaBriefcase /></div>
                                <h3>Job Automation</h3>
                                <p>Smart job matching and one-click application to the best-fit roles tailored to your skills.</p>
                            </div>
                            <img src={jobMatchImg} alt="Job Matching UI" className={styles.cardImg} />
                        </motion.div>
                    </SpotlightCard>

                    <SpotlightCard className={styles.card}>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
                        >
                            <div className={styles.cardContent}>
                                <div className={styles.iconWrapper}><FaRobot /></div>
                                <h3>AI Interview Simulator</h3>
                                <p>Practice with adaptive AI interviewers (HR, Tech, Founder) and get instant feedback.</p>
                            </div>
                            <img src={interviewImg} alt="Interview Simulator UI" className={styles.cardImg} />
                        </motion.div>
                    </SpotlightCard>

                    <SpotlightCard className={styles.card}>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
                        >
                            <div className={styles.cardContent}>
                                <div className={styles.iconWrapper}><FaChartLine /></div>
                                <h3>Analytics & Growth</h3>
                                <p>Track your progress with a personalized dashboard and detailed skill analytics.</p>
                            </div>
                            <div style={{ height: '200px', background: 'linear-gradient(to top, rgba(139, 92, 246, 0.2), transparent)', width: '100%' }}></div>
                        </motion.div>
                    </SpotlightCard>
                </div>
            </div>
        </section>
    );
};

export default Solution;
