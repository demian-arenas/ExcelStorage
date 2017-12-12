import React, { Component } from 'react'
import './Dashboard.css'
import FileUpload from './FileUpload'
import SearchFile from "./SearchFIle";
import TableFile from "./TableFile";
export default class Dashboard extends Component {
  render () {
    return <div id="Dashboard">
        <div id="DashboardContainer">
          <FileUpload />
          <SearchFile />
        </div>
        <TableFile />
      </div>;
  }
}