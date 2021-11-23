import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './Header.jsx';
import BottomNav from './BottomNav.jsx';
import Calls from './Components/Calls.jsx';
import Archive from './Components/Archive.jsx';
import DetailedCall from './Components/DetailedCall.jsx'

class App extends Component {
  constructor() {
    super()
    this.state =
    {
      mount: false,
    }
  }

  componentDidMount() {
    this.setState(state => ({
      mount: true,
    }));
  }

  //Router and Routes
  render() {
    return (
      <Router>
        <div className="container">
          <Header />
          <div className="container-view">
            <Routes>
              <Route path="/" element={<Calls />} />
              <Route path="/archive" element={<Archive />} />
              <Route path="/call/:id" element={<DetailedCall />} />
            </Routes>
          </div>
          <BottomNav />
        </div>
      </Router>
    )
  }
}

export default App;