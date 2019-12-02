import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableEntry from './TableEntry'


const DataTable = props => {

    const entries = props.table


    return (
        <Table>
            <TableHead>
                <TableEntry item={entries[0]}/>
            </TableHead>
            <TableBody>
                {entries.map((item, index) => index > 0 ? <TableEntry item={item} key={index} index={index} deleteData={props.deleteData}></TableEntry> : null)}
            </TableBody>
        </Table>
    )
}



export default DataTable