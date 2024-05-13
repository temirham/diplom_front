import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Divider} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import DescriptionIcon from '@mui/icons-material/Description';
import ChatIcon from '@mui/icons-material/Chat';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const Menu = ({ handleMenuClick, handleOpenChat, selectedMenu }) => {
  return (
    <div>
      <List>
        <ListItem button selected={selectedMenu === 'mydrive'} onClick={() => handleMenuClick('mydrive')}>
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary="My Drive" />
        </ListItem>
        <ListItem button selected={selectedMenu === 'documents'} onClick={() => handleMenuClick('documents')}>
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="Документы" />
        </ListItem>
        <ListItem button onClick={handleOpenChat}>
          <ListItemIcon>
            <ChatIcon />
          </ListItemIcon>
          <ListItemText primary="Чат" />
        </ListItem>
        <ListItem button selected={selectedMenu === 'recent'} onClick={() => handleMenuClick('recent')}>
          <ListItemIcon>
            <InsertDriveFileIcon />
          </ListItemIcon>
          <ListItemText primary="Другое" />
        </ListItem>
      </List>
      <Divider />
      <div align="center">
        
      </div>
    </div>
  );
};

export default Menu;
