import React, { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';
import { motion } from 'framer-motion';
import { FaUserPlus, FaRobot, FaSearch, FaUserCheck, FaStar } from 'react-icons/fa';
import styles from './Dashboard.module.css';

const NetworkCard = ({ person, index, onConnect }) => {
    // Determine card styling based on connection status
    const isConnected = person.isConnected;

    return (
        <motion.div
            className={styles.jobCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{
                display: 'flex', flexDirection: 'column', height: '100%',
                border: isConnected ? '1px solid #10b981' : '1px solid rgba(59, 130, 246, 0.2)',
                position: 'relative'
            }}
        >
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <img
                    src={person.picture.large}
                    alt={person.name.first}
                    style={{
                        width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover'
                    }}
                />
                <div>
                    <h4 style={{ margin: '0 0 0.2rem 0', fontSize: '1.1rem' }}>
                        {person.name.first} {person.name.last}
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#94a3b8' }}>
                        {person.location.city}, {person.location.country}
                    </p>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
                        {person.email}
                    </p>
                </div>
            </div>

            {/* Simulated AI Match Logic */}
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.8rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#10b981', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    <FaRobot /> AI Match: {Math.floor(Math.random() * (99 - 75) + 75)}%
                </div>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#e2e8f0', lineHeight: '1.4' }}>
                    "Based on their location and profile, this person could be a valuable connection for your network."
                </p>
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem' }}>
                <button
                    className={isConnected ? styles.secondaryBtn : styles.applyBtn}
                    onClick={() => onConnect(person.login.uuid)}
                    style={{
                        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                        background: isConnected ? 'transparent' : ''
                    }}
                >
                    {isConnected ? <><FaUserCheck /> Connected</> : <><FaUserPlus /> Connect</>}
                </button>
                <button className={styles.secondaryBtn} style={{ padding: '0.5rem' }}>
                    Profile
                </button>
            </div>
        </motion.div>
    );
};

const Network = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, connected

    // Debounce search to prevent API spam
    const debouncedSearch = useDebounce(searchQuery, 800);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                // If search is empty, use a default seed 'careerai'
                // If searching, use the search term as seed to get deterministic "search results"
                const seed = debouncedSearch ? debouncedSearch.replace(/\s/g, '') : 'careerai';

                // Fetch random users to simulate a professional network
                // Using seed makes it feel like consistent search results
                const response = await fetch(`https://randomuser.me/api/?results=12&nat=us,gb,ca&seed=${seed}`);
                const data = await response.json();

                const enhancedData = data.results.map(user => ({
                    ...user,
                    isConnected: false // Add local state
                }));

                setUsers(enhancedData);
                setFilteredUsers(enhancedData);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch users", error);
                setLoading(false);
            }
        };

        fetchUsers();
    }, [debouncedSearch]);

    // Handle Local Filtering (only connection status, not search text anymore)
    useEffect(() => {
        let result = users;

        if (filter === 'connected') {
            result = result.filter(user => user.isConnected);
        }

        setFilteredUsers(result);
    }, [users, filter]);

    const handleConnect = (uuid) => {
        setUsers(prevUsers => prevUsers.map(user => {
            if (user.login.uuid === uuid) {
                return { ...user, isConnected: !user.isConnected };
            }
            return user;
        }));
    };

    return (
        <div className={styles.dashboard}>
            <motion.div
                className={styles.welcomeBanner}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)' }}
            >
                <div className={styles.welcomeText}>
                    <h3>Expand Your Smart Network 🌐</h3>
                    <p>AI-curated connections to accelerate your career growth.</p>
                </div>
            </motion.div>

            {/* Search and Filter Bar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ position: 'relative' }}>
                    <FaSearch style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input
                        type="text"
                        placeholder="Search people by name, city..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '1rem 1rem 1rem 3rem',
                            borderRadius: '1rem',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: 'white',
                            fontSize: '1rem'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        onClick={() => setFilter('all')}
                        style={{
                            padding: '0.6rem 1.2rem', borderRadius: '2rem', border: 'none', cursor: 'pointer', fontWeight: 'bold',
                            background: filter === 'all' ? '#3b82f6' : 'rgba(255,255,255,0.1)',
                            color: filter === 'all' ? 'white' : '#94a3b8'
                        }}
                    >
                        All Recommendations
                    </button>
                    <button
                        onClick={() => setFilter('connected')}
                        style={{
                            padding: '0.6rem 1.2rem', borderRadius: '2rem', border: 'none', cursor: 'pointer', fontWeight: 'bold',
                            background: filter === 'connected' ? '#10b981' : 'rgba(255,255,255,0.1)',
                            color: filter === 'connected' ? 'white' : '#94a3b8'
                        }}
                    >
                        My Connections ({users.filter(u => u.isConnected).length})
                    </button>
                </div>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', color: '#94a3b8', marginTop: '3rem' }}>
                    Loading potential matches...
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((person, index) => (
                            <NetworkCard
                                key={person.login.uuid}
                                person={person}
                                index={index}
                                onConnect={handleConnect}
                            />
                        ))
                    ) : (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#64748b', padding: '3rem' }}>
                            No users found matching "{searchQuery}"
                        </div>
                    )}
                </div>
            )}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{ marginTop: '3rem', padding: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '1rem', textAlign: 'center' }}
            >
                <h4 style={{ marginBottom: '1rem' }}><FaStar color="#fbbf24" /> Grow Your Influence</h4>
                <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>Post your recent "AI Verified" interview score to get 5x more connection requests.</p>
                <button className={styles.primaryBtn}>Create Post</button>
            </motion.div>
        </div>
    );
};

export default Network;
