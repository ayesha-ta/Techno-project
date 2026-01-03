import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaStar, FaCheckCircle, FaTimes, FaRobot } from 'react-icons/fa';
import styles from './AgencyDashboard.module.css';
import { useUser } from '../context/UserContext';

const MOCK_CANDIDATES = [
    {
        id: 1,
        name: "Ayesha Tariq",
        role: "Frontend Developer",
        experience: "3 Years",
        readiness: 92,
        skills: ["React", "Framer Motion", "Node.js"],
        status: "Interview Ready",
        image: "AT"
    },
    {
        id: 2,
        name: "Sarah Chen",
        role: "UX Designer",
        experience: "5 Years",
        readiness: 88,
        skills: ["Figma", "User Research", "Prototyping"],
        status: "Interview Ready",
        image: "SC"
    },
    {
        id: 3,
        name: "Michael Ross",
        role: "Backend Engineer",
        experience: "4 Years",
        readiness: 95,
        skills: ["Python", "Django", "AWS"],
        status: "Top Talent",
        image: "MR"
    }
];

const AgencyDashboard = () => {
    const { addJob } = useUser();
    const [searchQuery, setSearchQuery] = useState("");
    const [showPostModal, setShowPostModal] = useState(false);
    const [isPosting, setIsPosting] = useState(false);
    const [postSuccess, setPostSuccess] = useState(false);

    // Form inputs
    const [jobTitle, setJobTitle] = useState('');
    const [jobSkills, setJobSkills] = useState('');
    const [budget, setBudget] = useState('');

    const filteredCandidates = MOCK_CANDIDATES.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const handlePostJob = (e) => {
        e.preventDefault();
        setIsPosting(true);

        const newJob = {
            id: Date.now(),
            title: jobTitle,
            company: "Agency Client",
            location: "Remote",
            type: "Full-time",
            tags: jobSkills.split(',').map(s => s.trim()),
            posted: "Just Now",
            requiredSkills: jobSkills.split(',').map(s => s.trim())
        };

        // Simulate AI matching process
        setTimeout(() => {
            addJob(newJob);
            setIsPosting(false);
            setPostSuccess(true);
            setTimeout(() => {
                setPostSuccess(false);
                setShowPostModal(false);
                setJobTitle('');
                setJobSkills('');
                setBudget('');
            }, 3000);
        }, 2000);
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h2>Talent Discovery</h2>
                    <p>Find AI-verified candidates ready for their next role.</p>
                </div>
                <button className={styles.postBtn} onClick={() => setShowPostModal(true)}>Post a Job</button>
            </header>

            <div className={styles.controls}>
                <div className={styles.searchBar}>
                    <FaSearch />
                    <input
                        type="text"
                        placeholder="Search by role, skill, or name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button className={styles.filterBtn}><FaFilter /> Filters</button>
            </div>

            <div className={styles.grid}>
                {filteredCandidates.length > 0 ? (
                    filteredCandidates.map((candidate, index) => (
                        <motion.div
                            key={candidate.id}
                            className={styles.card}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className={styles.cardHeader}>
                                <div className={styles.avatar}>{candidate.image}</div>
                                <div className={styles.badge}>
                                    <FaCheckCircle /> {candidate.readiness}% AI Score
                                </div>
                            </div>

                            <h3>{candidate.name}</h3>
                            <p className={styles.role}>{candidate.role}</p>

                            <div className={styles.skills}>
                                {candidate.skills.map(skill => (
                                    <span key={skill} className={styles.skill}>{skill}</span>
                                ))}
                            </div>

                            <div className={styles.stats}>
                                <div>
                                    <span className={styles.label}>Exp</span>
                                    <span className={styles.value}>{candidate.experience}</span>
                                </div>
                                <div>
                                    <span className={styles.label}>Status</span>
                                    <span className={styles.valueHighlight}>{candidate.status}</span>
                                </div>
                            </div>

                            <Link to={`/dashboard/candidate/${candidate.id}`} className={styles.viewBtn}>
                                View Full Profile
                            </Link>
                        </motion.div>
                    ))
                ) : (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#888', padding: '3rem' }}>
                        No candidates found matching "{searchQuery}"
                    </div>
                )}
            </div>

            {/* Post Job Modal */}
            <AnimatePresence>
                {showPostModal && (
                    <div className={styles.modalOverlay}>
                        <motion.div
                            className={styles.modalContent}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                        >
                            {!postSuccess ? (
                                <form onSubmit={handlePostJob}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                        <h3>Post New Role</h3>
                                        <button type="button" onClick={() => setShowPostModal(false)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}><FaTimes /></button>
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label>Job Title</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Senior React Developer"
                                            required
                                            className={styles.modalInput}
                                            value={jobTitle}
                                            onChange={e => setJobTitle(e.target.value)}
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Required Skills (comma separated)</label>
                                        <input
                                            type="text"
                                            placeholder="React, Node.js, TypeScript"
                                            required
                                            className={styles.modalInput}
                                            value={jobSkills}
                                            onChange={e => setJobSkills(e.target.value)}
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Budget Range</label>
                                        <input
                                            type="text"
                                            placeholder="$80k - $120k"
                                            className={styles.modalInput}
                                            value={budget}
                                            onChange={e => setBudget(e.target.value)}
                                        />
                                    </div>

                                    <button type="submit" className={styles.submitBtn} disabled={isPosting}>
                                        {isPosting ? 'AI Matching...' : 'Post & Find Candidates'}
                                    </button>
                                </form>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '2rem' }}>
                                    <motion.div
                                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                                        style={{ width: '60px', height: '60px', background: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}
                                    >
                                        <FaCheckCircle color="white" size={30} />
                                    </motion.div>
                                    <h3>Job Posted Successfully!</h3>
                                    <p style={{ color: '#aaa' }}>The job is now live on the candidate feed.</p>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AgencyDashboard;
