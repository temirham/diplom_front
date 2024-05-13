import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { loadFiles, sendProjectData} from '/Users/temirhanmamaev/Documents/SystemVersioningFiles/my-app/src/store/fileSlice.js';
import {useDispatch} from "react-redux";


const ChatDialog = ({ open, onClose, onSendMessage }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const dispatch = useDispatch();

  const handleSendMessage = () => {
    if (title.trim() !== '' && description.trim() !== '') {
      onSendMessage({ title: title.trim(), description: description.trim() });
      dispatch(sendProjectData({ title: title.trim(), description: description.trim() }))
        .then(() => dispatch(loadFiles()))
        .catch((error) => console.error('Ошибка отправки данных:', error));
      setTitle('');
      setDescription('');
      setTitleError(false);
      setDescriptionError(false);
    } else {
      setTitleError(title.trim() === '');
      setDescriptionError(description.trim() === '');
    }
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    setDescriptionError(false);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        Название проекта и его описание
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Название проекта"
          type="text"
          fullWidth
          value={title}
          onChange={handleTitleChange}
          error={titleError}
          helperText={titleError ? 'Поле не может быть пустым' : ''}
        />
        <TextField
          margin="dense"
          label="Описание проекта"
          type="text"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={handleDescriptionChange}
          error={descriptionError}
          helperText={descriptionError ? 'Поле не может быть пустым' : ''}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Отмена
        </Button>
        <Button onClick={handleSendMessage} color="primary">
          Отправить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChatDialog;
