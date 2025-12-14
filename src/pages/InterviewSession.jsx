import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMicrophone, FaPaperPlane, FaStop, FaVideo, FaVideoSlash, FaHeadphones, FaUser } from 'react-icons/fa';
import styles from './InterviewSession.module.css';

const InterviewSession = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [cameraOn, setCameraOn] = useState(true);
    const messagesEndRef = useRef(null);
    const videoRef = useRef(null);
    const initialized = useRef(false);

    // New State for Media Mode
    const [mediaMode, setMediaMode] = useState('video'); // 'video' | 'audio'

    // Speech Recognition Setup
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = useRef(SpeechRecognition ? new SpeechRecognition() : null);

    // Mock Questions Bank
    const questions = {
        hr: ["Tell me about yourself.", "What is your greatest weakness?", "Why do you want to work here?"],
        tech: ["Explain the Virtual DOM in React.", "What is the difference between var, let, and const?", "How do you optimize a React app?"],
        founder: ["What is your vision for this product?", "How do you handle uncertainty?", "Pitch me your last project."],
        negotiation: ["We're offering $95,000 for this role. What are your thoughts?", "What salary range are you expecting?", "Can you justify why you deserve a higher salary?"]
    };

    const currentQuestions = questions[state?.mode] || questions.hr;

    const [isPaused, setIsPaused] = useState(false);

    const [hasJoined, setHasJoined] = useState(false);
    const [cameraPermission, setCameraPermission] = useState(false);

    const handleJoinSession = () => {
        setHasJoined(true);
    };

    // Trigger Camera & AI when joined
    useEffect(() => {
        if (!hasJoined) return;

        console.log(`Joined session in ${mediaMode} mode, initializing...`);

        const startSession = () => {
            const role = state?.jobTitle || state?.mode || 'General';
            const greeting = `Hello! I'm your AI Interviewer for this ${role} position. Let's start. ${currentQuestions[0]}`;
            addMessage('ai', greeting);
            speak(greeting);
        };

        // Access Media based on Mode
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            const constraints = {
                video: mediaMode === 'video',
                audio: true
            };

            navigator.mediaDevices.getUserMedia(constraints)
                .then(stream => {
                    console.log("Media access granted");
                    if (videoRef.current && mediaMode === 'video') {
                        videoRef.current.srcObject = stream;
                    }
                    setCameraPermission(true);

                    // Start AI after a moment
                    setTimeout(startSession, 1500);
                })
                .catch(err => {
                    console.error("Media access denied:", err);
                    alert("Could not access microphone/camera. Please check permissions.");
                });
        } else {
            console.log("Media devices not supported");
            setTimeout(startSession, 1000);
        }
    }, [hasJoined, mediaMode]);

    // Keep scroll effect active
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const speak = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 1.0;
            utterance.pitch = 1.0;
            // Try to find a good voice
            const voices = window.speechSynthesis.getVoices();
            const preferredVoice = voices.find(voice => voice.name.includes('Google US English')) || voices[0];
            if (preferredVoice) utterance.voice = preferredVoice;

            window.speechSynthesis.speak(utterance);
        }
    };

    const togglePause = () => {
        if (mediaMode === 'audio') return; // No video pause in audio mode

        if (isPaused) {
            videoRef.current.play();
            setIsPaused(false);
            setCameraOn(true);
        } else {
            videoRef.current.pause();
            setIsPaused(true);
            setCameraOn(false);
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const addMessage = (sender, text) => {
        setMessages(prev => [...prev, { sender, text }]);
    };

    const handleSend = () => {
        if (!input.trim()) return;
        addMessage('user', input);
        setInput('');

        // Simulate AI Response/Feedback
        setTimeout(() => {
            const nextQ = currentQuestions[Math.floor(Math.random() * currentQuestions.length)];
            const aiResponse = `That's a solid answer. Next question: ${nextQ}`;
            addMessage('ai', aiResponse);
            speak(aiResponse);
        }, 2000);
    };

    const toggleRecording = () => {
        if (!recognition.current) {
            alert("Speech recognition not supported in this browser.");
            return;
        }

        if (isRecording) {
            recognition.current.stop();
            setIsRecording(false);
        } else {
            recognition.current.start();
            setIsRecording(true);

            recognition.current.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setInput(transcript);
            };

            recognition.current.onend = () => {
                setIsRecording(false);
            };
        }
    };

    const endInterview = () => {
        // Simulate AI Analysis calculation
        const mockAnalysis = {
            scores: {
                confidence: Math.floor(Math.random() * (98 - 70) + 70),
                clarity: Math.floor(Math.random() * (95 - 75) + 75),
                technical: Math.floor(Math.random() * (100 - 60) + 60),
            },
            strengths: [
                "Maintained good eye contact throughout the session.",
                "Used clear and concise professional language.",
                "Demonstrated strong problem-solving approach."
            ],
            improvements: [
                "Could provide more specific examples for behavioral questions.",
                "Pause slightly more often to allow for natural conversation flow.",
                "Elaborate more on the technical implementation details."
            ]
        };
        navigate('/dashboard/interview/feedback', { state: mockAnalysis });
    };

    if (!hasJoined) {
        return (
            <div className={styles.lobbyContainer}>
                <motion.div
                    className={styles.lobbyCard}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                >
                    <h2>Ready for your Interview?</h2>
                    <p>You are about to start a <strong>{state?.mode || 'General'}</strong> interview.</p>
                    <p className={styles.lobbyNote}>Choose your preferred mode:</p>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
                        <button
                            onClick={() => setMediaMode('video')}
                            style={{
                                padding: '1rem 2rem',
                                borderRadius: '1rem',
                                border: mediaMode === 'video' ? '2px solid #3b82f6' : '1px solid #333',
                                background: mediaMode === 'video' ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                                color: 'white',
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <FaVideo size={24} />
                            <span>Video Interview</span>
                        </button>
                        <button
                            onClick={() => setMediaMode('audio')}
                            style={{
                                padding: '1rem 2rem',
                                borderRadius: '1rem',
                                border: mediaMode === 'audio' ? '2px solid #10b981' : '1px solid #333',
                                background: mediaMode === 'audio' ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                                color: 'white',
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <FaHeadphones size={24} />
                            <span>Audio Only</span>
                        </button>
                    </div>

                    <p className={styles.lobbyNote} style={{ fontSize: '0.8rem', color: '#888' }}>
                        {mediaMode === 'video'
                            ? "Ensure you are in a quiet environment and your camera is ready."
                            : "Ensure your microphone is working clearly."}
                    </p>

                    <button className={styles.joinBtn} onClick={handleJoinSession}>
                        {mediaMode === 'video' ? <><FaVideo /> Enable Camera & Start</> : <><FaMicrophone /> Enable Mic & Start</>}
                    </button>
                    <button className={styles.backBtn} onClick={() => navigate('/dashboard/interview')}>
                        Cancel
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.mainArea}>
                {/* Video Area */}
                <div className={styles.videoGrid}>
                    <div className={styles.aiVideo}>
                        <div className={styles.aiAvatarWrapper}>
                            <div className={styles.aiPulse}></div>
                            <span className={styles.aiLabel}>AI Interviewer</span>
                        </div>
                    </div>
                    <div className={styles.userVideo}>
                        {mediaMode === 'video' ? (
                            <>
                                <video ref={videoRef} autoPlay muted className={styles.videoElement} />
                                <div className={styles.cameraControls}>
                                    <button onClick={togglePause} title={isPaused ? "Resume Video" : "Pause Video"}>
                                        {isPaused ? <FaVideoSlash /> : <FaVideo />}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: '#1e293b',
                                color: '#94a3b8',
                                flexDirection: 'column',
                                gap: '1rem'
                            }}>
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    background: '#334155',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <FaUser size={32} />
                                </div>
                                <p>Audio Mode Active</p>
                                <div className={styles.audioWave}>
                                    {/* Simulated audio visualizer could go here */}
                                    <div className={styles.bar}></div>
                                    <div className={styles.bar}></div>
                                    <div className={styles.bar}></div>
                                </div>
                            </div>
                        )}
                        <span className={styles.userLabel}>You {mediaMode === 'audio' && '(Audio)'}</span>
                    </div>
                </div>

                <div className={styles.chatWindow}>
                    {messages.map((msg, i) => (
                        <motion.div
                            key={i}
                            className={`${styles.message} ${styles[msg.sender]}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className={styles.avatar}>{msg.sender === 'ai' ? 'AI' : 'ME'}</div>
                            <div className={styles.bubble}>{msg.text}</div>
                        </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <div className={styles.inputArea}>
                    <button
                        className={`${styles.micBtn} ${isRecording ? styles.recording : ''}`}
                        onClick={toggleRecording}
                    >
                        {isRecording ? <FaStop /> : <FaMicrophone />}
                    </button>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your answer..."
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button className={styles.sendBtn} onClick={handleSend}><FaPaperPlane /></button>
                </div>
            </div>

            <div className={styles.sidebar}>
                <h3>Real-time Coach 🤖</h3>
                <div className={styles.feedbackCard}>
                    <h4>Tone Analysis</h4>
                    <div className={styles.meter}><div style={{ width: '85%', background: '#10b981' }}></div></div>
                    <p>You sound confident! Keep it up.</p>
                </div>
                <div className={styles.feedbackCard}>
                    <h4>Clarification</h4>
                    <p>Try to use the "STAR" method (Situation, Task, Action, Result) for this answer.</p>
                </div>

                <button className={styles.endBtn} onClick={endInterview}>End Interview</button>
            </div>
        </div>
    );
};

export default InterviewSession;

