import React from 'react';
import { motion } from 'framer-motion';
import styles from './CTA.module.css';

const CTA = () => {
    return (
        <section className={styles.section}>
            <div className={styles.glow}></div>
            <div className={styles.content}>
                <motion.h2
                    className={styles.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Ready to Land Your Dream Job?
                </motion.h2>

                <motion.p
                    className={styles.subtitle}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    Join thousands of candidates who are applying smart and preparing smarter.
                </motion.p>

                <motion.button
                    className={styles.btn}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    Start For Free
                </motion.button>
            </div>
        </section>
    );
};

export default CTA;
