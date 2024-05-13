import React, { useState, useEffect } from 'react';
import FileUploader from './FileUploader';
import { useDispatch, useSelector } from "react-redux";
import FileList from './FileList';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom'; 
import Menu from './Menu'; // Импортируем компонент Menu
import ChatDialog from './ChatDialog';
import {
  Button,
  Typography,
  Grid,
  Container,
  Drawer,
  AppBar,
  Toolbar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { loadFiles } from '../store/fileSlice';
import { refreshUser, logoutUser, getUserInfo } from '../store/UserSlice';

function FileManager() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('mydrive');
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };
  const dispatch = useDispatch();
  const { files } = useSelector((state) => state.files);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(loadFiles());
      dispatch(refreshUser());
      dispatch(getUserInfo())
    };
    fetchData();
  }, [dispatch]); 


  const isFileTypeMatch = (file, fileType) => {
    const fileExtension = file.name.split('.').pop().toLowerCase();
    switch (fileType) {
      case 'documents':
        return ['pdf', 'word', 'doc', 'docx', 'csv', 'xlsx', 'xls'].includes(fileExtension);
      case 'image':
        return ['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension);
      case 'recent':
        return ['cad'].includes(fileExtension);
      default:
        return true;
    }
  };


  const filterFiles = () => {
    return files.filter((file) => {
      return String(file.user) === String(localStorage.getItem('userID')) && file.name.toLowerCase().includes(searchText.toLowerCase()) && isFileTypeMatch(file, selectedMenu);
    });
  };
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleExit = () => {
    dispatch(logoutUser()).then(() => 
      {
        navigate('/')
        localStorage.clear();
      }
    );
  };

  const [isChatOpen, setChatOpen] = useState(false);

  const handleOpenChat = () => {
    setChatOpen(true);
  };
  const handleCloseChat = () => {
    setChatOpen(false);
  };

  const handleSendMessage = (message) => {
    // Здесь можно обработать отправку сообщения
    console.log('Отправлено сообщение:', message);
    handleCloseChat(); // Закрываем диалоговое окно
  };


  return (
    <Container style={{ alignContent: 'center', marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto' }}>
      <Grid width={'75vw'} marginTop={10}>
        <Grid item xs={12} md={2}>
          <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            <div
              style={{
                width: '250px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Button
                startIcon={<PersonIcon />}
                onClick={handleExit}
              >
                Выйти
              </Button>
              <Menu // Передаем функции обработчики и selectedMenu в компонент Menu
                handleMenuClick={handleMenuClick}
                handleOpenChat={handleOpenChat}
                selectedMenu={selectedMenu}
              />
              <div align="center">
                <FileUploader />
              </div>
            </div>
          </Drawer>
        </Grid>
        <Grid item xs={12} md={10}>
          <AppBar position="static" color="default">
            <Toolbar>
              <Grid style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <div style={{ flexGrow: 1 }}>
                  <Typography variant="h6" color="inherit" marginLeft={1} marginTop={1}>
                    File Manager
                  </Typography>
                  <Button
                    startIcon={<MenuIcon />}
                    onClick={() => setDrawerOpen(true)}
                  >
                    Open Menu
                  </Button>
                </div>
                <TextField
                  label="Поиск файлов..."
                  variant="outlined"
                  fullWidth
                  value={searchText}
                  onChange={handleSearchChange}
                  style={{ width: '300px', marginTop: '10px', zIndex: 1 }}
                />
              </Grid>
            </Toolbar>
          </AppBar>
          <FileList files={files} selectedMenu={selectedMenu} filterFiles={filterFiles} />
          <ChatDialog open={isChatOpen} onClose={handleCloseChat} onSendMessage={handleSendMessage} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default FileManager;