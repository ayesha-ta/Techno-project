import React from 'react';
import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import styles from './Pricing.module.css';

const Pricing = () => {
    return (
        <section id="pricing" className={styles.section}>
            <h2 className={styles.title}>Flexible <span style={{ color: '#3b82f6' }}>Plans</span></h2>
            <p className={styles.subtitle}>Choose the plan that fits your career goals.</p>

            <div className={styles.grid}>
                {/* Free Plan */}
                <motion.div
                    className={styles.card}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className={styles.planName}>Free Basis</div>
                    <div className={styles.price}>$0<span>/month</span></div>
                    <ul className={styles.features}>
                        <li><FaCheck className={styles.check} /> Basic Job Matching</li>
                        <li><FaCheck className={styles.check} /> Limited Applications</li>
                        <li><FaCheck className={styles.check} /> Basic Profile Builder</li>
                    </ul>
                    <button className={styles.btn}>Get Started</button>
                </motion.div>

                {/* Pro Plan */}
                <motion.div
                    className={`${styles.card} ${styles.popular}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    <div className={styles.badge}>Most Popular</div>
                    <div className={styles.planName}>Pro</div>
                    <div className={styles.price}>$10<span>/month</span></div>
                    <ul className={styles.features}>
                        <li><FaCheck className={styles.check} /> Everything in Free</li>
                        <li><FaCheck className={styles.check} /> Auto-apply Functionality</li>
                        <li><FaCheck className={styles.check} /> AI Interview Simulations</li>
                        <li><FaCheck className={styles.check} /> Priority Support</li>
                    </ul>
                    <button className={`${styles.btn} ${styles.btnPrimary}`}>Upgrade to Pro</button>
                </motion.div>

                {/* Elite Plan */}
                <motion.div
                    className={styles.card}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <div className={styles.planName}>Elite</div>
                    <div className={styles.price}>$22<span>/month</span></div>
                    <ul className={styles.features}>
                        <li><FaCheck className={styles.check} /> Everything in Pro</li>
                        <li><FaCheck className={styles.check} /> Advanced Analytics</li>
                        <li><FaCheck className={styles.check} /> 1-on-1 Mentor Support</li>
                        <li><FaCheck className={styles.check} /> Unlimited Applications</li>
                    </ul>
                    <button className={styles.btn}>Go Elite</button>
                </motion.div>
            </div>
        </section>
    );
};

export default Pricing;
