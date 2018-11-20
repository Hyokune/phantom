import { Button, Card, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';


import * as React from "react";

interface IProps {
    error: any,
    threads: any[],
    value: any
}

interface IState {
    indexes1: any
    indexes2: any
}

export default class ThreadList extends React.Component<IProps, IState, {}> {
    constructor(props : any) {
        super(props)

        this.state = {
            indexes1: {},
            indexes2: {}
        }

        this.handleClick = this.handleClick.bind(this)
        this.handleShow = this.handleShow.bind(this)
    }

    public render () {
        return (
            <div className="threadlist-container">

                <div className="threadlist-error">
                    <p>{ this.props.error } </p>
                </div>

                <div>
                    {this.props.threads.map((thread : any, index : number) =>
                        <div key={index} className="threadlist">
                            <Card className="threadlist-threads">
                                <ListItem button={true} onClick={this.handleClick(index)}>
                                    <CardHeader className="threadlist-card-header"
                                        title={thread.title}
                                        subheader={thread.uploaded}
                                    />
                                    <CardMedia 
                                        title={thread.title}
                                        image={thread.url}
                                    />
                                    <CardContent>
                                        <Typography className="threadlist-user">
                                            {thread.user}
                                        </Typography>
                                    </CardContent>
                                    <div className="threadlist-expand-icons">
                                        {this.state.indexes1[index] ? <ExpandLess /> : <ExpandMore />}
                                    </div>
                                </ListItem>

                                <Collapse in={this.state.indexes1[index]} timeout="auto" unmountOnExit={true}>
                                    <div className="thread-information">
                                        <Divider />
                                        <CardContent>
                                            <Typography component="p" className="thread-content">
                                                {thread.content}
                                            </Typography>

                                            <div className="thread-options">
                                                <Button variant="outlined" id="thread-options-edit" onClick={this.handleShow(index)}>
                                                    Edit
                                                </Button>
                                                <IconButton aria-label="Delete" id="thread-options-delete">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </div>
                                        </CardContent>
                                    </div>

                                    <div className="thread-edit-window">
                                        <Dialog
                                            open={this.state.indexes2[index]}
                                            onClose={this.handleShow(index)}
                                            aria-labelledby="thread-edit-window-title"
                                        >
                                            <DialogTitle id="thread-edit-window-title">Edit Thread</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText id="thread-edit-window-text">
                                                    Make any changes to the thread here.
                                                </DialogContentText>
                                                <TextField
                                                autoFocus={true}
                                                margin="normal"
                                                id="name"
                                                label="Title"
                                                type="text"
                                                fullWidth={true}
                                                />
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={this.handleShow(index)} >
                                                Cancel
                                                </Button>
                                                <Button onClick={this.handleShow(index)} >
                                                Subscribe
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </div>
                                </Collapse>
                                
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        )
    };


    public handleClick = (index : any) => () => {
		this.setState(prevState => { 
			const data = Object.assign({}, prevState.indexes1) 
			data[index] = !data[index] 
			return {indexes1: data}
		}); 
    }
    
    public handleShow = (index : any) => () => {
		this.setState(prevState => { 
			const data = Object.assign({}, prevState.indexes2) 
			data[index] = !data[index] 
			return {indexes2: data}
		}); 
	}
}

