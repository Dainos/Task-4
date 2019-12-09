import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button'
import { withRouter } from 'react-router-dom'

import { styled } from '@material-ui/core/styles';

const MyRaw = styled(TableRow)({
    backgroundColor: '#EAF6FF',
})

const MyCell = styled(TableCell)({
    backgroundColor: '#EAF6FF',
    color: 'blue'
})

const MyButton = styled(Button)({
    background: 'white',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 0 5px rgba(0,0,0,0.5)',
    color: 'blue',
    height: "40px",
    width: '70px',
    padding: '0 30px',
});



const TableEntry = ({ item, index, deleteData, history }) => {
    return (
        <MyRaw>
            {item.map((item, index) => <MyCell key={index}>{item}</MyCell>)}    
            <TableCell><MyButton variant="contained" type="submit" onClick={() => {history.push(`/tasks/${index}`)}}>Info</MyButton></TableCell>
            <TableCell><MyButton variant="contained" type="submit" onClick={ () => {deleteData(index)}}>Delete</MyButton></TableCell>                  
        </MyRaw>
    )
}

export default withRouter(TableEntry)