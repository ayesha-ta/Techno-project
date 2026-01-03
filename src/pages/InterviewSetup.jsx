import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaUserTie, FaCode, FaLightbulb, FaRocket, FaDollarSign } from 'react-icons/fa';
import styles from './InterviewSetup.module.css';

const InterviewSetup = () => {
    const navigate = useNavigate();
    const [selectedMode, setSelectedMode] = useState(null);
    const [difficulty, setDifficulty] = useState('Medium');
    const [resumeText, setResumeText] = useState('');

    const modes = [
        { id: 'hr', name: 'HR / Behavioral', icon: <FaUserTie />, desc: 'Common behavioral questions like "Tell me about a time..."' },
        { id: 'tech', name: 'Technical', icon: <FaCode />, desc: 'Coding challenges, system design, and language specifics.' },
        { id: 'founder', name: 'Founder / Vision', icon: <FaRocket />, desc: 'High-level strategy, culture fit, and startup mindset.' },
        { id: 'negotiation', name: 'Salary Negotiation', icon: <FaDollarSign />, desc: 'Practice negotiating your salary and benefits package.', premium: true },
    ];

    const handleStart = () => {
        if (!selectedMode) return;
        navigate('/dashboard/interview/session', { state: { mode: selectedMode, difficulty, resumeText } });
    };

    return (
        <div className={styles.container}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={styles.header}
            >
                <h2>AI Interview Simulator</h2>
                <p>Choose your interview type to begin a realistic simulation.</p>
            </motion.div>

            <div className={styles.grid}>
                {modes.map((mode, i) => (
                    <motion.div
                        key={mode.id}
                        className={`${styles.card} ${selectedMode === mode.id ? styles.active : ''}`}
                        onClick={() => setSelectedMode(mode.id)}
                        whileHover={{ scale: 1.02 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <div className={styles.icon}>{mode.icon}</div>
                        <h3>{mode.name} {mode.premium && <span style={{ fontSize: '0.7rem', background: 'linear-gradient(45deg, #8b5cf6, #d946ef)', padding: '0.2rem 0.5rem', borderRadius: '0.3rem', marginLeft: '0.5rem' }}>💎 PRO</span>}</h3>
                        <p>{mode.desc}</p>
                    </motion.div>
                ))}
            </div>

            <div className={styles.settings}>
                <label>Difficulty Level:</label>
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                </select>
            </div>

            <div className={styles.settings}>
                <label>Resume / Job Context (Optional):</label>
                <textarea
                    className={styles.contextInput}
                    placeholder="Paste your resume summary or target job description here to personalize the interview..."
                    rows="4"
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        border: '1px solid rgba(255,255,255,0.1)',
                        background: 'rgba(0,0,0,0.2)',
                        color: 'white',
                        fontFamily: 'inherit',
                        marginTop: '0.5rem',
                        resize: 'vertical'
                    }}
                />
            </div>

            <button
                className={styles.startBtn}
                disabled={!selectedMode}
                onClick={handleStart}
            >
                Start Interview Session
            </button>
        </div>
    );
};

export default InterviewSetup;
