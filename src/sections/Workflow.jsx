import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Workflow.module.css';

const steps = [
    { step: 1, title: 'Build Profile', desc: 'Connect LinkedIn or upload resume to create your AI digital twin.' },
    { step: 2, title: 'AI Matching', desc: 'Our algorithms scan millions of jobs to find high-probability matches.' },
    { step: 3, title: 'Auto-Apply', desc: 'The agent fills out applications for you, customizing answers for each role.' },
    { step: 4, title: 'Interview Prep', desc: 'Practice with simulated interviews tailored to the specific company and role.' },
    { step: 5, title: 'Get Hired', desc: 'Track your offers and negotiate salaries with AI guidance.' }
];

const Workflow = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <section id="workflow" className={styles.section} ref={ref}>
            <div className={styles.container}>
                <motion.h2
                    className={styles.title}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                >
                    How It <span className={styles.highlight}>Works</span>
                </motion.h2>

                <div className={styles.timeline}>
                    <motion.div
                        className={styles.line}
                        style={{ scaleY, originY: 0 }}
                    ></motion.div>

                    {steps.map((item, index) => (
                        <div key={index} className={`${styles.step} ${index % 2 === 0 ? styles.left : styles.right}`}>
                            <div className={styles.content}>
                                <div className={styles.number}>{item.step}</div>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Workflow;
