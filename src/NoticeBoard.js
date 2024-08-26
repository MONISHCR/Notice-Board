import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  Link,
  Grid,
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
    axios.get('https://nb-bac.onrender.com/notices')
      .then((response) => setNotices(response.data))
      .catch((error) => console.error('Error fetching notices:', error));
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
      .catch((error) => console.error('Error adding notice:', error));
  };

  const handleLogin = () => {
    if (
      loginDetails.username === adminCredentials.username &&
      loginDetails.password === adminCredentials.password
    ) {
      setIsAdmin(true);
      setShowLogin(false);
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <Container maxWidth="md" sx={{
      backgroundColor: 'burlywood',
      padding: 2,
      borderRadius: 2,
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
      border: '5px solid #8B4513',
    }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Notice Board CSM-A
      </Typography>
      
      <Box sx={{ mt: 4 }}>
        {notices.map((notice, index) => (
          <Card key={index} sx={{ mb: 2, backgroundColor: '#FFF8DC', boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.2)' }}>
            <CardContent>
              <Typography variant="body1" gutterBottom>{notice.content}</Typography>
              {notice.link && (
                <Typography variant="body2" color="primary">
                  <Link href={notice.link} target="_blank" rel="noopener noreferrer">
                    {notice.link}
                  </Link>
                </Typography>
              )}
              {notice.deadline && (
                <Typography variant="body2" sx={{ color: 'red', fontWeight: 'bold' }}>
                  Deadline: {notice.deadline}
                </Typography>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>

      {!isAdmin && !showLogin && (
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button variant="contained" color="secondary" onClick={() => setShowLogin(true)}>
            Admin Login
          </Button>
        </Box>
      )}

      {showLogin && !isAdmin && (
        <Box sx={{ mt: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Admin Login
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Username"
                name="username"
                value={loginDetails.username}
                onChange={handleLoginChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                name="password"
                type="password"
                value={loginDetails.password}
                onChange={handleLoginChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleLogin} fullWidth>
                Login
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}

      {isAdmin && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Add New Notice
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Notice Content"
                name="content"
                value={newNotice.content}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Link (optional)"
                name="link"
                value={newNotice.link}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Deadline (optional)"
                name="deadline"
                value={newNotice.deadline}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={addNotice} fullWidth>
                Add Notice
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="textSecondary">
          &copy; {new Date().getFullYear()} @Monish KMIT
        </Typography>
      </Box>
    </Container>
  );
};

export default NoticeBoard;
