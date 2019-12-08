import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button'
import { withRouter } from 'react-router-dom'



const TableEntry = ({ item, index, deleteData, history }) => {
    return (
        <TableRow>
            {item.map((item, index) => <TableCell key={index}>{item}</TableCell>)}    
            <TableCell><Button variant="contained" type="submit" onClick={() => {history.push(`/tasks/${index}`)}}>Info</Button></TableCell>
            <TableCell><Button variant="contained" type="submit" onClick={ () => {deleteData(index)}}>Delete</Button></TableCell>                  
        </TableRow>
    )
}

export default withRouter(TableEntry)