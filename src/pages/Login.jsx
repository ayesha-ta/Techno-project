import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';
// Note: You must ensure this image path is correct after generation or move the file.
// Assuming the generated image will be saved/moved to src/assets/auth_bg.png
import authBg from '../assets/auth_bg.png';

const Login = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('job-seeker');

    const handleLogin = (e) => {
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
                    <h2>Welcome Back</h2>
                    <p>Sign in to access your personalized career dashboard.</p>
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
                    onSubmit={handleLogin}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className={styles.inputGroup}>
                        <label>Email Address</label>
                        <input type="email" placeholder="name@company.com" required />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Password</label>
                        <input type="password" placeholder="••••••••" required />
                    </div>
                    <button type="submit" className={styles.submitBtn}>
                        Sign In as {role === 'job-seeker' ? 'Candidate' : 'Partner'}
                    </button>
                </motion.form>

                <div className={styles.footer}>
                    Don't have an account? <Link to="/signup">Sign Up</Link>
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
                    <h2>Unlock Your Potential with AI-Powered Intelligence</h2>
                    <p>Join thousands of professionals getting hired 3x faster with our automated agent.</p>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
