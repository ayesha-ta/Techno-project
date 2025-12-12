import React from 'react';
import { FaBookmark, FaEllipsisH } from 'react-icons/fa';
import { motion } from 'framer-motion';
import styles from './Dashboard.module.css';
import welcomeHeader from '../assets/welcome_header.png';

const JobCard = ({ title, company, location, type, posted, delay }) => (
    <motion.div
        className={styles.jobCard}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay }}
    >
        <div className={styles.jobHeader}>
            <div className={styles.companyLogo}>{company[0]}</div>
            <div className={styles.jobInfo}>
                <h4>{title}</h4>
                <p>{company} • {location}</p>
            </div>
            <button className={styles.actionBtn}><FaBookmark /></button>
        </div>
        <div className={styles.tags}>
            <span className={styles.tag}>{type}</span>
            <span className={styles.tag}>Remote</span>
        </div>
        <div className={styles.jobFooter}>
            <span>{posted}</span>
            <button className={styles.applyBtn}>Easy Apply</button>
        </div>
    </motion.div>
);

const Dashboard = () => {
    return (
        <div className={styles.dashboard}>
            <div className={styles.feed}>
                <motion.div
                    className={styles.welcomeBanner}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <div className={styles.welcomeText}>
                        <h3>Welcome back, Ayesha! 👋</h3>
                        <p>We found 12 new jobs matching your "Frontend Developer" profile.</p>
                    </div>
                    <div className={styles.welcomeVisual}>
                        <img src={welcomeHeader} alt="Welcome" />
                    </div>
                </motion.div>

                <h4 className={styles.sectionTitle}>Recommended for you</h4>
                <JobCard
                    title="Senior React Developer"
                    company="TechFlow"
                    location="San Francisco, CA"
                    type="Full-time"
                    posted="2 hours ago"
                    delay={0.1}
                />
                <JobCard
                    title="Frontend Engineer"
                    company="InnovateLab"
                    location="New York, NY"
                    type="Contract"
                    posted="5 hours ago"
                    delay={0.2}
                />
                <JobCard
                    title="UI/UX Designer"
                    company="CreativeMinds"
                    location="Austin, TX"
                    type="Full-time"
                    posted="1 day ago"
                    delay={0.3}
                />
            </div>

            <div className={styles.widgets}>
                <motion.div
                    className={styles.widget}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <h4>Profile Status</h4>

                    <div className={styles.chartCircle}>
                        <svg viewBox="0 0 36 36" className={styles.circularChart}>
                            <path className={styles.circleBg}
                                d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path className={styles.circle}
                                strokeDasharray="85, 100"
                                d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <text x="18" y="20.35" className={styles.percentage}>85%</text>
                        </svg>
                    </div>

                    <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#aaa', marginTop: '1rem' }}>Great job! Complete 1 more section.</p>
                    <button className={styles.linkBtn}>Complete Profile</button>
                </motion.div>

                <motion.div
                    className={styles.widget}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <h4>Upcoming Interviews</h4>
                    <div className={styles.emptyState}>
                        <div className={styles.calendarIcon}>📅</div>
                        <p>No interviews scheduled yet.</p>
                    </div>
                    <button className={styles.linkBtn}>Practice Now</button>
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
