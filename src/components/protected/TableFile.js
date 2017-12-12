import React, { Component } from 'react'

export default class TableFile extends Component {
  render () {
    return <div>
        <table id="Table">
          <thead id="TableHead" style={{textAlign: 'justify'}}>
            <tr>
              <th>Nombre</th>
              <th>Descargar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
        </table>
        <div id="Table">
          <table id="TableBody">
            <tbody id="TableBodyFiles" />
          </table>
        </div>
      </div>;
  }
}