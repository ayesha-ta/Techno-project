import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FaLinkedin, FaLock } from 'react-icons/fa';
import styles from './InterviewSetup.module.css';

const InterviewFeedback = () => {
    const { state } = useLocation();
    const [data, setData] = useState(null);

    useEffect(() => {
        if (state) {
            setData(state);
        } else {
            // Fallback for direct access
            setData({
                scores: { confidence: 85, clarity: 92, technical: 78 },
                strengths: [
                    "Strong opening introduction.",
                    "Good use of technical terminology (React Hooks, Virtual DOM)."
                ],
                improvements: [
                    "Try to structure behavioral answers using the STAR method.",
                    "Speak at a slightly faster pace during technical explanations."
                ]
            });
        }
    }, [state]);

    if (!data) return null;

    return (
        <div className={styles.container} style={{ textAlign: 'center' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <h2>Interview Complete! 🎉</h2>
                <p style={{ marginBottom: '3rem' }}>Here is your AI performance analysis.</p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
                    <div style={{ background: '#222', padding: '2rem', borderRadius: '1rem', width: '150px' }}>
                        <h3 style={{ fontSize: '2.5rem', margin: 0, color: '#10b981' }}>{data.scores.confidence}%</h3>
                        <p>Confidence</p>
                    </div>
                    <div style={{ background: '#222', padding: '2rem', borderRadius: '1rem', width: '150px' }}>
                        <h3 style={{ fontSize: '2.5rem', margin: 0, color: '#3b82f6' }}>{data.scores.clarity}%</h3>
                        <p>Clarity</p>
                    </div>
                    <div style={{ background: '#222', padding: '2rem', borderRadius: '1rem', width: '150px' }}>
                        <h3 style={{ fontSize: '2.5rem', margin: 0, color: '#f59e0b' }}>{data.scores.technical}%</h3>
                        <p>Technical</p>
                    </div>
                </div>

                <div style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
                    <h3>Key Strengths</h3>
                    <ul style={{ color: '#aaa', marginBottom: '2rem' }}>
                        {data.strengths.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                    <h3>Areas for Improvement</h3>
                    <ul style={{ color: '#aaa' }}>
                        {data.improvements.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem' }}>
                    <button
                        className={styles.secondaryBtn}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#0077b5', border: 'none', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '0.5rem', cursor: 'pointer' }}
                        onClick={() => alert("Redirecting to LinkedIn to share your achievement...")}
                    >
                        <FaLinkedin /> Share Certificate
                    </button>

                    <button
                        className={styles.primaryBtn}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(45deg, #8b5cf6, #d946ef)', border: 'none', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '0.5rem', cursor: 'pointer' }}
                        onClick={() => alert("Content Locked! Upgrade to PRO to download the detailed analysis report.")}
                    >
                        <FaLock /> Unlock Premium Report
                    </button>
                </div>

                <Link to="/dashboard" className={styles.startBtn}>Back to Dashboard</Link>
            </motion.div>
        </div>
    );
};

export default InterviewFeedback;
