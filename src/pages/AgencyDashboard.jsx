import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaStar, FaCheckCircle } from 'react-icons/fa';
import styles from './AgencyDashboard.module.css';

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
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h2>Talent Discovery</h2>
                    <p>Find AI-verified candidates ready for their next role.</p>
                </div>
                <button className={styles.postBtn}>Post a Job</button>
            </header>

            <div className={styles.controls}>
                <div className={styles.searchBar}>
                    <FaSearch />
                    <input type="text" placeholder="Search by role, skill, or name..." />
                </div>
                <button className={styles.filterBtn}><FaFilter /> Filters</button>
            </div>

            <div className={styles.grid}>
                {MOCK_CANDIDATES.map((candidate, index) => (
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
                ))}
            </div>
        </div>
    );
};

export default AgencyDashboard;
