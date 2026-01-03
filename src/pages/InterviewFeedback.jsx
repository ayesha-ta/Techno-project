import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FaLinkedin, FaLock, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import styles from './InterviewSetup.module.css';

const InterviewFeedback = () => {
    const { state } = useLocation();
    const [data, setData] = useState(null);

    useEffect(() => {
        if (state && state.scores) {
            setData(state);
        } else {
            // Fallback for direct access or if AI failed to give stats
            setData({
                scores: { confidence: 70, clarity: 75, technical: 65 },
                strengths: [
                    "Completed the session.",
                    "Demonstrated basic understanding."
                ],
                improvements: [
                    "Could not retrieve detailed AI analysis.",
                    "Try again to get a full report."
                ]
            });
        }
    }, [state]);

    if (!data) return <div style={{ padding: '2rem', textAlign: 'center', color: 'white' }}>Generating Report...</div>;

    return (
        <div className={styles.container} style={{ textAlign: 'center', color: 'white' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <h2>Interview Complete! 🎉</h2>
                <p style={{ marginBottom: '3rem', color: '#aaa' }}>Here is your AI performance analysis.</p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
                    <div style={{ background: '#222', padding: '2rem', borderRadius: '1rem', width: '150px' }}>
                        <h3 style={{ fontSize: '2.5rem', margin: 0, color: '#10b981' }}>{data.scores?.confidence || 0}%</h3>
                        <p>Confidence</p>
                    </div>
                    <div style={{ background: '#222', padding: '2rem', borderRadius: '1rem', width: '150px' }}>
                        <h3 style={{ fontSize: '2.5rem', margin: 0, color: '#3b82f6' }}>{data.scores?.clarity || 0}%</h3>
                        <p>Clarity</p>
                    </div>
                    <div style={{ background: '#222', padding: '2rem', borderRadius: '1rem', width: '150px' }}>
                        <h3 style={{ fontSize: '2.5rem', margin: 0, color: '#f59e0b' }}>{data.scores?.technical || 0}%</h3>
                        <p>Technical</p>
                    </div>
                </div>

                <div style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
                    <h3><FaCheckCircle color="#10b981" /> Key Strengths</h3>
                    <ul style={{ color: '#aaa', marginBottom: '2rem', listStyle: 'none', padding: 0 }}>
                        {data.strengths?.map((item, i) => (
                            <li key={i} style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                                <span>•</span> {item}
                            </li>
                        ))}
                    </ul>
                    <h3><FaExclamationTriangle color="#f59e0b" /> Areas for Improvement</h3>
                    <ul style={{ color: '#aaa', listStyle: 'none', padding: 0 }}>
                        {data.improvements?.map((item, i) => (
                            <li key={i} style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                                <span>•</span> {item}
                            </li>
                        ))}
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

                <Link to="/dashboard" className={styles.startBtn} style={{ textDecoration: 'none', display: 'inline-block' }}>Back to Dashboard</Link>
            </motion.div>
        </div>
    );
};

export default InterviewFeedback;
