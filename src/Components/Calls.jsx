import React, { Component } from 'react'
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown'

import InboxCards from './Calls/InboxCards.jsx';
import AllCards from './Calls/AllCards.jsx';

import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';

class Calls extends Component {
    constructor() {
        super()
        this.state =
        {
            typeC: "inb",
            calls: [],
        }
        this.getCalls = this.getCalls.bind(this);
        this.changeT = this.changeT.bind(this);
        this.delA = this.delA.bind(this);
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
                    this.setState({ calls: res });
                }
                console.log(res);
            })
            .catch(error => this.setState({ error: error.message }));
    }

    changeT(checker) {
        if (checker) {
            this.setState({ typeC: "inb" });
        }
        else {
            this.setState({ typeC: "all" });
        }
    }

    delA(id) {
        const calls = this.state.calls.filter(calls => calls.id !== id);
        this.setState({ calls: calls });
        console.log("fdsfds")
    }

    render() {
        return (
            <div className="calls">
                <Dropdown.Menu show>
                    <Dropdown.Item onClick={() => this.changeT(true)} eventKey="2"> <PhoneCallbackIcon /> Inbox Calls</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.changeT(false)} eventKey="3"> <AllInclusiveIcon /> All Calls</Dropdown.Item>
                </Dropdown.Menu>
                <div className="callContainer">
                    {this.state.typeC === "inb" ?
                        <InboxCards className="inbCall" onDelete = {this.delA} datas = {this.state.calls} />
                        :
                        <AllCards onDelete = {this.delA} datas = {this.state.calls} />}
                </div>
            </div>
        )
    }
}

export default Calls;

