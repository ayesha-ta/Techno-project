import React from 'react';
import { motion } from 'framer-motion';
import styles from './Testimonials.module.css';

const testimonials = [
    {
        id: 1,
        name: "Sarah Jenkins",
        role: "Software Engineer",
        text: "I applied to 50 jobs manually and got 0 responses. With CareerAI, I got 3 interviews in a week. The interview simulator was a game changer!",
        initials: "SJ"
    },
    {
        id: 2,
        name: "David Chen",
        role: "Product Manager",
        text: "The auto-apply feature saved me hours every day. I could focus on preparing for the actual interviews instead of filling out repetitive forms.",
        initials: "DC"
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        role: "New Grad",
        text: "As a fresh graduate, I was lost. The AI guidance helped me tailor my resume and gave me the confidence I needed to land my first job.",
        initials: "ER"
    }
];

const Testimonials = () => {
    return (
        <section className={styles.section}>
            <motion.h2
                className={styles.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                Trusted by <span style={{ color: '#3b82f6' }}>Job Seekers</span>
            </motion.h2>

            <div className={styles.grid}>
                {testimonials.map((t, i) => (
                    <motion.div
                        key={t.id}
                        className={styles.card}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <div className={styles.header}>
                            <div className={styles.avatar}>{t.initials}</div>
                            <div className={styles.info}>
                                <h4>{t.name}</h4>
                                <span>{t.role}</span>
                            </div>
                        </div>
                        <p className={styles.text}>"{t.text}"</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
