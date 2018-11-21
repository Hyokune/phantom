import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
// import PhotoCamera from '@material-ui/icons/PhotoCamera';
import * as React from 'react';
import { Navbar } from 'react-bootstrap';
import logo from '../images/phantomLogo.png';

interface IProps {
    searchUser: any,
}

interface IState {
    open: boolean,
    uploadFileList: any
}

export default class Header extends React.Component<IProps, IState, {}> {
    constructor(props : any) {
        super(props)

        this.state = {
            open: false,
            uploadFileList: null
        }

        this.searchUser = this.searchUser.bind(this)
        this.handleImageUpload = this.handleImageUpload.bind(this)
        this.postNewThread = this.postNewThread.bind(this)
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
                            aria-labelledby="thread-new-window-title"
                        >
                            <DialogTitle id="thread-new-window-title">Post New Thread</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="thread-new-window-text">
                                    Post a new thread here.
                                </DialogContentText>
                                <div className="thread-new-window-label">
                                    <TextField
                                        autoFocus={true}
                                        margin="normal"
                                        id="new-title"
                                        label="Title"
                                        type="text"
                                        fullWidth={true}
                                        
                                    />

                                    <TextField
                                        autoFocus={true}
                                        margin="normal"
                                        id="new-content"
                                        label="Content"
                                        type="text"
                                        fullWidth={true}
                                        
                                        multiline={true}
                                        rows={10}
                                        rowsMax={10}
                                    />
                                </div>
                                <div className="thread-new-window-upload-container">
                                    <input type="file" onChange={this.handleImageUpload} id="thread-new-image-input" />
                                    
                                </div>
                            </DialogContent>

                            <DialogActions>
                                <Button onClick={this.onCloseModal} id="thread-window-button">
                                    Cancel
                                </Button>
                                <Button onClick={this.postNewThread} id="thread-window-button">
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
    
    // POSTS new thread
    private postNewThread() {
        const titleInput = document.getElementById("new-title") as HTMLInputElement
        const contentInput = document.getElementById("new-content") as HTMLInputElement

		if (titleInput === null || contentInput === null) {
			return;
        }
        
        const formData = new FormData()
        const url = "https://phantomapi.azurewebsites.net/api/Phantom/upload"
        const urlnoimg = "https://phantomapi.azurewebsites.net/api/Phantom/upload/noimg"
        if (this.state.uploadFileList !== null) {
            const imageFile = this.state.uploadFileList[0]
            const title = titleInput.value
            const content = contentInput.value

            formData.append("Title", title)
            formData.append("Content", content)
            formData.append("Image", imageFile)
            formData.append("User", "Hades")

            fetch(url, {
                body: formData,
                headers: {'cache-control': 'no-cache'},
                method: 'POST'
            })
            .then((response : any) => {
                if (!response.ok) {
                    // Error State
                    alert(response.statusText)
                } else {
                    location.reload()
                }
              })

        } else {
            const title = titleInput.value
            const content = contentInput.value

            formData.append("Title", title)
            formData.append("Content", content)
            formData.append("User", "Hades")

            fetch(urlnoimg, {
                body: formData,
                headers: {'cache-control': 'no-cache'},
                method: 'POST'
            })
            .then((response : any) => {
                if (!response.ok) {
                    // Error State
                    alert(response.statusText)
                } else {
                    location.reload()
                }
              })
        }
  
		
    }

    // Sets file list
	private handleImageUpload(fileList: any) {
		this.setState({
			uploadFileList: fileList.target.files
		})
    }
    
    // Modal open
	private onOpenModal = () => {
		this.setState({ open: true });
	  };
	
	// Modal close
	private onCloseModal = () => {
		this.setState({ open: false });
    };
    
    
}
