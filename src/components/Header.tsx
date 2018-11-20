import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import * as React from 'react';
import { Navbar } from 'react-bootstrap';
import logo from '../images/phantomLogo.png';

interface IProps {
    searchUser: any
}

export default class Header extends React.Component<IProps, {}> {
    constructor(props : any) {
        super(props)
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
                            <Button variant="outlined" onClick={this.searchUser} id="header-search-button">Search</Button>
                        </div>  
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
}
