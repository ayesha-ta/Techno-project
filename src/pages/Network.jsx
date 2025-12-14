import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUserPlus, FaRobot, FaBriefcase, FaGraduationCap, FaStar } from 'react-icons/fa';
import styles from './Dashboard.module.css'; // Reuse dashboard styles for consistency

const NetworkCard = ({ person, index }) => (
    <motion.div
        className={styles.jobCard} // Reusing card style
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        style={{ display: 'flex', flexDirection: 'column', height: '100%', border: '1px solid rgba(59, 130, 246, 0.2)' }}
    >
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{
                width: '60px', height: '60px', borderRadius: '50%', background: '#334155',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', color: '#cbd5e1'
            }}>
                {person.initials}
            </div>
            <div>
                <h4 style={{ margin: '0 0 0.2rem 0', fontSize: '1.1rem' }}>{person.name}</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#94a3b8' }}>{person.role}</p>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>{person.company}</p>
            </div>
        </div>

        <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.8rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#10b981', fontSize: '0.8rem', fontWeight: 'bold' }}>
                <FaRobot /> AI Reason: {person.matchScore}% Match
            </div>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#e2e8f0', lineHeight: '1.4' }}>
                "{person.reason}"
            </p>
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem' }}>
            <button className={styles.applyBtn} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <FaUserPlus /> Connect
            </button>
            <button className={styles.secondaryBtn} style={{ padding: '0.5rem' }}>
                Profile
            </button>
        </div>
    </motion.div>
);

const Network = () => {
    const [filter, setFilter] = useState('recommended');

    const recommended = [
        { id: 1, name: "David Kim", initials: "DK", role: "Sr. Frontend Engineer", company: "Google", matchScore: 98, reason: "Works at your dream company and shares your React expertise." },
        { id: 2, name: "Sarah Jenkins", initials: "SJ", role: "Product Manager", company: "Meta", matchScore: 85, reason: "Can offer insights into PM-Dev collaboration which is a skill you wanted to improve." },
        { id: 3, name: "Dr. Emily Wong", initials: "EW", role: "AI Researcher", company: "OpenAI", matchScore: 92, reason: "Her research aligns with your recent certifcations." },
    ];

    const mentors = [
        { id: 4, name: "James Carter", initials: "JC", role: "CTO", company: "TechStart", matchScore: 95, reason: "Perfect mentor for your path to Tech Lead." },
        { id: 5, name: "Linda Ray", initials: "LR", role: "VP of Engineering", company: "CloudCorp", matchScore: 90, reason: "Experienced leader in the sector you are applying to." }
    ];

    const alumni = [
        { id: 6, name: "Marcus Johnson", initials: "MJ", role: "Software Architect", company: "Alumni Network", matchScore: 88, reason: "Graduated from your university 3 years ago. Great for networking." },
        { id: 7, name: "Chloe Davis", initials: "CD", role: "Data Scientist", company: "TechFlow", matchScore: 82, reason: "Fellow alumni working in your city." }
    ];

    const data = filter === 'mentors' ? mentors : filter === 'alumni' ? alumni : recommended;

    return (
        <div className={styles.dashboard}>
            <motion.div
                className={styles.welcomeBanner}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)' }}
            >
                <div className={styles.welcomeText}>
                    <h3>Expand Your Smart Network 🌐</h3>
                    <p>AI-curated connections to accelerate your career growth.</p>
                </div>
            </motion.div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <button
                    onClick={() => setFilter('recommended')}
                    style={{
                        padding: '0.6rem 1.2rem', borderRadius: '2rem', border: 'none', cursor: 'pointer', fontWeight: 'bold',
                        background: filter === 'recommended' ? '#3b82f6' : 'rgba(255,255,255,0.1)',
                        color: filter === 'recommended' ? 'white' : '#94a3b8'
                    }}
                >
                    Recommended
                </button>
                <button
                    onClick={() => setFilter('mentors')}
                    style={{
                        padding: '0.6rem 1.2rem', borderRadius: '2rem', border: 'none', cursor: 'pointer', fontWeight: 'bold',
                        background: filter === 'mentors' ? '#8b5cf6' : 'rgba(255,255,255,0.1)',
                        color: filter === 'mentors' ? 'white' : '#94a3b8'
                    }}
                >
                    Find Mentors
                </button>
                <button
                    onClick={() => setFilter('alumni')}
                    style={{
                        padding: '0.6rem 1.2rem', borderRadius: '2rem', border: 'none', cursor: 'pointer', fontWeight: 'bold',
                        background: filter === 'alumni' ? '#10b981' : 'rgba(255,255,255,0.1)',
                        color: filter === 'alumni' ? 'white' : '#94a3b8'
                    }}
                >
                    Alumni
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {data.map((person, index) => (
                    <NetworkCard key={person.id} person={person} index={index} />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{ marginTop: '3rem', padding: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '1rem', textAlign: 'center' }}
            >
                <h4 style={{ marginBottom: '1rem' }}><FaStar color="#fbbf24" /> Grow Your Influence</h4>
                <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>Post your recent "AI Verified" interview score to get 5x more connection requests.</p>
                <button className={styles.primaryBtn}>Create Post</button>
            </motion.div>
        </div>
    );
};

export default Network;
