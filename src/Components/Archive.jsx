import React, { Component } from 'react'
import axios from 'axios';

import Cards from './Calls/Cards.jsx';

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
        this.state.calls.sort(function compare(a, b) {
            var dateA = new Date(a.created_at)
            var dateB = new Date(b.created_at)
            return dateB - dateA;
        });
        var prevDate = "";
        var dateChecker = false;
        var onDelete = this.delA;

        let archivedCalls = this.state.calls.map(function (datas) {
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
                    {dateChecker ? <div className="dateContainer" > {printDate}</div> : ""}
                    {datas.is_archived === true ?
                        <Cards datas={datas} time={time} onDelete={onDelete}/>
                        : ""}
                </div>
            )
        });

        return (
            <div className="archiveContainer">
                {archivedCalls}
            </div>
        )
    }
}

export default Archive;

