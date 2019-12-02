import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button'
import { withRouter } from 'react-router-dom'

const dataPage = (props) => {
    console.log(props)
    props.history.push(`/tasks/${props.index}`)
}


const TableEntry = (props) => {
    return (
        <TableRow>
            {props.item.map((item, index) => <TableCell key={index}>{item}</TableCell>)}    
            {props.item[0] > 0 ? <TableCell><Button variant="contained" type="submit" onClick={() => {dataPage(props)}}>Info</Button></TableCell> : null}
            {props.item[0] > 0 ? <TableCell><Button variant="contained" type="submit" onClick={ () => {props.deleteData(props.index)}}>Delete</Button></TableCell> : null}                    
        </TableRow>
    )
}

export default withRouter(TableEntry)