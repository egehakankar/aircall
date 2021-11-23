import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';


import Card from 'react-bootstrap/Card'

import VoicemailIcon from '@mui/icons-material/Voicemail';
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';
import SendAndArchiveIcon from '@mui/icons-material/SendAndArchive';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import UnarchiveIcon from '@mui/icons-material/Unarchive';

class Cards extends Component {
    constructor() {
        super()
        this.state =
        {
        }
        this.archive = this.archive.bind(this);
        this.unarchive = this.unarchive.bind(this);
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
            .then(() => {
            })
            .catch(error => this.setState({ error: error.message }));
    }

    unarchive(id) {
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
            })
            .catch(error => this.setState({ error: error.message }));
    }

    render() {
        const datas = this.props.datas;
        const archiveOrNot = datas.is_archived;

        return (
            <div>
                {datas.direction === "inbound" ?
                    <div className="inboxCard">
                        <Card className = "carCall" style={{ border: '1px solid #0f8b47' }}>
                            <Link style={{ all: "unset", cursor: "pointer", display: "flex" }} className="callIndividual" to={'/call/' + datas.id}  >
                                <div className="callIndividual">
                                    {datas.call_type === "answered" ? <PhoneCallbackIcon style={{ color: 'green', height: 'auto', width: '25px' }} /> : <VoicemailIcon style={{ color: 'green', height: 'auto', width: '25px' }} />}
                                    <p style={{ color: "#0f8b47" }}>{this.props.time}</p>
                                </div>
                                <Card.Body className = "cardBody" style={{ width: "250px", maxWidth: '250px' }}>
                                    <div className="numberName">
                                        <Card.Title style={{ fontSize: "1.1rem" }}>{datas.from}</Card.Title>
                                        {datas.to === null ? "" :
                                            <Card.Text>
                                                Call from {datas.to}
                                            </Card.Text>
                                        }
                                    </div>
                                    <div className="duration"><div className="durText">0{datas.duration / 60}:0{datas.duration % 60}:00</div></div>
                                </Card.Body>
                            </Link>
                            {
                                archiveOrNot ? <button style={{ all: 'unset', cursor: 'pointer', textAlign: 'center', fontSize: "0.7rem", paddingLeft: "0.8rem" }} onClick={() => { this.unarchive(datas.id); this.props.onDelete(datas.id) }}><UnarchiveIcon style={{ width: "20px" }} /> <div>Un-Archive</div></button>
                                    :
                                    <button style={{ all: 'unset', cursor: 'pointer', textAlign: 'center', fontSize: "0.7rem", paddingLeft: "0.8rem" }} onClick={() => { this.archive(datas.id); this.props.onDelete(datas.id) }}><SendAndArchiveIcon style={{ width: "20px" }} /> <div>Archive</div></button>
                            }
                        </Card>
                    </div>
                    :
                    <div className="inboxCard">
                        <Card className = "carCall"style={{ border: '1px solid #fda500' }}>
                            <Link style={{ all: "unset", cursor: "pointer", display: "flex" }} className="callIndividual" to={'/call/' + datas.id}  >
                                <div className="callIndividual">
                                    <PhoneForwardedIcon style={{ color: 'orange', height: 'auto', width: '25px' }} />
                                    <p style={{ color: "orange" }}>{this.props.time}</p>
                                </div>
                                <Card.Body className = "cardBody" style={{ width: "250px", maxWidth: '250px' }}>
                                <div className="numberName">
                                    <Card.Title style={{ fontSize: "1.1rem" }}>{datas.to}</Card.Title>
                                    {datas.from === null ? "" :
                                        <Card.Text>
                                            Call to {datas.from}
                                        </Card.Text>
                                    }
                                    </div>
                                    <div className="duration"><div className="durText">0{datas.duration / 60}:0{datas.duration % 60}:00</div></div>
                                </Card.Body>
                            </Link>
                            {
                                archiveOrNot ? <button style={{ all: 'unset', cursor: 'pointer', textAlign: 'center', fontSize: "0.7rem", paddingLeft: "0.8rem" }} onClick={() => { this.unarchive(datas.id); this.props.onDelete(datas.id) }}><UnarchiveIcon style={{ width: "20px" }} /> <div>Un-Archive</div></button>
                                    :
                                    <button style={{ all: 'unset', cursor: 'pointer', textAlign: 'center', fontSize: "0.7rem", paddingLeft: "0.8rem" }} onClick={() => { this.archive(datas.id); this.props.onDelete(datas.id) }}><SendAndArchiveIcon style={{ width: "20px" }} /> <div>Archive</div></button>
                            }

                        </Card>
                    </div>
                }
            </div>
        )

    }
}
export default Cards;