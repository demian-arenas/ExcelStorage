import React, { Component } from 'react'
import axios from "axios";
import { docsRef, firebaseStorage } from "../../config/constants";

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre"
];

const now = new Date();
const years = [];
for ( let thisYear = now.getFullYear(); thisYear <= now.getFullYear() + 10; thisYear++ ) {
  years.push(thisYear);
} 

export default class SearchFile extends Component {
  constructor () {
    super()
    this.state = { month: 0, year: 2017, files: [] };
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.handleButtonDelete = this.handleButtonDelete.bind(this);
    this.handleChangeSelectYear = this.handleChangeSelectYear.bind(this);
    this.searchFiles = this.searchFiles.bind(this);
    this.getFile = this.getFile.bind(this);
  }

  componentDidMount () {
    const _this = this;
    const leadsRef = docsRef.ref("docs");
    leadsRef.on("value", function(snapshot) {
      const items = [];
      _this.setState({ files: [] })
      snapshot.forEach(function(childSnapshot) {
        const newItem = { key: childSnapshot.key, ...childSnapshot.val() }
        items.push(newItem);
        _this.setState({ files: items });
        _this.searchFiles()
      });
    });
  }

  handleChangeSelect(event) {
    this.setState({ month: event.target.value });
  }
  handleChangeSelectYear(event) {
    this.setState({ year: event.target.value });
  }

  searchFiles() {
    const body = document.getElementById("TableBodyFiles");
    body.remove();
    const table = document.getElementById("TableBody");
    const newBody = document.createElement("tbody");
    newBody.id = "TableBodyFiles";
    table.appendChild(newBody);
    const dateSelected = `${this.state.month}${this.state.year}`;
    const files = this.state.files.filter(file => {
      return file.createdAt === dateSelected;
    });
    if (files.length !== 0) this.setTable(files);
    return 0;
  }

  handleButtonDelete (event) {
    const _this =  this
    firebaseStorage.ref().child(event.target.name).delete().then((response) => {
      docsRef.ref('docs').child(event.target.value).remove()
      _this.searchFiles();
    }).catch((error) => console.log(error))
  }

  setTable(files) {
    const body = document.getElementById("TableBodyFiles");
    files.forEach(async file => {
      const row = body.insertRow();
      const name = row.insertCell(0);
      const url = row.insertCell(1);
      const deleteFile = row.insertCell(2);
      name.innerHTML = file.name;

      const buttonDeleteFile = document.createElement('button')
      buttonDeleteFile.id = 'DeleteFile'
      buttonDeleteFile.value = file.key
      buttonDeleteFile.name = file.path
      buttonDeleteFile.textContent = 'Borrar'
      buttonDeleteFile.onclick = this.handleButtonDelete;
      deleteFile.appendChild(buttonDeleteFile)

      const blob = await this.getFile(file.url)
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = file.name;
      link.text = "Descargar";
      url.appendChild(link);
    });
  }

  async getFile (url) {
    const response = await axios({ method: "get", url: url, responseType: "blob" })
    .catch(function(error) {
      console.log(error);
    });
    return response.data
  }
  render () {
    return <div id="SearchFile">
        <div id='SearchFileSelect'>
          <div id="SearchFileGroup">
            <label htmlFor="SearchFileMonth">Mes</label>
            <select id="SearchFileMonth" value={this.state.month} onChange={this.handleChangeSelect}>
              {months.map((value, index) => {
                return <option value={index} key={index}>
                    {`${value}`}
                  </option>;
              })}
            </select>
          </div>
          <div id="SearchFileGroup">
            <label htmlFor="SearchFileYear">Año</label>
            <select id="SearchFileYear" value={this.state.year} onChange={this.handleChangeSelectYear}>
              {years.map(value => {
                return <option value={value} key={value}>
                    {`${value}`}
                  </option>;
              })}
            </select>
          </div>
        </div>
        <button onClick={this.searchFiles}>Buscar</button>
      </div>;
  }
}