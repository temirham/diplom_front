import React, { useState } from 'react';
import { Box, Button, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { loadFiles } from '../store/fileSlice';
import axios from 'axios';
import { IP4 } from '../store/pref';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false); // Состояние для отслеживания ошибки ввода логина
  const [passwordError, setPasswordError] = useState(false); // Состояние для отслеживания ошибки ввода пароля
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(false); // Сбрасываем ошибку при изменении значения поля логина
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(false); // Сбрасываем ошибку при изменении значения поля пароля
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${IP4}profiles_api/v1/token/get`,
        {
          username: email,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
        }
      );
      const accessToken = response.data.access;
      localStorage.setItem('accessToken', response.data.access)
      localStorage.setItem('refreshToken', response.data.refresh)
      if (accessToken) {
        dispatch(loadFiles())
        navigate('/main'); 
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setEmailError(true); // Устанавливаем ошибку ввода логина
        setPasswordError(true); // Устанавливаем ошибку ввода пароля
        console.log('Неверный логин или пароль');
      } else {
        console.error('Ошибка аутентификации:', error);
      }
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" align="center" sx={{ mb: 4 }}>
          Авторизация
        </Typography>
        <form onSubmit={handleFormSubmit}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextField
                fullWidth
                label="Логин"
                variant="outlined"
                value={email}
                onChange={handleEmailChange}
                error={emailError} // Устанавливаем состояние ошибки для поля логина
                helperText={emailError ? "Неверный логин или пароль" : ""} // Выводим сообщение об ошибке рядом с полем логина
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                label="Пароль"
                type="password"
                variant="outlined"
                value={password}
                onChange={handlePasswordChange}
                error={passwordError} // Устанавливаем состояние ошибки для поля пароля
                helperText={passwordError ? "Неверный логин или пароль" : ""} // Выводим сообщение об ошибке рядом с полем пароля
              />
            </Grid>
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
              >
                Войти
              </Button>
            </Grid>
          </Grid>
        </form>
        <Box textAlign="center" mt={2}>
          <Button color="primary" onClick={handleRegisterClick}>Нет аккаунта?</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
