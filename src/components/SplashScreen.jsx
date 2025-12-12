import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './SplashScreen.module.css';

const SplashScreen = ({ onComplete }) => {
    const [exit, setExit] = useState(false);

    useEffect(() => {
        // Start exit sequence after animation logic
        const timer = setTimeout(() => {
            setExit(true);
            setTimeout(onComplete, 800); // Wait for exit animation
        }, 2500);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            className={styles.container}
            initial={{ opacity: 1 }}
            animate={exit ? { opacity: 0, y: -50 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            <div className={styles.content}>
                <motion.div
                    className={styles.logoContainer}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <div className={styles.iconWrapper}>
                        <div className={styles.hexBg}></div>
                        <motion.div
                            className={styles.innerGlow}
                            animate={{ boxShadow: ["0 0 20px rgba(59,130,246,0.2)", "0 0 40px rgba(59,130,246,0.6)", "0 0 20px rgba(59,130,246,0.2)"] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </div>

                    <h1 className={styles.title}>
                        <span className={styles.word}>HIRE</span>
                        <span className={styles.wordDark}>FLOW</span>
                        <span className={styles.ai}>AI</span>
                    </h1>
                </motion.div>

                <motion.div
                    className={styles.loaderLine}
                    initial={{ width: 0 }}
                    animate={{ width: "200px" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />

                <motion.p
                    className={styles.tagline}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                >
                    Future of Recruitment
                </motion.p>
            </div>
        </motion.div>
    );
};

export default SplashScreen;
