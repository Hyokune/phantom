import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import * as React from 'react';
import { Navbar } from 'react-bootstrap';
import logo from '../images/phantomLogo.png';

interface IProps {
    searchUser: any,
}

interface IState {
    open: boolean
}

export default class Header extends React.Component<IProps, IState, {}> {
    constructor(props : any) {
        super(props)

        this.state = {
            open: false
        }

        this.searchUser = this.searchUser.bind(this)
    }

    public render () {
        return (
            <Navbar>
                <div className="header-nav-content">

                    <div className="header-logo">
                        <Navbar.Header>
                            <Navbar.Brand>
                                <a href='/' >
                                    <img src={logo} height="35px" width="35px" id="header-logo-img"/>
                                    <span>PHANTOM</span>
                                </a>
                            </Navbar.Brand>
                        </Navbar.Header>
                    </div>

                    <div className="header-search-container">
                        <div className="input-group">
                            <TextField
                                id="search-user-textbox"
                                className="search-box"
                                placeholder="Search for user .."
                            />
                            <Button variant="outlined" id="header-search-button" onClick={this.searchUser}>Search</Button>
                        </div>  
                    </div>

                    <div className="header-newthread">
                    <Button variant="outlined" id="header-newthread-button" onClick={this.onOpenModal}>
                        New Thread
                        <AddIcon />
                    </Button>
                    </div>
                    
                    <div>
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
                                    
                                />

                                <TextField
                                    autoFocus={true}
                                    margin="normal"
                                    id="edit-content"
                                    label="Content"
                                    type="text"
                                    fullWidth={true}
                                    
                                    multiline={true}
                                    rows={10}
                                    rowsMax={10}
                                />
                            </DialogContent>

                            <DialogActions>
                                <Button onClick={this.onCloseModal} >
                                    Cancel
                                </Button>
                                <Button onClick={this.onCloseModal} >
                                    Confirm
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </div>
            </Navbar>
        );
    }
    // Search meme by tag
    private searchUser() {
        const textBox = document.getElementById("search-user-textbox") as HTMLInputElement
        if (textBox === null) {
            return;
        }
        const user = textBox.value 
        this.props.searchUser(user)  
    }
    /*
    private newThread() {
        // TODO
    }*/

    // Modal open
	private onOpenModal = () => {
		this.setState({ open: true });
	  };
	
	// Modal close
	private onCloseModal = () => {
		this.setState({ open: false });
	};
}
