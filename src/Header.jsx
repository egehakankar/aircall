import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes, Link } from 'react-router-dom';

import DialpadIcon from '@mui/icons-material/Dialpad';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import ArchiveIcon from '@mui/icons-material/Archive';

import Nav from 'react-bootstrap/Nav';

import Image from './images/callable.png';


class Header extends Component {
  constructor() {
    super()
    this.state =
    {
      mount: false,
      checker: false,
    }
    this.changeChecker = this.changeChecker.bind(this);
  }

  componentDidMount() {
    this.setState(state => ({
      mount: true,
    }));

  }
  
  changeChecker(checkk){
    this.setState({checker: checkk})
  }

  render() {
    return (
      <div className="header">
        <div className="logoHeader" >
          <img className="logoI" src={Image} />
        </div>

        <Nav fill variant="tabs" defaultActiveKey="/">
          <Nav.Item onClick={() => {this.changeChecker(false)}}>
            <Nav.Link className="headNav"  as={Link} to="/" eventKey="link-1" className={this.state.checker ? "" : "active"} >
              <PhoneInTalkIcon /> Calls
            </Nav.Link>
          </Nav.Item>

          <Nav.Item onClick={() => {this.changeChecker(true)}}>
            <Nav.Link className="headNav" as={Link} to="/archive" eventKey="link-2" className={this.state.checker ? "active" : ""}>
              <ArchiveIcon /> Archive
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    )
  }
}

export default Header;
