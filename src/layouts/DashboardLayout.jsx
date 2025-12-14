import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { FaHome, FaBriefcase, FaRobot, FaUserCircle, FaBell, FaSearch, FaUniversity, FaBuilding, FaUsers, FaEyeSlash, FaEye } from 'react-icons/fa';
import styles from './DashboardLayout.module.css';

const DashboardLayout = () => {
    const location = useLocation();
    const [stealthMode, setStealthMode] = useState(false);

    const isActive = (path) => location.pathname === path;

    return (
        <div className={styles.layout}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <div className={styles.logo}>CareerAI</div>

                <nav className={styles.nav}>
                    <div className={styles.menuLabel}>Candidate</div>
                    <Link to="/dashboard" className={`${styles.navItem} ${isActive('/dashboard') ? styles.active : ''}`}>
                        <FaHome /> <span>Feed</span>
                    </Link>
                    <Link to="/dashboard/network" className={`${styles.navItem} ${isActive('/dashboard/network') ? styles.active : ''}`}>
                        <FaUsers /> <span>Network</span>
                    </Link>

                    <Link to="/dashboard/interview" className={styles.navItem}>
                        <FaRobot /> <span>Interview Sim</span>
                    </Link>

                    <div className={styles.menuLabel} style={{ marginTop: '2rem' }}>Partners</div>
                    <Link to="/dashboard/agencies" className={styles.navItem}>
                        <FaBuilding /> <span>Agencies</span>
                    </Link>
                    <Link to="/dashboard/universities" className={styles.navItem}>
                        <FaUniversity /> <span>Universities</span>
                    </Link>

                    {/* Stealth Mode Toggle */}
                    <div className={styles.menuLabel} style={{ marginTop: '2rem' }}>Privacy</div>
                    <div
                        className={styles.navItem}
                        onClick={() => setStealthMode(!stealthMode)}
                        style={{ cursor: 'pointer', background: stealthMode ? 'rgba(139, 92, 246, 0.2)' : 'transparent', border: stealthMode ? '1px solid #8b5cf6' : 'none' }}
                    >
                        {stealthMode ? <FaEyeSlash /> : <FaEye />}
                        <span>Stealth Mode</span>
                        {stealthMode && <span style={{ marginLeft: 'auto', fontSize: '0.7rem', background: '#8b5cf6', padding: '0.2rem 0.5rem', borderRadius: '0.3rem' }}>ON</span>}
                    </div>
                </nav>

                <div className={styles.userProfile}>
                    <div className={styles.avatar}>AT</div>
                    <div className={styles.userInfo}>
                        <div className={styles.userName}>Ayesha Tariq</div>
                        <div className={styles.userRole}>Job Seeker</div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className={styles.mainWrapper}>
                <header className={styles.topbar}>
                    <div className={styles.searchBar}>
                        <FaSearch />
                        <input type="text" placeholder="Search jobs, skills, companies..." />
                    </div>
                    <div className={styles.actions}>
                        <button className={styles.iconBtn}><FaBell /></button>
                        <button className={styles.iconBtn}><FaUserCircle /></button>
                    </div>
                </header>

                <main className={styles.content}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
