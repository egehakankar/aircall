import React, { Component } from 'react'
import axios from 'axios';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import PhoneIcon from '@mui/icons-material/Phone';
import DialpadIcon from '@mui/icons-material/Dialpad';

import PhoneMissedIcon from '@mui/icons-material/PhoneMissed';

class BottomNav extends Component {
  constructor() {
    super()
    this.state =
    {
      calls: [],
      missCount: 0,
    }
    this.getCalls = this.getCalls.bind(this)
    this.countMiss = this.countMiss.bind(this)
  }

  componentDidMount() {
    this.getCalls()
  }

  getCalls() {
      const API_PATH = 'https://aircall-job.herokuapp.com/activities';
      axios({
          method: 'get',
          url: `${API_PATH}`,
          headers: {
              'content-type': 'application/json',
              'Accept': 'application/json',
              'X-Requested-With': 'XMLHttpRequest'
          }
      })
          .then(result => {
              let res = result.data;
              if (res) {
                  this.setState({ calls: res }, () => {this.countMiss()} );
              }
          })
          .catch(error => this.setState({ error: error.message }));
  }

  countMiss() {
    var countTemp = this.state.calls.filter (item => item.call_type === "missed").length
    this.setState({ missCount: countTemp})
  }

  render() {
    return (
      <div className="botCot">
          <BottomNavigation
            showLabels
          >
            <BottomNavigationAction className="ph" label={"Calls " + this.state.missCount} icon={<PhoneIcon />} active />
            <BottomNavigationAction className="mh" label="Call" icon={<DialpadIcon />} />
            <BottomNavigationAction className="lh" label="Contacts" icon={<ContactPhoneIcon />} />
          </BottomNavigation>
      </div>
    )
  }
}

export default BottomNav;

