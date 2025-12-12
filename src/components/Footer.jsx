import React from 'react';
import { FaLinkedin, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.column}>
                    <h3>Career AI Agent</h3>
                    <p style={{ color: '#888' }}>Apply Smart. Prepare Smarter.</p>
                </div>
                <div className={styles.column}>
                    <h4>Product</h4>
                    <a href="#features">Features</a>
                    <a href="#pricing">Pricing</a>
                    <a href="#">Download</a>
                </div>
                <div className={styles.column}>
                    <h4>Company</h4>
                    <a href="#">About Us</a>
                    <a href="#">Privacy Policy</a>
                </div>
                <div className={styles.column}>
                    <h4>Connect</h4>
                    <div className={styles.socials}>
                        <FaLinkedin /> <FaTwitter /> <FaInstagram /> <FaGithub />
                    </div>
                </div>
            </div>
            <div className={styles.copyright}>
                © 2025 Career AI Agent. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
