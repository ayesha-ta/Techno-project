import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaTimes, FaRocket, FaCrown, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
    const navigate = useNavigate();
    const [billingCycle, setBillingCycle] = useState('monthly');

    const plans = [
        {
            name: "Basic",
            price: "$0",
            period: "forever",
            icon: <FaUser />,
            features: [
                "Smart Job Matching",
                "Basic Profile Builder",
                "1 Interview Simulation / mo",
                "Limited Application Tracking"
            ],
            notIncluded: [
                "Auto-Apply Automation",
                "Real-time Interview Coach",
                "Advanced Analytics",
                "1-on-1 Mentorship"
            ],
            color: "#64748b",
            btnText: "Get Started Free"
        },
        {
            name: "Pro",
            price: "$10",
            period: "/ month",
            icon: <FaRocket />,
            popular: true,
            features: [
                "Everything in Basic",
                "Unlimited Auto-Apply",
                "Unlimited Interview Simulations",
                "AI Resume Tailoring",
                "Real-time Interview Feedback"
            ],
            notIncluded: [
                "1-on-1 Mentorship",
                "Priority Support"
            ],
            color: "#3b82f6",
            btnText: "Go Pro"
        },
        {
            name: "Elite",
            price: "$22",
            period: "/ month",
            icon: <FaCrown />,
            features: [
                "Everything in Pro",
                "Advanced Usage Analytics",
                "1-on-1 AI Mentoring Sessions",
                "Priority Support",
                "mock Interview Certification"
            ],
            notIncluded: [],
            color: "#8b5cf6",
            btnText: "Get Elite"
        }
    ];

    return (
        <div style={{
            minHeight: '100vh',
            background: '#0f172a',
            color: 'white',
            padding: '4rem 2rem',
            fontFamily: 'Inter, sans-serif'
        }}>
            <button
                onClick={() => navigate('/')}
                style={{
                    position: 'absolute',
                    top: '2rem',
                    left: '2rem',
                    background: 'transparent',
                    border: '1px solid #334155',
                    color: '#94a3b8',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    cursor: 'pointer'
                }}
            >
                ← Back
            </button>

            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem', background: 'linear-gradient(to right, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                >
                    Choose Your Success Path
                </motion.h1>
                <p style={{ color: '#94a3b8', fontSize: '1.2rem' }}>Invest in your career with our AI-powered plans.</p>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1rem',
                    marginTop: '2rem',
                    alignItems: 'center'
                }}>
                    <span style={{ color: billingCycle === 'monthly' ? 'white' : '#64748b' }}>Monthly</span>
                    <div
                        onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                        style={{
                            width: '3.5rem',
                            height: '2rem',
                            background: '#334155',
                            borderRadius: '2rem',
                            padding: '0.2rem',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: billingCycle === 'monthly' ? 'flex-start' : 'flex-end',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <motion.div
                            layout
                            style={{
                                width: '1.6rem',
                                height: '1.6rem',
                                background: 'white',
                                borderRadius: '50%'
                            }}
                        />
                    </div>
                    <span style={{ color: billingCycle === 'yearly' ? 'white' : '#64748b' }}>Yearly <span style={{ fontSize: '0.8rem', color: '#10b981' }}>(Save 20%)</span></span>
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {plans.map((plan, i) => (
                    <motion.div
                        key={plan.name}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -10 }}
                        style={{
                            background: '#1e293b',
                            borderRadius: '1.5rem',
                            padding: '2.5rem',
                            position: 'relative',
                            border: plan.popular ? `2px solid ${plan.color}` : '1px solid #334155',
                            boxShadow: plan.popular ? `0 0 20px ${plan.color}40` : 'none'
                        }}
                    >
                        {plan.popular && (
                            <div style={{
                                position: 'absolute',
                                top: '-12px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                background: plan.color,
                                color: 'white',
                                padding: '0.25rem 1rem',
                                borderRadius: '1rem',
                                fontSize: '0.875rem',
                                fontWeight: 'bold'
                            }}>
                                Most Popular
                            </div>
                        )}

                        <div style={{
                            width: '3rem',
                            height: '3rem',
                            borderRadius: '0.75rem',
                            background: `${plan.color}20`,
                            color: plan.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem',
                            marginBottom: '1.5rem'
                        }}>
                            {plan.icon}
                        </div>

                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{plan.name}</h3>
                        <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '2rem' }}>
                            <span style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{plan.price}</span>
                            <span style={{ color: '#94a3b8', marginLeft: '0.5rem' }}>{plan.period}</span>
                        </div>

                        <button style={{
                            width: '100%',
                            padding: '1rem',
                            borderRadius: '0.75rem',
                            background: plan.popular ? plan.color : '#334155',
                            color: 'white',
                            border: 'none',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            marginBottom: '2rem',
                            transition: 'all 0.2s'
                        }}>
                            {plan.btnText}
                        </button>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {plan.features.map((feat, idx) => (
                                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#e2e8f0' }}>
                                    <FaCheck style={{ color: '#10b981', flexShrink: 0 }} />
                                    <span>{feat}</span>
                                </div>
                            ))}
                            {plan.notIncluded.map((feat, idx) => (
                                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#64748b' }}>
                                    <FaTimes style={{ color: '#64748b', flexShrink: 0 }} />
                                    <span>{feat}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Pricing;
