import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import Card from 'react-bootstrap/Card'

import VoicemailIcon from '@mui/icons-material/Voicemail';
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';

class ArchiveCards extends Component {
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
            data: JSON.stringify({ is_archived: false })
        })
            .then(() => {
                this.props.datas.remove(id)
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

            if(printDate === prevDate) {
                dateChecker = false;
            } else if(datas.is_archived === true){
                dateChecker = true
                prevDate = printDate
            }
            else {
                dateChecker = false;
            }

            return (
                <div key={datas.id} className="allCards">

                    {dateChecker ? <div className = "dateContainer" > {printDate}</div> : ""}
                    {datas.is_archived === true ?
                        datas.direction === "inbound" ?
                            <div className="inboxCard">
                                <Card style={{ border: '1px solid #0f8b47' }}>
                                    <Link style={{ all: "unset", cursor: "pointer", display: "flex" }} className="callIndividual" to={'/call/' + datas.id}  >
                                    <div className="callIndividual">
                                            {datas.call_type === "answered" ? <PhoneCallbackIcon style={{ color: 'green', height: 'auto', width: '25px' }} /> : <VoicemailIcon style={{ color: 'green', height: 'auto', width: '25px' }} />}
                                            <p style = {{color: "#0f8b47"}}>{time}</p>
                                        </div>
                                        <Card.Body style={{ width: "250px", maxWidth: '250px' }}>
                                            <Card.Title style={{ fontSize: "1.1rem" }}>{datas.from}</Card.Title>
                                            {datas.to === null ? "" :
                                                <Card.Text>
                                                    Call from {datas.to}
                                                </Card.Text>
                                            }
                                        </Card.Body>
                                    </Link>
                                    <button style={{ all: 'unset', cursor: 'pointer', textAlign: 'center', fontSize: "0.7rem", paddingLeft: "0.8rem" }} onClick={() => { this.archive(datas.id); this.props.onDelete(datas.id) }}><UnarchiveIcon  style = {{width: "20px"}}/> <div>Un-Archive</div></button>
                                </Card>
                            </div>
                            :
                            <div className="inboxCard">
                                <Card style={{ border: '1px solid #fda500'  }}>
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
                                    <button style={{ all: 'unset', cursor: 'pointer', textAlign: 'center', fontSize: "0.7rem", paddingLeft: "0.8rem" }} onClick={() => { this.archive(datas.id); this.props.onDelete(datas.id) }}><UnarchiveIcon  style = {{width: "20px"}}/> <div>Un-Archive</div></button>
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
export default ArchiveCards;