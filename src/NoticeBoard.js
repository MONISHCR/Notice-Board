import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  TextField,
} from '@mui/material';
import axios from 'axios';

const adminCredentials = {
  username: 'admin',
  password: 'csm321$',
};

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const [newNotice, setNewNotice] = useState({ content: '', link: '', deadline: '' });
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginDetails, setLoginDetails] = useState({ username: '', password: '' });
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    // Fetch notices from the backend
    axios.get('https://nb-bac.onrender.com/notices')
      .then((response) => {
        setNotices(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the notices!', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewNotice({ ...newNotice, [name]: value });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  const addNotice = () => {
    axios.post('https://nb-bac.onrender.com/notices', newNotice)
      .then((response) => {
        setNotices([...notices, response.data]);
        setNewNotice({ content: '', link: '', deadline: '' });
      })
      .catch((error) => {
        console.error('There was an error adding the notice!', error);
      });
  };

  const handleLogin = () => {
    if (
      loginDetails.username === adminCredentials.username &&
      loginDetails.password === adminCredentials.password
    ) {
      setIsAdmin(true);
      setShowLogin(false); // Hide login form after successful login
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Notice Board CSM-A
      </Typography>
      <Box sx={{ mt: 4 }}>
        {notices.map((notice, index) => (
          <Card key={index} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="body1">{notice.content}</Typography>
              {notice.link && (
                <Typography variant="body2" color="primary">
                  <a href={notice.link} target="_blank" rel="noopener noreferrer">
                    {notice.link}
                  </a>
                </Typography>
              )}
              {notice.deadline && (
  <Typography variant="body2" sx={{ color: 'red', fontWeight: 'bold' }}>
    {notice.deadline}
  </Typography>
)}

            </CardContent>
          </Card>
        ))}
      </Box>

      {!isAdmin && !showLogin && (
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button variant="contained" color="secondary" onClick={() => setShowLogin(true)}>
            Login as Admin
          </Button>
        </Box>
      )}

      {showLogin && !isAdmin && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Admin Login
          </Typography>
          <TextField
            label="Username"
            name="username"
            value={loginDetails.username}
            onChange={handleLoginChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={loginDetails.password}
            onChange={handleLoginChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
        </Box>
      )}

      {isAdmin && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Add New Notice
          </Typography>
          <TextField
            label="Notice Content"
            name="content"
            value={newNotice.content}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Link (optional)"
            name="link"
            value={newNotice.link}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Deadline (optional)"
            name="deadline"
            value={newNotice.deadline}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" onClick={addNotice}>
            Add Notice
          </Button>
        </Box>
      )}

      <Box sx={{ mt: 4 }}>
        <Typography align="center">&copy; {new Date().getFullYear()} @Monish KMIT</Typography>
      </Box>
    </Container>
  );
};

export default NoticeBoard;
