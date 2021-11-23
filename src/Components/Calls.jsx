import React, { Component } from 'react'
import axios from 'axios';

import Cards from './Calls/Cards.jsx';

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

    //Gets all the calls.
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

    //Changes the call type (all, inbox, outbox, missed).
    changeT(checker) {
        this.setState({ typeC: checker });
    }

    //Archives a call.
    delA(id) {
        const calls = this.state.calls.filter(calls => calls.id !== id);
        this.setState({ calls: calls });
    }

    handleChange = (event, value) => {
        this.setState({ value })
    };


    render() {

        //Sorts calls according to the date.
        this.state.calls.sort(function compare(a, b) {
            var dateA = new Date(a.created_at)
            var dateB = new Date(b.created_at)
            return dateB - dateA;
        });
        var prevDate = "";
        var dateChecker = false;
        var onDelete = this.delA;

        //Creating the Call Cards of All Cards.
        let allCalls = this.state.calls.map(function (datas) {
            var date = new Date(datas.created_at);
            var printDate = date.getDay() + " " + date.toLocaleString('en', { month: 'long' }) + " " + date.getFullYear();
            var time = date.getHours() + ":" + date.getMinutes();

            if (printDate === prevDate) {
                dateChecker = false;
            } else if (datas.is_archived === false) {
                dateChecker = true
                prevDate = printDate
            }
            else {
                dateChecker = false;
            }

            return (
                <div key={datas.id} className="allCards">
                    {dateChecker ? <div className="dateContainer" > {printDate}</div> : ""}
                    {datas.is_archived === false ?
                        <Cards datas={datas} time={time} onDelete={onDelete}/>
                        : ""}
                </div>
            )
        });
        prevDate = "";

        //Creating the Call Cards of Missed Cards.
        let missed = this.state.calls.map(function (datas) {
            var date = new Date(datas.created_at);
            var printDate = date.getDay() + " " + date.toLocaleString('en', { month: 'long' }) + " " + date.getFullYear();
            var time = date.getHours() + ":" + date.getMinutes();

            if (printDate === prevDate) {
                dateChecker = false;
            } else if (datas.is_archived === false && datas.call_type === "missed") {
                dateChecker = true
                prevDate = printDate
            }
            else {
                dateChecker = false;
            }

            return (
                <div key={datas.id} className="allCards">
                    {dateChecker ? <div className="dateContainer" > {printDate}</div> : ""}
                    {datas.is_archived === false && datas.call_type === "missed" ? 
                        <Cards datas={datas} time={time} onDelete={onDelete}/>
                        : ""}
                </div>
            )
        });
        prevDate = "";

        //Creating the Call Cards of Inbox Cards.
        let inbox = this.state.calls.map(function (datas) {
            var date = new Date(datas.created_at);
            var printDate = date.getDay() + " " + date.toLocaleString('en', { month: 'long' }) + " " + date.getFullYear();
            var time = date.getHours() + ":" + date.getMinutes();

            if (printDate === prevDate) {
                dateChecker = false;
            } else if (datas.is_archived === false && datas.direction === "inbound") {
                dateChecker = true
                prevDate = printDate
            }
            else {
                dateChecker = false;
            }

            return (
                <div key={datas.id} className="allCards">
                    {dateChecker ? <div className="dateContainer" > {printDate}</div> : ""}
                    {datas.is_archived === false && datas.direction === "inbound"?
                        <Cards datas={datas} time={time} onDelete={onDelete}/>
                        : ""}
                </div>
            )
        });
        prevDate = "";

        //Creating the Call Cards of Outbox Cards.
        let outbox = this.state.calls.map(function (datas) {
            var date = new Date(datas.created_at);
            var printDate = date.getDay() + " " + date.toLocaleString('en', { month: 'long' }) + " " + date.getFullYear();
            var time = date.getHours() + ":" + date.getMinutes();

            if (printDate === prevDate) {
                dateChecker = false;
            } else if (datas.is_archived === false && datas.direction !== "inbound") {
                dateChecker = true
                prevDate = printDate
            }
            else {
                dateChecker = false;
            }

            return (
                <div key={datas.id} className="allCards">
                    {dateChecker ? <div className="dateContainer" > {printDate}</div> : ""}
                    {datas.is_archived === false && datas.direction !== "inbound" ?
                        <Cards datas={datas} time={time} onDelete={onDelete}/>
                        : ""}
                </div>
            )
        });


        return (
            <div className="calls" >
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
                        <div>{inbox}</div>
                        :
                        this.state.typeC === "all" ?
                            <div>{allCalls}</div>
                            :
                            this.state.typeC === "miss" ?
                            <div>{missed}</div>
                                :
                                <div>{outbox}</div>
                    }
                </div>

            </div >
        )
    }
}

export default Calls;

