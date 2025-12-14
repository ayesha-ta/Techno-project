import React from 'react';
import { motion } from 'framer-motion';
import { FaUniversity, FaUserGraduate, FaChartLine, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import styles from './Dashboard.module.css'; // Reusing dashboard styles

const Universities = () => {
    // Mock Data for University Dashboard
    const stats = [
        { title: "Active Students", value: "1,240", icon: <FaUserGraduate />, color: "#3b82f6" },
        { title: "Interviews Conducted", value: "856", icon: <FaChartLine />, color: "#10b981" },
        { title: "Placement Rate", value: "78%", icon: <FaCheckCircle />, color: "#f59e0b" },
    ];

    const students = [
        { id: 1, name: "Ali Khan", dept: "Computer Science", status: "Ready", score: "92%" },
        { id: 2, name: "Zara Ahmed", dept: "Business Admin", status: "Needs Practice", score: "65%" },
        { id: 3, name: "Bilal T.", dept: "Electrical Eng.", status: "Ready", score: "88%" },
        { id: 4, name: "Fatima S.", dept: "Data Science", status: "Interviewing", score: "Active" },
    ];

    return (
        <div style={{ padding: '2rem' }}>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
                <div>
                    <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>University Partner Portal</h2>
                    <p style={{ color: '#888' }}>Monitor student progress and AI interview analytics.</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(16, 185, 129, 0.1)', padding: '0.5rem 1rem', borderRadius: '2rem', border: '1px solid #10b981' }}>
                    <FaUniversity color="#10b981" />
                    <span style={{ color: '#10b981', fontWeight: 'bold' }}>Premium Partner</span>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={styles.widget}
                        style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}
                    >
                        <div style={{
                            width: '60px', height: '60px', borderRadius: '50%',
                            background: `${stat.color}20`, color: stat.color,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem'
                        }}>
                            {stat.icon}
                        </div>
                        <div>
                            <h3 style={{ fontSize: '2rem', margin: 0 }}>{stat.value}</h3>
                            <p style={{ color: '#888', margin: 0 }}>{stat.title}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Student List */}
            <div className={styles.widget}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <h4>Recent Student Activity</h4>
                    <button className={styles.linkBtn} style={{ width: 'auto', marginTop: 0, padding: '0.5rem 1rem' }}>View All</button>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', color: '#ddd' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #333', textAlign: 'left' }}>
                            <th style={{ padding: '1rem' }}>Student Name</th>
                            <th style={{ padding: '1rem' }}>Department</th>
                            <th style={{ padding: '1rem' }}>AI Status</th>
                            <th style={{ padding: '1rem' }}>Avg. Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, i) => (
                            <tr key={student.id} style={{ borderBottom: '1px solid #222' }}>
                                <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                    <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>
                                        {student.name.charAt(0)}
                                    </div>
                                    {student.name}
                                </td>
                                <td style={{ padding: '1rem', color: '#888' }}>{student.dept}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        padding: '0.3rem 0.8rem', borderRadius: '1rem', fontSize: '0.8rem',
                                        background: student.status === 'Ready' ? 'rgba(16, 185, 129, 0.1)' : student.status === 'Needs Practice' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                                        color: student.status === 'Ready' ? '#10b981' : student.status === 'Needs Practice' ? '#ef4444' : '#3b82f6',
                                        border: `1px solid ${student.status === 'Ready' ? '#10b981' : student.status === 'Needs Practice' ? '#ef4444' : '#3b82f6'}40`
                                    }}>
                                        {student.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem', fontWeight: 'bold' }}>{student.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Universities;
