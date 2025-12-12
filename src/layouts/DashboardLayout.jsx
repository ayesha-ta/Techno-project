import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { FaHome, FaBriefcase, FaRobot, FaUserCircle, FaBell, FaSearch, FaUniversity, FaBuilding } from 'react-icons/fa';
import styles from './DashboardLayout.module.css';

const DashboardLayout = () => {
    const location = useLocation();

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
                    <Link to="/dashboard/jobs" className={styles.navItem}>
                        <FaBriefcase /> <span>Jobs</span>
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
