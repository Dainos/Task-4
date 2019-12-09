import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { styled } from '@material-ui/core/styles';

const MyButton = styled(Button)({
    background: 'white',
    color: '#44C7DA',
    height: "40px",
    width: '70px',
});

const MyDialogTitle = styled(DialogTitle)({
    color: '#BD2E5D',
    fontWeight: 'bolder'
});


const AlertDialog = (props) => {

    

    return (
        <Dialog open={props.open} >
            <MyDialogTitle >Empty task name</MyDialogTitle>
            <DialogContent>
                <DialogContentText>
                    You are trying close your task without name, enter the title and try again!
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <MyButton onClick={props.handle}>CLOSE</MyButton>
            </DialogActions>
        </Dialog>
    )
}

export default AlertDialog