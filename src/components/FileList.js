import React from 'react';
import { Grid, Paper } from '@mui/material';
import FileCard from './FileCard';

const FileList = ({ selectedMenu, filterFiles }) => {
    const filteredFiles = filterFiles();
  
    return (
      <Paper elevation={10} style={{ padding: '20px' }}>
        {filteredFiles.length > 0 ? (
          <Grid container spacing={-2}>
            {filteredFiles.map((file, index) => (
              <FileCard key={index} file={file} selectedMenu={selectedMenu} />
            ))}
          </Grid>
        ) : (
          <h1>К сожалению, пока ничего не найдено</h1>
        )}
      </Paper>
    );
  };
  
  export default FileList;
  
