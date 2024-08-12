import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchUserPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`http://localhost:5000/api/user?search=${searchTerm}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    }, [searchTerm]);

    useEffect(() => {
        if (searchTerm) {
            fetchUsers();
        } else {
            setUsers([]);
        }
    }, [fetchUsers, searchTerm]);

    const handleUserClick = async (userId) => {
        try {
            const response = await axios.post('http://localhost:5000/api/chat', { userId }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            navigate(`/chat/${response.data._id}`);
        } catch (error) {
            console.error('Error initiating chat:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Search Users</h1>
            <input
                type="text"
                placeholder="Search by name or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control mb-3"
            />
            {loading ? (
                <p className="text-center">Loading...</p>
            ) : (
                <div className="list-group">
                    {users.length > 0 ? (
                        users.map((user) => (
                            <div 
                                key={user._id} 
                                className="list-group-item list-group-item-action" 
                                onClick={() => handleUserClick(user._id)}
                                style={{ cursor: 'pointer' }}
                            >
                                {user.name} ({user.email})
                            </div>
                        ))
                    ) : (
                        <p className="text-center">No users found</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchUserPage;
