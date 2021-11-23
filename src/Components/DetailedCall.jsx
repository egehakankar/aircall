import React, { Component } from 'react'
import axios from 'axios';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import Card from 'react-bootstrap/Card'

import Cards from './Calls/Cards.jsx';

import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
class DetailedCall extends Component {

    constructor() {
        super()
        this.state =
        {
            to: "",
            from: "",
            id: 0,
            data: [],
            data2: [],
        }
        this.getCall = this.getCall.bind(this)
        this.getCalls = this.getCalls.bind(this);
        this.delA = this.delA.bind(this);
    }

    componentDidMount() {
        var al = window.location.pathname.split("/");
        this.setState({ id: al[2] }, () => {
            this.getCall()
        });
    }



    getCall() {
        const API_PATH = 'https://aircall-job.herokuapp.com/activities/' + this.state.id;
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
                this.setState({ data: result.data, to: result.data.to, from: result.data.from }, () => {
                    this.getCalls();
                });
            })
            .catch(error => this.setState({ error: error.message }));

    }

    getCalls() {
        const API_PATH = 'https://aircall-job.herokuapp.com/activities/';
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
                this.setState({ data2: result.data.filter(calls => calls.to === (this.state.to) || calls.to === (this.state.from) || calls.from === (this.state.from) || calls.from === (this.state.to)) }, () => {
                });

            })
            .catch(error => this.setState({ error: error.message }));
    }

    delA(id) {
        const index = this.state.data2.findIndex(emp => emp.id === id),
            data2 = [...this.state.data2] // important to create a copy, otherwise you'll modify state outside of setState call
        data2[index].is_archived = !data2[index].is_archived;
        this.setState({ data2 });

    }



    render() {
        this.state.data2.sort(function compare(a, b) {
            var dateA = new Date(a.created_at)
            var dateB = new Date(b.created_at)
            return dateB - dateA;
        });
        var prevDate = "";
        var dateChecker = false;
        var onDelete = this.delA;

        let allCalls = this.state.data2.map(function (datas) {
            var date = new Date(datas.created_at);
            var printDate = date.getDay() + " " + date.toLocaleString('en', { month: 'long' }) + " " + date.getFullYear();
            var time = date.getHours() + ":" + date.getMinutes();

            if (printDate === prevDate) {
                dateChecker = false;
            } else {
                dateChecker = true
                prevDate = printDate
            }

            return (
                <div key={datas.id} className="allCards">
                    {dateChecker ? <div className="dateContainer" > {printDate}</div> : ""}
                    <Cards datas={datas} time={time} onDelete={onDelete} />
                </div>
            )
        });


        return (
            <div className="detCall">
                {this.state.data.direction === "inbound" ?
                    <div className="name">
                        <Card className="text-center detCall" >
                            <div className="titleAndNumber">
                                <div className="nameDet">

                                    {this.state.data.from === null ? <div>Unknown</div> :
                                        <Avatar sx={{ bgcolor: "#c68621" }}>{this.state.data.to ? this.state.data.to.substr(0, 1) : ""}</Avatar>}
                                    <div className="fullName">
                                        {this.state.data.to ? <div>{this.state.data.to}</div> : "Unknown"}
                                    </div>
                                </div>                                <Card.Body style={{ marginLeft: "-2px" }}>
                                    <Card.Title>
                                        {this.state.data.from === null ? <div>Unknown</div> : this.state.data.from}
                                    </Card.Title>
                                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                        <Button className = "callButtons" style={{ borderColor: "darkgrey" }} variant="contained" color="success">Call</Button>
                                        <Button className = "callButtons" style={{ backgroundColor: "#2a9158", borderColor: "darkgrey" }}>Video Call</Button>
                                        <Button className = "callButtons" style={{ backgroundColor: "#c78522", borderColor: "darkgrey" }}>Message</Button>

                                    </ButtonGroup>

                                </Card.Body>
                            </div>
                            <div className="callContainer" style={{ paddingTop: "5px", width: "352px", borderTop: "1px solid darkgray", marginTop: "10px", textAlign: "left", marginLeft: "-5px" }}>
                                {allCalls}
                            </div>
                        </Card>
                    </div>
                    :
                    <div className="name">
                        <Card className="text-center detCall" >
                            <div className="titleAndNumber">
                                <div className="nameDet">

                                    {this.state.data.from === null ? <div>Unknown</div> :
                                        <Avatar sx={{ bgcolor: "#c68621" }}>{this.state.data.from ? this.state.data.from.substr(0, 1) : ""}</Avatar>}
                                    <div className="fullName">
                                        {this.state.data.from ? <div>{this.state.data.from}</div> : "Unknown"}
                                    </div>
                                </div>
                                <Card.Body style={{ marginLeft: "-2px" }}>
                                    <Card.Title>
                                        {this.state.data.ro === null ? <div>Unknown</div> : this.state.data.to}
                                    </Card.Title>
                                    <ButtonGroup variant="contained" aria-label="outlined primary button group">

                                        <Button className = "callButtons" style={{ borderColor: "darkgrey" }} variant="contained" color="success">Call</Button>
                                        <Button className = "callButtons" style={{ backgroundColor: "#2a9158", borderColor: "darkgrey" }}>Video Call</Button>
                                        <Button className = "callButtons" style={{ backgroundColor: "#c78522", borderColor: "darkgrey" }}>Message</Button>
                                    
                                    </ButtonGroup>

                                </Card.Body>
                            </div>
                            <div className="callContainer" style={{ paddingTop: "5px", width: "352px", borderTop: "1px solid darkgray", marginTop: "10px", textAlign: "left", marginLeft: "-5px" }}>
                                {allCalls}
                            </div>
                        </Card>
                    </div>
                }
            </div>
        )
    }
}

export default DetailedCall;