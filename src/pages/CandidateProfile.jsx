import React from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaCheck, FaDownload, FaEnvelope, FaRobot, FaStream, FaTrophy } from 'react-icons/fa';
import styles from './CandidateProfile.module.css';

const CandidateProfile = () => {
    const { id } = useParams();

    const CANDIDATE_DATA = {
        1: {
            name: "Ayesha Tariq",
            role: "Frontend Developer",
            bio: "Passionate developer crafting pixel-perfect, accessible, and performant web experiences. Specialized in React ecosystem with a keen eye for UI/UX design.",
            readiness: 92,
            image: "AT",
            skills: ["React", "TypeScript", "Node.js", "Framer Motion", "Tailwind CSS", "GraphQL"],
            stats: { technical: 95, culture: 88, communication: 90 },
            timeline: [
                { title: "Profile Completed", date: "Oct 10, 2025", done: true },
                { title: "Technical Assessment", date: "Oct 12, 2025", done: true },
                { title: "AI Mock Interview", date: "Oct 15, 2025", done: true, active: true },
                { title: "Final Hiring Review", date: "Pending", done: false }
            ]
        },
        2: {
            name: "Sarah Chen",
            role: "UX Designer",
            bio: "User-centric designer with a background in psychology. Expert in Figma, prototyping, and conducting user research to drive product decisions.",
            readiness: 88,
            image: "SC",
            skills: ["Figma", "User Research", "Prototyping", "Adobe XD", "Wireframing"],
            stats: { technical: 85, culture: 92, communication: 95 },
            timeline: [
                { title: "Profile Completed", date: "Nov 01, 2025", done: true },
                { title: "Portfolio Review", date: "Nov 05, 2025", done: true },
                { title: "Design Challenge", date: "Nov 10, 2025", done: true, active: true }
            ]
        },
        3: {
            name: "Michael Ross",
            role: "Backend Engineer",
            bio: "Scalable systems architect. Experienced in building high-concurrency capability services using Python and Go. Cloud native advocate.",
            readiness: 95,
            image: "MR",
            skills: ["Python", "Django", "AWS", "Docker", "Kubernetes", "PostgreSQL"],
            stats: { technical: 98, culture: 85, communication: 82 },
            timeline: [
                { title: "Profile Completed", date: "Sep 15, 2025", done: true },
                { title: "System Design Round", date: "Sep 20, 2025", done: true },
                { title: "Coding Round", date: "Sep 22, 2025", done: true, active: true }
            ]
        }
    };

    const candidate = CANDIDATE_DATA[id] || CANDIDATE_DATA[1];

    return (
        <div className={styles.container}>
            {/* Immersive Header */}
            <div className={styles.heroHeader}>
                <div className={styles.heroOverlay}></div>
                <Link to="/dashboard/agencies" className={styles.backLink}>
                    <FaArrowLeft /> Talent Search
                </Link>

                <div className={styles.profileCard}>
                    <div className={styles.avatarContainer}>
                        <div className={styles.avatar}>{candidate.image}</div>
                        <div className={styles.verifiedBadge}><FaCheck size={14} /></div>
                    </div>
                    <div className={styles.headerInfo}>
                        <div className={styles.nameGroup}>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                {candidate.name}
                            </motion.h1>
                        </div>
                        <p className={styles.role}>{candidate.role}</p>
                    </div>
                    <div className={styles.actions}>
                        <button className={styles.secondaryBtn} title="Save Profile"><FaDownload /></button>
                        <button className={styles.primaryBtn}><FaEnvelope style={{ marginRight: '8px' }} /> Contact</button>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className={styles.contentGrid}>
                {/* Left Column: Analytics */}
                <div>
                    <div className={styles.sectionTitle}><FaTrophy /> AI Assessment</div>

                    <div className={styles.analyticsCard}>
                        {/* Radial 1: Overall */}
                        <div className={styles.chartContainer}>
                            <svg className={styles.circularChart} viewBox="0 0 36 36">
                                <path className={styles.circleBg} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                <motion.path
                                    className={styles.circle}
                                    stroke="#3b82f6"
                                    strokeDasharray={`${candidate.readiness}, 100`}
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    initial={{ strokeDasharray: "0, 100" }}
                                    animate={{ strokeDasharray: `${candidate.readiness}, 100` }}
                                    transition={{ duration: 1.5 }}
                                />
                            </svg>
                            <div className={styles.chartLabel}>
                                <h2>{candidate.readiness}</h2>
                                <span>Readiness</span>
                            </div>
                        </div>

                        {/* Radial 2: Technical */}
                        <div className={styles.chartContainer}>
                            <svg className={styles.circularChart} viewBox="0 0 36 36">
                                <path className={styles.circleBg} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                <motion.path
                                    className={styles.circle}
                                    stroke="#10b981"
                                    strokeDasharray={`${candidate.stats.technical}, 100`}
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    initial={{ strokeDasharray: "0, 100" }}
                                    animate={{ strokeDasharray: `${candidate.stats.technical}, 100` }}
                                    transition={{ duration: 1.5, delay: 0.2 }}
                                />
                            </svg>
                            <div className={styles.chartLabel}>
                                <h2>{candidate.stats.technical}</h2>
                                <span>Technical</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.sectionTitle}><FaRobot /> Simulation Results</div>
                    <div className={styles.interviewGrid}>
                        <motion.div className={styles.holographCard} whileHover={{ scale: 1.02 }}>
                            <div className={styles.cardHead}><span>Technical Round</span> <FaCheck color="#10b981" /></div>
                            <div className={styles.cardScore}>9.5/10</div>
                            <div className={styles.cardFooter}>Strength: React Patterns</div>
                        </motion.div>
                        <motion.div className={styles.holographCard} whileHover={{ scale: 1.02 }}>
                            <div className={styles.cardHead}><span>Behavioral</span> <FaCheck color="#10b981" /></div>
                            <div className={styles.cardScore}>8.8/10</div>
                            <div className={styles.cardFooter}>Strength: Leadership</div>
                        </motion.div>
                    </div>

                    <div className={styles.sectionTitle}>About Candidate</div>
                    <div className={styles.aboutSection}>
                        <p>{candidate.bio}</p>
                        <div className={styles.skillTags}>
                            {candidate.skills.map(skill => (
                                <span key={skill} className={styles.skillTag}>{skill}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Timeline */}
                <div>
                    <div className={styles.sectionTitle}><FaStream /> Journey</div>
                    <div className={styles.timeline}>
                        {candidate.timeline.map((item, i) => (
                            <motion.div
                                key={i}
                                className={`${styles.timelineItem} ${item.active || item.done ? styles.activeItem : ''}`}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className={styles.timelineDot}></div>
                                <div className={styles.timelineContent}>
                                    <h4>{item.title}</h4>
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
