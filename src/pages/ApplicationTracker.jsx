import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { db, auth } from '../firebase';
import { ref, onValue } from 'firebase/database';
import styles from './ApplicationTracker.module.css';

const ApplicationTracker = () => {
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!auth.currentUser) {
            setLoading(false);
            return;
        }

        const appsRef = ref(db, 'applications/' + auth.currentUser.uid);

        const unsubscribe = onValue(appsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Convert Object to Array
                const appsList = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                setApps(appsList);
            } else {
                setApps([]);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className={styles.container}>
            <h2>Application Tracker</h2>
            <p className={styles.subtitle}>Track your AI-automated applications in real-time.</p>

            {loading ? (
                <div style={{ color: 'white' }}>Loading applications...</div>
            ) : apps.length === 0 ? (
                <div className={styles.emptyState}>
                    <p>No applications yet. Go to your Feed and 'Easy Apply'!</p>
                </div>
            ) : (
                <div className={styles.grid}>
                    {apps.map((app, index) => (
                        <motion.div
                            key={app.id}
                            className={styles.card}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className={styles.cardHeader}>
                                <h3>{app.jobTitle}</h3>
                                <span className={styles.company}>{app.company}</span>
                            </div>

                            <div className={styles.statusBadge}>{app.status}</div>

                            <div className={styles.meta}>
                                <span>Applied: {new Date(app.appliedAt).toLocaleDateString()}</span>
                                <span>Match: <span style={{ color: '#10b981' }}>{app.matchScore}%</span></span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ApplicationTracker;
