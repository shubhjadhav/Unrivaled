import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const temp = [
  {
    "id": 1,
    "name":"Shubham.pdf",
    "dateCreated": new Date().toJSON().slice(0, 10)
  },
  {
    "id": 2,
    "name":"Shubham.pdf",
    "dateCreated": new Date().toJSON().slice(0, 10)
  },
  {
    "id": 3,
    "name":"Shubham.pdf",
    "dateCreated": new Date().toJSON().slice(0, 10)
  },
  {
    "id": 4,
    "name":"Shubham.pdf",
    "dateCreated": new Date().toJSON().slice(0, 10)
  },
  {
    "id": 5,
    "name":"Shubham.pdf",
    "dateCreated": new Date().toJSON().slice(0, 10)
  },
  {
    "id": 6,
    "name":"Shubham.pdf",
    "dateCreated": new Date().toJSON().slice(0, 10)
  },
  {
    "id": 7,
    "name":"Shubham.pdf",
    "dateCreated": new Date().toJSON().slice(0, 10)
  },
  {
    "id": 8,
    "name":"Shubham.pdf",
    "dateCreated": new Date().toJSON().slice(0, 10)
  },
  {
    "id": 9,
    "name":"Shubham.pdf",
    "dateCreated": new Date().toJSON().slice(0, 10)
  },
  {
    "id": 10,
    "name":"Shubham.pdf",
    "dateCreated": new Date().toJSON().slice(0, 10)
  }
]

const handleCellClick = (e) => {
  console.log(e.target.textContent);
}

export default function BasicTable() {

  const [selectedFileId, setSelectedFileId] = useState(0);

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
            {temp.map((row) => (
              <TableRow
                key={row.name}
                sx={{ 
                  '&:last-child td, &:last-child th': { border: 0 }, 
                  backgroundColor : selectedFileId === row.id ? "lightblue" : "white"
                }}
                onClick={() => setSelectedFileId( row.id === selectedFileId ? null : row.id)}
              >
                <TableCell component="th" scope="row"> {row.name}</TableCell>
                <TableCell align="center">{row.dateCreated}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}