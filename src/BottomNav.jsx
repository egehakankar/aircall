import React, { Component } from 'react'
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import PhoneIcon from '@mui/icons-material/Phone';
import DialpadIcon from '@mui/icons-material/Dialpad';


import Paper from '@mui/material/Paper';

import Nav from 'react-bootstrap/Nav';



class BottomNav extends Component {
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
      <div className="botCot">
          <BottomNavigation
            showLabels
          >
            <BottomNavigationAction className="ph" label="Calls" icon={<PhoneIcon />} active />
            <BottomNavigationAction className="mh" label="Call" icon={<DialpadIcon />} />
            <BottomNavigationAction className="lh" label="Contact" icon={<ContactPhoneIcon />} />
          </BottomNavigation>
      </div>
    )
  }
}

export default BottomNav;

