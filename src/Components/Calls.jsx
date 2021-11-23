import React, { Component } from 'react'
import axios from 'axios';

import InboxCards from './Calls/InboxCards.jsx';
import AllCards from './Calls/AllCards.jsx';
import MissedCards from './Calls/MissedCards.jsx'
import OutboxCards from './Calls/OutboxCards.jsx'

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

class Calls extends Component {
    constructor() {
        super()
        this.state =
        {
            typeC: "all",
            calls: [],
            value: 0,
        }
        this.getCalls = this.getCalls.bind(this);
        this.changeT = this.changeT.bind(this);
        this.delA = this.delA.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
        this.setState({ typeC: checker });
    }

    delA(id) {
        const calls = this.state.calls.filter(calls => calls.id !== id);
        this.setState({ calls: calls });
    }

    handleChange = (event, value) => {
        this.setState({ value })
    };


    render() {
        const { classes, value } = this.props;
        return (
            <div className="calls">
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs onChange={this.handleChange} value={this.state.value} aria-label="basic tabs example" variant="fullWidth">
                        <Tab onClick={() => this.changeT("all")} label="All" />
                        <Tab onClick={() => this.changeT("miss")} label="Missed" />
                        <Tab onClick={() => this.changeT("inb")} label="Inbox" />
                        <Tab onClick={() => this.changeT("out")} label="Outbox" />
                    </Tabs>
                </Box>

                <div className="callContainer">
                    {this.state.typeC === "inb" ?
                        <InboxCards className="inbCall" onDelete={this.delA} datas={this.state.calls} />
                        :
                        this.state.typeC === "all" ?
                            < AllCards onDelete={this.delA} datas={this.state.calls} />
                            :
                            this.state.typeC === "miss" ?
                                < MissedCards onDelete={this.delA} datas={this.state.calls} />
                                :
                                < OutboxCards onDelete={this.delA} datas={this.state.calls} />
                    }
                </div>
            </div>
        )
    }
}

export default Calls;

