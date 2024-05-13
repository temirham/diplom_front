import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Menu, MenuItem, SvgIcon } from '@mui/material';
import { deleteFile, loadFiles } from '../store/fileSlice.js';
import { useDispatch } from "react-redux";
import axios from 'axios';
import { IP4 } from '../store/pref.js';
import { Icon } from '@iconify/react';
import fileIcon from '@iconify-icons/fa-regular/file';
import fileImage from '@iconify-icons/fa-solid/file-image';
import filePdf from '@iconify-icons/fa-regular/file-pdf';
import fileWord from '@iconify-icons/fa-regular/file-word';
import fileExcl from '@iconify-icons/fa-regular/file-excel';
import filePpt from '@iconify-icons/fa-regular/file-powerpoint';
import cubeIcon from '@iconify-icons/fa-solid/cube';

function getFileIcon(extension) {
  switch (extension.toLowerCase()) {
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return <Icon icon={fileImage} />;
    case 'docx':
    case 'doc':
    case 'word':
      return <Icon icon={fileWord} />;
    case 'xlsx':
    case 'xls':
      return <Icon icon={fileExcl} />;
    case 'pptx':
    case 'ppt':
      return <Icon icon={filePpt} />;
    case 'pdf':
      return <Icon icon={filePdf} />;
    case 'cad':
      return <SvgIcon component={cubeIcon} />;
    default:
      return <Icon icon={fileIcon} />;
  }
}

function FileCard({ file, selectedMenu }) {
  const [contextMenuAnchor, setContextMenuAnchor] = useState(null);
  const dispatch = useDispatch();
  const { files } = useSelector((state) => state.files);

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenuAnchor(event.currentTarget);
  };

  const handleCloseContextMenu = () => {
    setContextMenuAnchor(null);
  };

  const handleDeleteFile = () => {
    const allVersionsToDelete = [file, ...files.filter((f) => f.name === file.name)];
    allVersionsToDelete.forEach((versionFile) => {
      dispatch(deleteFile(versionFile)).then(() => 
        {dispatch(loadFiles())}
      );
    });
    handleCloseContextMenu();
  };

  const handleDownloadFile = async (selectedFile) => {
    try {
      const requestData = {
        name: selectedFile.name
      };
      console.log(selectedFile.name)
      const response = await axios.post(`${IP4}download_documentation`, requestData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        responseType: 'arraybuffer', 
      });
  
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
  
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', selectedFile.name.replace(/\$/g, '_'));
      document.body.appendChild(link);
      link.click();
      link.remove(); 
    } catch (error) {
      console.error('Ошибка загрузки файла:', error);
    }
    handleCloseContextMenu();
  };

  return (
    <div style={{ marginLeft: '15px', marginRight: '15px', width: '6em' }}
    >
      <div
        style={{ fontSize: '60px', cursor: 'pointer' }}
        onContextMenu={handleContextMenu}
      >
        {getFileIcon(file.name.split('.').pop())}
      </div>
      <div >
        <Typography variant="subtitle3" style={{ fontSize: '13px' }}>{file.name.replace(/\$/g, '_')}</Typography>
      </div>
      <Menu
        anchorEl={contextMenuAnchor}
        open={Boolean(contextMenuAnchor)}
        onClose={handleCloseContextMenu}
      >
        <MenuItem onClick={handleDeleteFile}>Удалить</MenuItem>
        <MenuItem onClick={() => handleDownloadFile(file)}>Скачать</MenuItem>
      </Menu>
    </div>
  );
}

export default FileCard;
