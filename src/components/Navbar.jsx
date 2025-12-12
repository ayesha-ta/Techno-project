import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.logo}>Career AI Agent</div>

      <div className={styles.navLinks}>
        <a href="#hero">Home</a>
        <a href="#features">Features</a>
        <a href="#solution">Solution</a>
        <a href="#pricing">Pricing</a>
        <a href="#contact">For Business</a>
      </div>

      <div className={styles.authGroup} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <a href="/login" style={{ color: 'white', textDecoration: 'none', fontWeight: 600 }}>Log In</a>
        <a href="/signup" className={styles.ctaButton}>Get Started</a>
      </div>

      <div className={styles.mobileMenuBtn} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.mobileMenu}
        >
          <a href="#hero" onClick={() => setIsOpen(false)}>Home</a>
          <a href="#features" onClick={() => setIsOpen(false)}>Features</a>
          <a href="#workflow" onClick={() => setIsOpen(false)}>How it Works</a>
          <a href="#pricing" onClick={() => setIsOpen(false)}>Pricing</a>
          <button className={styles.ctaButton} onClick={() => setIsOpen(false)}>Get Started</button>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
