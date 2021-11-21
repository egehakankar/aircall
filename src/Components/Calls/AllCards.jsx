import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';


import Card from 'react-bootstrap/Card'

import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';
import SendAndArchiveIcon from '@mui/icons-material/SendAndArchive';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';

class AllCards extends Component {
    constructor() {
        super()
        this.state =
        {
        }
        this.archive = this.archive.bind(this);
    }

    archive(id) {
        console.log(id);
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
        let calls = this.props.datas.map(function (datas) {
            return (
                <div key={datas.id} className="allCards">
                    {datas.is_archived === false ?
                        datas.direction === "inbound" ?
                            <div className="inboxCard">
                                <Card style={{ border: '1px solid #0f8b47' }}>
                                    <Link style={{ all: "unset", cursor: "pointer", display: "flex" }} className="callIndividual" to={'/call/' + datas.id}  >
                                        <PhoneCallbackIcon style={{ color: 'green', height: 'auto', width: '35px' }} />
                                        <Card.Body style={{ width: "250px", maxWidth: '250px'}}>
                                            <Card.Title style={{ fontSize: "1.1rem" }}>{datas.from}</Card.Title>
                                            <Card.Text> 
                                            {datas.to === null ? "" : <div>Call from {datas.to}</div>}
                                            </Card.Text>
                                        </Card.Body>
                                    </Link>
                                    <button style={{  all: 'unset', cursor: 'pointer', textAlign: 'center', }} onClick={() => { this.archive(datas.id); this.props.onDelete(datas.id) }}><SendAndArchiveIcon /> <div>Archive</div></button>
                                </Card>
                            </div>
                            :
                            <div className="inboxCard">
                            <Card style={{ border: '1px solid #fda500' }}>
                                <Link style={{ all: "unset", cursor: "pointer", display: "flex" }} className="callIndividual" to={'/call/' + datas.id}  >
                                    <PhoneForwardedIcon style={{ color: 'orange', height: 'auto', width: '35px' }} />
                                    <Card.Body style={{ width: "250px", maxWidth: '250px'}}>
                                        <Card.Title style = {{fontSize: "1.1rem"}}>{datas.to}</Card.Title>
                                        <Card.Text>
                                        {datas.from === null ? "" : <div>Call to {datas.from}</div>}
                                        </Card.Text>
                                    </Card.Body>
                                </Link>
                                <button style={{  all: 'unset', cursor: 'pointer', textAlign: 'center', }} onClick={() => { this.archive(datas.id); this.props.onDelete(datas.id) }}><SendAndArchiveIcon /> <div>Archive</div></button>
                            </Card>
                        </div>
                        :
                        ""
                    }
                </div>
            )
        }, this).reverse();
        return (
            <div>
                {calls}
            </div>
        );
    }

}
export default AllCards;