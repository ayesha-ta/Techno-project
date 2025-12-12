import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Hero.module.css';
import dashboardImg from '../assets/dashboard.png';

const Hero = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    return (
        <section id="hero" className={styles.hero}>
            <div className={styles.aurora}></div>

            <div className={styles.content}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className={styles.badge}
                >
                    ✨ Presented By: Ayesha Tariq & Tooba Noor
                </motion.div>

                <motion.h1
                    className={styles.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <span className={styles.gradientText}>Apply Smart.</span> <br />
                    <span className={styles.highlight}>Prepare Smarter.</span>
                </motion.h1>

                <motion.p
                    className={styles.subtitle}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    A unified AI-powered career assistant that automatically finds and applies to best-fit jobs,
                    and prepares you with realistic interview simulations.
                </motion.p>

                <motion.div
                    className={styles.ctaGroup}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <button className={styles.primaryBtn}>Get Started Free</button>
                    <button className={styles.secondaryBtn}>See How It Works</button>
                </motion.div>
            </div>

            <motion.div
                className={styles.dashboardWrapper}
                style={{ y: y1 }}
                initial={{ opacity: 0, rotateX: 25, y: 100 }}
                animate={{ opacity: 1, rotateX: 10, y: 0 }}
                transition={{ duration: 1, delay: 0.8, type: "spring" }}
            >
                <motion.img
                    src={dashboardImg}
                    alt="Career AI Dashboard"
                    className={styles.dashboardImg}
                    animate={{
                        y: [0, -20, 0],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </motion.div>
        </section>
    );
};

export default Hero;
