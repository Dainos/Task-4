import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableEntry from './TableEntry'
// import { styled } from '@material-ui/core/styles';



const DataTable = ({ table, deleteData }) => {

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>№</TableCell>
                    <TableCell>Task</TableCell>
                    <TableCell>Time Start</TableCell>
                    <TableCell>Time End</TableCell>
                    <TableCell>Time Spend</TableCell>
                    <TableCell>Info</TableCell>
                    <TableCell>Delete</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {table.map((item, index) => <TableEntry item={item} key={index} index={index} deleteData={deleteData}></TableEntry>)}
            </TableBody>
        </Table>
    )
}

export default DataTable