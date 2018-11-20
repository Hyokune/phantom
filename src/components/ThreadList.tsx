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
    open: boolean
}

export default class ThreadList extends React.Component<IProps, IState, {}> {
    constructor(props : any) {
        super(props)

        this.state = {
            indexes1: {},
            indexes2: {},
            open: false
        }

        this.handleClick = this.handleClick.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.editThread = this.editThread.bind(this)
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
                                        <Typography className="threadlist-user" children={thread.user} />
                                    </CardContent>
                                    <div className="threadlist-expand-icons">
                                        {this.state.indexes1[index] ? <ExpandLess /> : <ExpandMore />}
                                    </div>
                                </ListItem>

                                <Collapse in={this.state.indexes1[index]} timeout="auto" unmountOnExit={true}>
                                    <div className="thread-information">
                                        <Divider />
                                        <CardContent>
                                            <Typography className="thread-content" variant="body1" children={thread.content} />

                                            <div className="thread-options">
                                                <Button variant="outlined" id="thread-options-edit" onClick={this.onOpenModal}>
                                                    Edit
                                                </Button>
                                                <IconButton aria-label="Delete" id="thread-options-delete">
                                                    <DeleteIcon onClick={this.deleteThread.bind(this, thread.id)}/>
                                                </IconButton>
                                            </div>
                                        </CardContent>
                                    </div>

                                    <div className="thread-edit-window">
                                        <Dialog
                                            open={this.state.open}
                                            onClose={this.onCloseModal}
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
                                                    id="edit-title"
                                                    label="Title"
                                                    type="text"
                                                    fullWidth={true}
                                                    defaultValue={thread.title}
                                                />

                                                <TextField
                                                    autoFocus={true}
                                                    margin="normal"
                                                    id="edit-content"
                                                    label="Content"
                                                    type="text"
                                                    fullWidth={true}
                                                    defaultValue={thread.content}
                                                    multiline={true}
                                                    rows={10}
                                                    rowsMax={10}
                                                />
                                            </DialogContent>

                                            <DialogActions>
                                                <Button onClick={this.onCloseModal} >
                                                    Cancel
                                                </Button>
                                                <Button onClick={this.editThread(index)} >
                                                    Confirm
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
        console.log(this.state.indexes2[index])
    }

    // Modal Open
    private onOpenModal = () => {
        this.setState({ open: true });
	  };
    
    // Modal Close
    private onCloseModal = () => {
		this.setState({ open: false });
	};
    
    // PUT Thread
    private editThread = (index : any) => () => {
        this.handleShow(index)
        const titleInput = document.getElementById("edit-title") as HTMLInputElement
        const contentInput = document.getElementById("edit-content") as HTMLInputElement

        if (titleInput === null || contentInput === null) {
			return;
        }
        
        const currentThread = this.props.threads[index]
        const url = "https://phantomapi.azurewebsites.net/api/Phantom/" + currentThread.id
        const updatedTitle = titleInput.value
        const updatedContent = contentInput.value
		fetch(url, {
			body: JSON.stringify({
                "content": updatedContent,
                "height": currentThread.height,
                "id": currentThread.id,
                "title": updatedTitle,
                "uploaded": currentThread.uploaded,
                "url": currentThread.url,
                "user:": currentThread.user,
                "width": currentThread.width
            }),
			headers: {'cache-control': 'no-cache','Content-Type': 'application/json'},
			method: 'PUT'
		})
        .then((response : any) => {
			if (!response.ok) {
				// Error State
				alert(response.statusText + " " + url)
			} else {
				location.reload()
			}
		  })
    }

    // DELETE Thread
    private deleteThread(id: any) {
        const url = "https://phantomapi.azurewebsites.net/api/Phantom/" + id

		fetch(url, {
			method: 'DELETE'
		})
        .then((response : any) => {
			if (!response.ok) {
				// Error Response
				alert(response.statusText)
			}
			else {
              location.reload()
			}
		  })
    }
}

