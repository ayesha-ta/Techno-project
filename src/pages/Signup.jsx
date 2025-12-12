import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';
import authBg from '../assets/auth_bg.png';

const Signup = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('job-seeker');

    const handleSignup = (e) => {
        e.preventDefault();
        navigate('/dashboard');
    };

    return (
        <div className={styles.pageContainer}>
            {/* Form Side */}
            <div className={styles.formSide}>
                <div className={styles.logo}>Career AI Agent</div>

                <motion.div
                    className={styles.welcomeText}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2>Create Account</h2>
                    <p>Join the future of recruitment and get hired faster.</p>
                </motion.div>

                <div className={styles.toggleContainer}>
                    <button
                        className={`${styles.toggleBtn} ${role === 'job-seeker' ? styles.active : ''}`}
                        onClick={() => setRole('job-seeker')}
                    >
                        Job Seeker
                    </button>
                    <button
                        className={`${styles.toggleBtn} ${role === 'partner' ? styles.active : ''}`}
                        onClick={() => setRole('partner')}
                    >
                        Recruiter / Uni
                    </button>
                </div>

                <motion.form
                    className={styles.form}
                    onSubmit={handleSignup}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className={styles.inputGroup}>
                        <label>Full Name</label>
                        <input type="text" placeholder="John Doe" required />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Email Address</label>
                        <input type="email" placeholder="name@company.com" required />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Password</label>
                        <input type="password" placeholder="••••••••" required />
                    </div>
                    <button type="submit" className={styles.submitBtn}>
                        Create {role === 'job-seeker' ? 'Candidate' : 'Partner'} Account
                    </button>
                </motion.form>

                <div className={styles.footer}>
                    Already have an account? <Link to="/login">Sign In</Link>
                </div>
            </div>

            {/* Image Side */}
            <div
                className={styles.imageSide}
                style={{ backgroundImage: `url(${authBg})` }}
            >
                <div className={styles.imageOverlay}></div>
                <motion.div
                    className={styles.imageContent}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <h2>Connect with Top Employers and Universities</h2>
                    <p>Our AI matches your profile with the best opportunities available globally.</p>
                </motion.div>
            </div>
        </div>
    );
};

export default Signup;
