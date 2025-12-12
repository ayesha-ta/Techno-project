import React from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaCheckCircle, FaRobot, FaCode, FaMicrophone } from 'react-icons/fa';
import styles from './AgencyDashboard.module.css';

const CandidateProfile = () => {
    const { id } = useParams();

    // In a real app, fetch data based on ID. Using static mock for demo.
    const candidate = {
        name: "Ayesha Tariq",
        role: "Frontend Developer",
        bio: "Passionate frontend developer specializing in building immersive web experiences with React and modern UI libraries.",
        readiness: 92,
        interviews: [
            { type: "Technical Round", score: 95, date: "2 days ago" },
            { type: "Behavioral", score: 88, date: "5 days ago" }
        ],
        timeline: [
            { title: "Profile Completed", date: "Oct 10", done: true },
            { title: "AI Resume Analysis", date: "Oct 12", done: true },
            { title: "Mock Interview (Tech)", date: "Oct 15", done: true },
            { title: "Mock Interview (Culture)", date: "Oct 18", done: true },
            { title: "Ready for HIRE", date: "Now", done: true, active: true }
        ]
    };

    return (
        <div className={styles.profileContainer}>
            <Link to="/dashboard/agencies" className={styles.backLink}><FaArrowLeft /> Back to Search</Link>

            <div className={styles.profileHeader}>
                <div className={styles.profileAvatarLarge}>AT</div>
                <div className={styles.profileInfo}>
                    <div className={styles.nameRow}>
                        <h1>{candidate.name}</h1>
                        <div className={styles.verifiedBadge}><FaCheckCircle /> AI Verified</div>
                    </div>
                    <p className={styles.profileRole}>{candidate.role}</p>
                    <p className={styles.bio}>{candidate.bio}</p>
                </div>
                <div className={styles.actionParams}>
                    <button className={styles.contactBtn}>Contact Candidate</button>
                    <button className={styles.saveBtn}>Save Profile</button>
                </div>
            </div>

            <div className={styles.profileGrid}>
                {/* Left Col: Readiness */}
                <div className={styles.profileSection}>
                    <h3>AI Readiness Analysis</h3>
                    <div className={styles.scoreCard}>
                        <div className={styles.bigScore}>{candidate.readiness}</div>
                        <div className={styles.scoreLabel}>Overall Score</div>
                        <p>Top 5% of candidates in this role.</p>
                    </div>

                    <div className={styles.interviewList}>
                        <h4>Recent Simulations</h4>
                        {candidate.interviews.map((int, i) => (
                            <div key={i} className={styles.interviewItem}>
                                <div className={styles.intIcon}><FaRobot /></div>
                                <div className={styles.intInfo}>
                                    <span className={styles.intType}>{int.type}</span>
                                    <span className={styles.intDate}>{int.date}</span>
                                </div>
                                <div className={styles.intScore}>{int.score}/100</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Col: Timeline */}
                <div className={styles.profileSection}>
                    <h3>Preparation Timeline</h3>
                    <div className={styles.timeline}>
                        {candidate.timeline.map((item, i) => (
                            <motion.div
                                key={i}
                                className={`${styles.timelineItem} ${item.active ? styles.activeItem : ''}`}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className={styles.timelineDot}></div>
                                <div className={styles.timelineContent}>
                                    <span className={styles.timelineTitle}>{item.title}</span>
                                    <span className={styles.timelineDate}>{item.date}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CandidateProfile;
