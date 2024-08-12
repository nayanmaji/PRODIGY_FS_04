import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Home from './pages/Home';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import SearchUserPage from './pages/SearchUserPage'; // Import the SearchUserPage
import ChatWindow from './components/Chat/ChatWindow';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/register" element={<SignupPage />} />
                    <Route path="/chat" element={<ChatPage />} />
                    <Route path="/chat/:chatId" element={<ChatWindow />} /> {/* Add dynamic route for chat */}
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/search" element={<SearchUserPage />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
