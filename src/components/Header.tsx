import Button from '@material-ui/core/Button';
import * as React from 'react';
import { FormControl, FormGroup, Navbar } from 'react-bootstrap';
import logo from '../images/phantomLogo.png';

const Header = (props : any) => {
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
                    <Navbar.Form>
                        <form onSubmit={props.getRedditPost}>
                            <FormGroup>
                                <FormControl 
                                    type="text" 
                                    name="user" 
                                    placeholder="Search for user..." 
                                />
                                <Button variant="outlined" type="submit" id="header-search-button">Search</Button>
                            </FormGroup>
                        </form>
                    </Navbar.Form>
                </div>
                
            </div>
        </Navbar>
    );
};

export default Header;