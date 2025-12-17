import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';
import authBg from '../assets/auth_bg.png';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import { db } from '../firebase';
import { useUser } from '../context/UserContext';

const Login = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('job-seeker');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useUser();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Fetch user name from Realtime Database
            const userRef = ref(db, 'users/' + user.uid);
            const snapshot = await get(userRef);

            if (snapshot.exists()) {
                const userData = snapshot.val();
                login(userData); // Store in context
                navigate('/dashboard');
            } else {
                // Fallback if data missing
                login({ name: email.split('@')[0], email: email });
                navigate('/dashboard');
            }
        } catch (err) {
            console.error("Login Error:", err);
            setError("Invalid email or password.");
        } finally {
            setLoading(false);
        }
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

                {error && <div style={{ color: 'red', marginBottom: '1rem', padding: '0.5rem', background: 'rgba(255,0,0,0.1)', borderRadius: '4px' }}>{error}</div>}

                <motion.form
                    className={styles.form}
                    onSubmit={handleLogin}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className={styles.inputGroup}>
                        <label>Email Address</label>
                        <input
                            type="email"
                            placeholder="name@company.com"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                        {loading ? 'Signing In...' : `Sign In as ${role === 'job-seeker' ? 'Candidate' : 'Partner'}`}
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
