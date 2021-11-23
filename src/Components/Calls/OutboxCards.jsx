import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';


import Card from 'react-bootstrap/Card'

import SendAndArchiveIcon from '@mui/icons-material/SendAndArchive';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';

class OutboxCards extends Component {
    constructor() {
        super()
        this.state =
        {
        }
        this.archive = this.archive.bind(this);
    }

    archive(id) {
        const API_PATH = 'https://aircall-job.herokuapp.com/activities/' + id;
        axios({
            method: 'POST',
            url: `${API_PATH}`,
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            data: JSON.stringify({ is_archived: true })
        })
            .then(result => {
            })
            .catch(error => this.setState({ error: error.message }));
    }

    render() {
        this.props.datas.sort(function compare(a, b) {
            var dateA = new Date(a.created_at)
            var dateB = new Date(b.created_at)
            return dateB - dateA;
        });
        var prevDate = "";
        var dateChecker = false;

        let calls = this.props.datas.map(function (datas) {
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
                        <div className="inboxCard">
                            <Card style={{ border: '1px solid #fda500' }}>
                                <Link style={{ all: "unset", cursor: "pointer", display: "flex" }} className="callIndividual" to={'/call/' + datas.id}  >
                                    <div className="callIndividual">
                                        <PhoneForwardedIcon style={{ color: 'orange', height: 'auto', width: '25px' }} />
                                        <p style = {{color: "orange"}}>{time}</p>
                                    </div>


                                    <Card.Body style={{ width: "250px", maxWidth: '250px' }}>
                                        <Card.Title style={{ fontSize: "1.1rem" }}>{datas.to}</Card.Title>
                                        {datas.from === null ? "" :
                                            <Card.Text>
                                                Call to {datas.from}
                                            </Card.Text>
                                        }
                                    </Card.Body>
                                </Link>
                                <button style={{ all: 'unset', cursor: 'pointer', textAlign: 'center', fontSize: "0.7rem", paddingLeft: "0.8rem" }} onClick={() => { this.archive(datas.id); this.props.onDelete(datas.id) }}><SendAndArchiveIcon  style = {{width: "20px"}}/> <div>Archive</div></button>
                            </Card>
                        </div>
                        :
                        ""
                    }
                </div>
            )
        }, this);
        return (
            <div>
                {calls}
            </div>
        );
    }

}
export default OutboxCards;