import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './rrStyle.scss'
import './style.scss'
import WanWhere from './WanWhere'
import { BrowserRouter as Router } from "react-router-dom"
import Footer from './component/Footer'

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <Router>
      <WanWhere />
      <Footer />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)

