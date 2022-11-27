import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function BasicTable(props) {

  const [selectedFileId, setSelectedFileId] = useState(0);

  const handleSelect = (id) => {
    setSelectedFileId( id === selectedFileId ? null : id)
    props.onFileSelect(id === selectedFileId ? null : id)
  }

  return (
    <div className='table-wrapper'>
      <TableContainer component={Paper} sx={{ maxHeight: "100%" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell className='table-header'>File name</TableCell>
              <TableCell className='table-header' align="center">Created On</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((row) => (
              <TableRow
                key={row.name}
                sx={{ 
                  '&:last-child td, &:last-child th': { border: 0 }, 
                  backgroundColor : selectedFileId === row.name ? "lightblue" : "white"
                }}
                onClick={() => handleSelect(row.name) }
              >
                <TableCell component="th" scope="row"> {row.name}</TableCell>
                <TableCell align="center">{row.createdOn}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}