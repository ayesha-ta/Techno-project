import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaSpinner, FaFileAlt, FaPaperPlane, FaCloudUploadAlt } from 'react-icons/fa';
import styles from './AutoApplyModal.module.css';
import { db, auth } from '../firebase';
import { ref, push, set } from 'firebase/database';

const AutoApplyModal = ({ job, onClose }) => {
    const [step, setStep] = useState('upload'); // Start with upload
    const [progress, setProgress] = useState(0);

    const handleUpload = () => {
        setStep('analyzing');
        runAutomation();
    };

    const runAutomation = () => {
        // Progress bar simulation
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 95) {
                    clearInterval(interval);
                    return 95;
                }
                return prev + 1;
            });
        }, 50);

        // Step transitions
        setTimeout(() => setStep('tailoring'), 2000);
        setTimeout(() => setStep('submitting'), 4500);
        setTimeout(async () => {
            clearInterval(interval);
            setProgress(100);
            setStep('done');

            // Save to Database
            if (auth.currentUser) {
                try {
                    const newAppRef = push(ref(db, 'applications/' + auth.currentUser.uid));
                    await set(newAppRef, {
                        jobId: job.id || Date.now(),
                        jobTitle: job.title,
                        company: job.company,
                        status: "Applied",
                        appliedAt: new Date().toISOString(),
                        matchScore: 92
                    });
                } catch (e) {
                    console.error("Error saving application", e);
                }
            }
        }, 6000);
    };

    return (
        <div className={styles.overlay}>
            <motion.div
                className={styles.modal}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <div className={styles.header}>
                    <h3>AI Auto-Apply Agent</h3>
                    <button onClick={onClose} className={styles.closeBtn}>&times;</button>
                </div>

                <div className={styles.jobPreview}>
                    <h4>{job.title}</h4>
                    <p>{job.company}</p>
                </div>

                {step === 'upload' ? (
                    <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                        <div style={{
                            border: '2px dashed #444',
                            borderRadius: '1rem',
                            padding: '3rem 2rem',
                            marginBottom: '2rem',
                            cursor: 'pointer',
                            background: 'rgba(255,255,255,0.02)'
                        }} onClick={handleUpload}>
                            <FaCloudUploadAlt size={40} color="#3b82f6" style={{ marginBottom: '1rem' }} />
                            <p style={{ color: '#ccc', marginBottom: '0.5rem' }}>Click to upload your Resume (PDF)</p>
                            <span style={{ fontSize: '0.8rem', color: '#666' }}>We'll parse your skills to match this job.</span>
                        </div>
                        <button
                            className={styles.trackBtn}
                            style={{ width: '100%', background: '#3b82f6', border: 'none' }}
                            onClick={handleUpload}
                        >
                            Upload & Apply
                        </button>
                    </div>
                ) : (
                    <>
                        <div className={styles.progressArea}>
                            <div className={styles.progressBar}>
                                <motion.div
                                    className={styles.progressFill}
                                    animate={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>

                        <div className={styles.stepsContainer}>
                            <StepItem
                                status={step === 'analyzing' ? 'active' : step === 'tailoring' || step === 'submitting' || step === 'done' ? 'completed' : 'pending'}
                                icon={<FaFileAlt />}
                                text="Parsing Resume & Matching Skills..."
                            />
                            <StepItem
                                status={step === 'tailoring' ? 'active' : step === 'submitting' || step === 'done' ? 'completed' : 'pending'}
                                icon={<FaPaperPlane />}
                                text="AI Tailoring Cover Letter..."
                            />
                            <StepItem
                                status={step === 'submitting' ? 'active' : step === 'done' ? 'completed' : 'pending'}
                                icon={<FaCheckCircle />}
                                text="Submitting Application..."
                            />
                        </div>

                        {step === 'done' && (
                            <motion.div
                                className={styles.successMessage}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <FaCheckCircle className={styles.successIcon} />
                                <p>Application Submitted Successfully!</p>
                                <button onClick={onClose} className={styles.trackBtn}>Track Application</button>
                            </motion.div>
                        )}
                    </>
                )}

            </motion.div>
        </div>
    );
};

const StepItem = ({ status, icon, text }) => (
    <div className={`${styles.stepItem} ${styles[status]}`}>
        <div className={styles.iconWrapper}>
            {status === 'active' ? <FaSpinner className={styles.spinner} /> : icon}
        </div>
        <span>{text}</span>
    </div>
);

export default AutoApplyModal;
