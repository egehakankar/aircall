import React, { Component } from 'react'
import axios from 'axios';

import Card from 'react-bootstrap/Card'

class DetailedCall extends Component {

    constructor() {
        super()
        this.state =
        {
            id: 0,
            data: [],
            data2: [],
        }
        this.getCall = this.getCall.bind(this);
    }

    componentDidMount() {
        var al = window.location.pathname.split("/");
        this.setState({ id: al[2] }, () => {
            this.getCall();
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
                this.setState({ data: result.data });
            })
            .catch(error => this.setState({ error: error.message }));
    }



    render() {
        return (
            <div className="detCall">
                {this.state.data.direction === "inbound" ?
                    <div className="name">
                        <Card className="text-center detCall" >
                            <Card.Header>{this.state.data.to === null ? <div>Unknown</div> : this.state.data.to}</Card.Header>
                            <Card.Body>
                                <Card.Title>
                                    {this.state.data.from === null ? <div>Unknown</div> : this.state.data.from}
                                </Card.Title>
                                <Card.Text>
                                    Call took {this.state.data.duration / 60} minutes {this.state.data.duration % 60} seconds.
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer className="text-muted"><div>{this.state.data.created_at.substring(11,16)}</div><div>{this.state.data.created_at.substring(0,10)}</div></Card.Footer>
                        </Card>
                    </div>
                    :
                    <div className="name">
                        <Card className="text-center detCall" >
                            <Card.Header>{this.state.data.from === null ? <div>Unknown</div> : this.state.data.from}</Card.Header>
                            <Card.Body>
                                <Card.Title>
                                    {this.state.data.ro === null ? <div>Unknown</div> : this.state.data.to}
                                </Card.Title>
                                <Card.Text>
                                    Call took {this.state.data.duration / 60} minutes {this.state.data.duration % 60} seconds.
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer className="text-muted">{this.state.data.created_at ? <div><div>{this.state.data.created_at.substring(11,16)}</div><div>{this.state.data.created_at.substring(0,10)}</div></div> : ""}</Card.Footer>
                        </Card>
                    </div>
                }
            </div>
        )
    }
}

export default DetailedCall;