import React, { Component } from 'react'
import axios from 'axios';

import ArchiveCards from './Archive/ArchiveCards.jsx';


class Archive extends Component {

    constructor() {
        super()
        this.state =
        {
            calls: [],
        }
        this.getCalls = this.getCalls.bind(this);
        this.delA = this.delA.bind(this);
    }

    componentDidMount() {
        this.getCalls()
    }

    delA(id) {
        const calls = this.state.calls.filter(calls => calls.id !== id);
        this.setState({ calls: calls });
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
            })
            .catch(error => this.setState({ error: error.message }));
    }


    render() {
        return (
            <div className="archiveContainer">
                    <ArchiveCards onDelete = {this.delA} datas={this.state.calls} />
            </div>
        )
    }
}

export default Archive;

