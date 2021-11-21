import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes, Link } from 'react-router-dom';

import DialpadIcon from '@mui/icons-material/Dialpad';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import ArchiveIcon from '@mui/icons-material/Archive';

import Nav from 'react-bootstrap/Nav';



class Header extends Component {
  constructor() {
    super()
    this.state =
    {
      mount: false,
    }
  }

  componentDidMount() {
    this.setState(state => ({
      mount: true,
    }));
  }

  render() {
    return (
      <div className="header">
          <div className="logoHeader" >
            <DialpadIcon className="logo" />
            <h1 className="nameLogo">Callable</h1>

          </div>

        <Nav justify variant="tabs" defaultActiveKey="/">
          <Nav.Item className="fHeaderNav">
            <Nav.Link as={Link} to="/" eventKey="link-1">
            <PhoneInTalkIcon/> Calls
            </Nav.Link>
          </Nav.Item >
          <Nav.Link className="sHeaderNav" as={Link} to="/archive" eventKey="link-2">
            <ArchiveIcon /> Archive
          </Nav.Link>
        </Nav>
      </div>
    )
  }
}

export default Header;
