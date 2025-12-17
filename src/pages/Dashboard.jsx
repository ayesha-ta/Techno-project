import React, { useState, useEffect } from 'react';
import { FaBookmark, FaEllipsisH, FaFileUpload, FaMagic, FaMicrophone } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';
import welcomeHeader from '../assets/welcome_header.png';
import AutoApplyModal from '../components/AutoApplyModal';
import { useUser } from '../context/UserContext';

const JobCard = ({ title, company, location, type, posted, tags, match, delay, onApply, onPrep }) => (
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
            {tags && tags.map(tag => <span key={tag} className={styles.tag}>{tag}</span>)}
            <span className={styles.matchScore}>{match}% Match</span>
        </div>
        <div className={styles.jobFooter}>
            <span>{posted}</span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                    className={styles.secondaryBtn}
                    onClick={() => onPrep && onPrep(title)}
                    style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '0.5rem', color: 'white', cursor: 'pointer' }}
                >
                    <FaMicrophone /> Prep
                </button>
                <button
                    className={styles.applyBtn}
                    onClick={() => onApply && onApply({ title, company })}
                >
                    Easy Apply
                </button>
            </div>
        </div>
    </motion.div>
);

const Dashboard = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const [selectedJob, setSelectedJob] = useState(null);
    const [resumeUploaded, setResumeUploaded] = useState(false);
    const [userSkills, setUserSkills] = useState([]);
    const [isParsing, setIsParsing] = useState(false);

    // Mock Database of Jobs
    const allJobs = [
        { id: 1, title: "Senior React Developer", company: "TechFlow", location: "San Francisco, CA", type: "Full-time", tags: ["React", "Node.js"], posted: "2 hours ago", requiredSkills: ["React", "JavaScript"] },
        { id: 2, title: "Frontend Engineer", company: "InnovateLab", location: "New York, NY", type: "Contract", tags: ["Vue", "CSS"], posted: "5 hours ago", requiredSkills: ["Vue", "Frontend"] },
        { id: 3, title: "UI/UX Designer", company: "CreativeMinds", location: "Austin, TX", type: "Full-time", tags: ["Figma", "Design"], posted: "1 day ago", requiredSkills: ["Design", "Figma"] },
        { id: 4, title: "Backend Developer", company: "ServerPro", location: "Remote", type: "Full-time", tags: ["Python", "Django"], posted: "3 hours ago", requiredSkills: ["Python", "Backend"] },
    ];

    const [displayedJobs, setDisplayedJobs] = useState(allJobs);

    const handleResumeUpload = (e) => {
        setIsParsing(true);
        // Simulate parsing delay
        setTimeout(() => {
            setResumeUploaded(true);
            setUserSkills(["React", "JavaScript", "Frontend", "Design"]); // Mock extracted skills
            setIsParsing(false);
        }, 2000);
    };

    useEffect(() => {
        if (resumeUploaded) {
            // Simple filter logic: Job is shown if user has at least one matching skill
            const filtered = allJobs.filter(job =>
                job.requiredSkills.some(skill => userSkills.includes(skill))
            ).map(job => ({
                ...job,
                match: 95 // High match for demo
            }));
            setDisplayedJobs(filtered);
        }
    }, [resumeUploaded, userSkills]);

    const handlePrep = (jobTitle) => {
        navigate('/dashboard/interview', { state: { mode: 'tech', jobTitle: jobTitle } });
    };

    return (
        <div className={styles.dashboard}>
            <AnimatePresence>
                {selectedJob && (
                    <AutoApplyModal
                        job={selectedJob}
                        onClose={() => setSelectedJob(null)}
                    />
                )}
            </AnimatePresence>

            <div className={styles.feed}>
                <motion.div
                    className={styles.welcomeBanner}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <div className={styles.welcomeText}>
                        <h3>Welcome back, {user?.name || 'Candidate'}! 👋</h3>
                        <p>
                            {resumeUploaded
                                ? `We found ${displayedJobs.length} jobs matching your skills: ${userSkills.join(', ')}.`
                                : "Upload your resume to see personalized job matches."}
                        </p>
                    </div>
                    <div className={styles.welcomeVisual}>
                        <img src={welcomeHeader} alt="Welcome" />
                    </div>
                </motion.div>

                <h4 className={styles.sectionTitle}>
                    {resumeUploaded ? "Matched for You" : "Recommended for you"}
                </h4>

                {displayedJobs.map((job, index) => (
                    <JobCard
                        key={job.id}
                        {...job}
                        match={job.match || 70}
                        delay={index * 0.1}
                        onApply={setSelectedJob}
                        onPrep={handlePrep}
                    />
                ))}
            </div>

            <div className={styles.widgets}>
                {/* Resume Upload Widget */}
                <motion.div
                    className={styles.widget}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h4>Resume Parser</h4>
                    {!resumeUploaded ? (
                        <div style={{
                            border: '2px dashed #444', padding: '1.5rem', borderRadius: '0.5rem',
                            textAlign: 'center', cursor: 'pointer', background: isParsing ? 'rgba(59, 130, 246, 0.1)' : 'transparent'
                        }} onClick={handleResumeUpload}>
                            {isParsing ? (
                                <>
                                    <FaMagic className={styles.spinner} style={{ marginBottom: '0.5rem', color: '#3b82f6' }} />
                                    <p style={{ margin: 0, fontSize: '0.9rem' }}>Extracting Skills...</p>
                                </>
                            ) : (
                                <>
                                    <FaFileUpload style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#666' }} />
                                    <p style={{ margin: 0, fontSize: '0.9rem' }}>Upload Resume to Match Jobs</p>
                                    <span style={{ fontSize: '0.7rem', color: '#555' }}>Supports PDF, DOCX</span>
                                </>
                            )}
                        </div>
                    ) : (
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#10b981' }}>
                                <FaCheckCircle /> <span style={{ fontWeight: 'bold' }}>Resume Parsed</span>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {userSkills.map(skill => (
                                    <span key={skill} style={{ background: '#333', padding: '0.3rem 0.6rem', borderRadius: '1rem', fontSize: '0.8rem' }}>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>

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
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path className={styles.circle}
                                strokeDasharray="85, 100"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <text x="18" y="20.35" className={styles.percentage}>85%</text>
                        </svg>
                    </div>
                    <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#aaa', marginTop: '1rem' }}>Great job! Complete 1 more section.</p>
                </motion.div>

                {/* ... Rest of widgets */}
                {/* Keeping Skill Analytics and Recommended Learning */}
                <motion.div
                    className={styles.widget}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <h4>Skill Analytics</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem', fontSize: '0.8rem', color: '#ccc' }}>
                                <span>React & Frontend</span>
                                <span>{resumeUploaded ? '96%' : '92%'}</span>
                            </div>
                            <div style={{ height: '6px', background: '#333', borderRadius: '3px' }}>
                                <div style={{ width: resumeUploaded ? '96%' : '92%', height: '100%', background: '#3b82f6', borderRadius: '3px' }}></div>
                            </div>
                        </div>
                        {/* ... other skill bars could be dynamic too */}
                    </div>
                </motion.div>

            </div>
        </div>
    );
};
import { FaCheckCircle } from 'react-icons/fa'; // Added missing import
export default Dashboard;
