import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Shared Jobs Database (Mock)
    const [jobs, setJobs] = useState([
        { id: 1, title: "Senior React Developer", company: "TechFlow", location: "San Francisco, CA", type: "Full-time", tags: ["React", "Node.js"], posted: "2 hours ago", requiredSkills: ["React", "JavaScript"] },
        { id: 2, title: "Frontend Engineer", company: "InnovateLab", location: "New York, NY", type: "Contract", tags: ["Vue", "CSS"], posted: "5 hours ago", requiredSkills: ["Vue", "Frontend"] },
        { id: 3, title: "UI/UX Designer", company: "CreativeMinds", location: "Austin, TX", type: "Full-time", tags: ["Figma", "Design"], posted: "1 day ago", requiredSkills: ["Design", "Figma"] },
        { id: 4, title: "Backend Developer", company: "ServerPro", location: "Remote", type: "Full-time", tags: ["Python", "Django"], posted: "3 hours ago", requiredSkills: ["Python", "Backend"] },
    ]);

    // Check localStorage on load to persist login
    useEffect(() => {
        const storedUser = localStorage.getItem('careerAiUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('careerAiUser', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('careerAiUser');
    };

    const addJob = (newJob) => {
        setJobs(prev => [newJob, ...prev]);
    };

    return (
        <UserContext.Provider value={{ user, login, logout, jobs, addJob }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
