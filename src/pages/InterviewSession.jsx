import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMicrophone, FaPaperPlane, FaStop, FaVideo, FaVideoSlash, FaHeadphones, FaUser, FaRobot } from 'react-icons/fa';
import { GoogleGenerativeAI } from "@google/generative-ai";
import styles from './InterviewSession.module.css';

const InterviewSession = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const messagesEndRef = useRef(null);
    const videoRef = useRef(null);

    // AI State
    const [chatSession, setChatSession] = useState(null);
    const [isStreaming, setIsStreaming] = useState(false);
    const [feedbackData, setFeedbackData] = useState(null);

    // New State for Media Mode
    const [mediaMode, setMediaMode] = useState('video'); // 'video' | 'audio'

    // Speech Recognition Setup
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = useRef(SpeechRecognition ? new SpeechRecognition() : null);

    const [isPaused, setIsPaused] = useState(false);
    const [hasJoined, setHasJoined] = useState(false);
    const [cameraPermission, setCameraPermission] = useState(false);

    // Initialize Gemini AI
    const initializeAI = async () => {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) {
            alert("API Key is missing! Please add VITE_GEMINI_API_KEY to your .env file.");
            return;
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: `You are an expert technical interviewer.
            Context:
            - Role: ${state?.mode || 'General'}
            - Difficulty: ${state?.difficulty || 'Medium'}
            - Candidate Resume/Context: "${state?.resumeText || 'No resume provided.'}"

            Your Goal:
            1. Conduct a realistic, multi-turn interview.
            2. Start by greeting the user and acknowledging their resume (if present).
            3. Ask ONE clear question at a time.
            4. Wait for the user's answer.
            5. Provide brief, constructive feedback on their answer.
            6. Then ask the NEXT relevant question.
            7. Keep spoken responses concise (max 3-4 sentences).
            8. Occasionally (every turn) output a JSON block at the END of your text for UI stats:
               { "confidence": 85, "clarity": 90, "feedback": "Good point on scalability." }
            `,
            safetySettings: [
                { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
                { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
                { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
                { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
            ]
        });

        const chat = model.startChat({
            history: [],
            generationConfig: {
                maxOutputTokens: 500,
            },
        });
        setChatSession(chat);
        return chat;
    };

    const handleJoinSession = () => {
        setHasJoined(true);
    };

    // Trigger Camera & AI when joined
    useEffect(() => {
        if (!hasJoined) return;

        const startSession = async () => {
            // Initial AI Setup
            const chat = await initializeAI();

            if (chat) {
                try {
                    // Start conversation with streaming
                    await streamMessage(chat, "Start the interview.");
                } catch (error) {
                    console.error("Error starting AI:", error);
                    addMessage('ai', "Hello! I'm ready to interview you. Could not connect to Gemini AI.");
                }
            }
        };

        // Access Media based on Mode
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            const constraints = {
                video: mediaMode === 'video',
                audio: true
            };

            navigator.mediaDevices.getUserMedia(constraints)
                .then(stream => {
                    if (videoRef.current && mediaMode === 'video') {
                        videoRef.current.srcObject = stream;
                    }
                    setCameraPermission(true);
                    setTimeout(startSession, 1500);
                })
                .catch(err => {
                    console.error("Media access denied:", err);
                    alert("Could not access microphone/camera. Please check permissions.");
                    // Still try to start AI for text mode
                    setTimeout(startSession, 1000);
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
            window.speechSynthesis.cancel();
            const spokenText = text.replace(/[*#]/g, '');
            const utterance = new SpeechSynthesisUtterance(spokenText);
            utterance.rate = 1.0;
            utterance.pitch = 1.0;
            const voices = window.speechSynthesis.getVoices();
            const preferredVoice = voices.find(voice =>
                voice.name.includes('Google US English') ||
                voice.name.includes('Samantha') ||
                voice.lang === 'en-US'
            ) || voices[0];
            if (preferredVoice) utterance.voice = preferredVoice;
            window.speechSynthesis.speak(utterance);
        }
    };

    const togglePause = () => {
        if (mediaMode === 'audio') return;

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

    const addMessage = (sender, text) => {
        setMessages(prev => [...prev, { sender, text }]);
    };

    // Helper to extract JSON from text safely
    const extractJson = (text) => {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            try {
                const data = JSON.parse(jsonMatch[0]);
                setFeedbackData(data);
                return text.replace(jsonMatch[0], '').trim();
            } catch (e) {
                // partial json, ignore
            }
        }
        return text;
    };

    // Core Streaming Logic
    const streamMessage = async (chat, prompt) => {
        setIsStreaming(true);

        // Add a placeholder message for AI
        setMessages(prev => [...prev, { sender: 'ai', text: '' }]);

        try {
            const result = await chat.sendMessageStream(prompt);
            let fullText = '';

            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                fullText += chunkText;

                // Real-time update of the last message
                setMessages(prev => {
                    const newMessages = [...prev];
                    const lastMsg = newMessages[newMessages.length - 1];
                    lastMsg.text = extractJson(fullText); // Hide JSON from UI in real-time
                    return newMessages;
                });
            }

            // Final Speech after stream is done (so it speaks full sentences)
            const cleanText = extractJson(fullText);
            speak(cleanText);

        } catch (error) {
            console.error("Streaming Error:", error);
            setMessages(prev => {
                const newMessages = [...prev];
                // More helpful error message
                newMessages[newMessages.length - 1].text = "I encountered a network issue. Please check your connection or API key.";
                return newMessages;
            });
        }

        setIsStreaming(false);
    };

    const handleSend = async () => {
        if (!input.trim() || isStreaming) return;
        const userText = input;
        addMessage('user', userText);
        setInput('');

        if (chatSession) {
            await streamMessage(chatSession, userText);
        }
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
                // Optional: Auto-submit could go here
            };
        }
    };

    const endInterview = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
        }
        window.speechSynthesis.cancel();

        const finalData = {
            scores: {
                confidence: feedbackData?.confidence || 75,
                clarity: feedbackData?.clarity || 80,
                technical: 85
            },
            strengths: [
                "Good engagement.",
                "Clear audio communication.",
                "Addressed core concepts."
            ],
            improvements: [
                "Could provide more concrete examples.",
                "Ensure to pause for emphasis."
            ],
        };

        navigate('/dashboard/interview/feedback', { state: finalData });
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

                    {state?.resumeText && (
                        <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.5rem', borderRadius: '0.5rem', marginBottom: '1rem', fontSize: '0.9rem', color: '#10b981' }}>
                            <FaUser /> Resume Context Loaded
                        </div>
                    )}

                    <p>You are about to start a <strong>{state?.mode || 'General'}</strong> interview.</p>
                    <p className={styles.lobbyNote}>Choose your preferred mode:</p>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
                        <button
                            onClick={() => setMediaMode('video')}
                            className={`${styles.modeBtn} ${mediaMode === 'video' ? styles.modeBtnActive : ''}`}
                            style={{
                                border: mediaMode === 'video' ? '2px solid #3b82f6' : '1px solid #333',
                                background: mediaMode === 'video' ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                            }}
                        >
                            <FaVideo size={24} />
                            <span>Video Interview</span>
                        </button>
                        <button
                            onClick={() => setMediaMode('audio')}
                            className={`${styles.modeBtn} ${mediaMode === 'audio' ? styles.modeBtnActive : ''}`}
                            style={{
                                border: mediaMode === 'audio' ? '2px solid #10b981' : '1px solid #333',
                                background: mediaMode === 'audio' ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                            }}
                        >
                            <FaHeadphones size={24} />
                            <span>Audio Only</span>
                        </button>
                    </div>

                    <p className={styles.lobbyNote} style={{ fontSize: '0.8rem', color: '#888' }}>
                        Powered by Google Gemini ✦ Real-time Streaming
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
                            <div className={`${styles.aiPulse} ${isStreaming ? styles.thinking : ''}`}></div>
                            <span className={styles.aiLabel}>
                                {isStreaming ? 'AI Speaking...' : 'AI Interviewer'}
                            </span>
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
                            <div className={styles.audioPlaceholder}>
                                <div className={styles.audioAvatar}>
                                    <FaUser size={32} />
                                </div>
                                <p>Audio Mode Active</p>
                                <div className={styles.audioWave}>
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
                            <div className={styles.avatar}>{msg.sender === 'ai' ? <FaRobot /> : 'ME'}</div>
                            <div className={styles.bubble}>
                                {msg.text}
                                {msg.sender === 'ai' && i === messages.length - 1 && isStreaming && <span className={styles.cursor}>|</span>}
                            </div>
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
                        disabled={isStreaming}
                    />
                    <button className={styles.sendBtn} onClick={handleSend} disabled={isStreaming || !input.trim()}>
                        <FaPaperPlane />
                    </button>
                </div>
            </div>

            <div className={styles.sidebar}>
                <h3>Real-time Coach 🤖</h3>

                {feedbackData ? (
                    <>
                        <div className={styles.feedbackCard}>
                            <h4>Confidence</h4>
                            <div className={styles.meter}>
                                <div style={{ width: `${feedbackData.confidence || 50}%`, background: '#10b981' }}></div>
                            </div>
                            <p>{feedbackData.confidence}%</p>
                        </div>
                        <div className={styles.feedbackCard}>
                            <h4>Latest Feedback</h4>
                            <p style={{ fontSize: '0.9rem' }}>{feedbackData.feedback || "Analyzing..."}</p>
                        </div>
                    </>
                ) : (
                    <div className={styles.feedbackCard}>
                        <p>Detailed analysis will appear here as you speak.</p>
                    </div>
                )}

                <div className={styles.feedbackCard}>
                    <h4>Clarification Helper</h4>
                    <p>Remember the STAR method: Situation, Task, Action, Result.</p>
                </div>

                <button className={styles.endBtn} onClick={endInterview}>End Interview</button>
            </div>
        </div>
    );
};

export default InterviewSession;
