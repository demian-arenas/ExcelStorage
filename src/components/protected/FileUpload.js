import React, { Component } from 'react'
import { uploadFile, saveFile } from '../../helpers/files'

class FileUpload extends Component {
  constructor() {
    super();
    this.state = { message: "Desea subir un archivo?" };
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(event) {
    const file = event.target.files[0];
    const storageRef = uploadFile(file.name);
    setTimeout(() => {
      this.setState({ message: `Desea subir un archivo?` });
    }, 10000);
    storageRef
      .put(file)
      .then(data => {
        saveFile(data.metadata);
        this.setState({
          message: `El archivo ${data.metadata.name} se ha subido exitosamente`
        });
      })
      .catch(error => {
        this.setState({
          message: `Hubo un problema al subir el archivo ${file.name}`
        });
        console.log(error);
      });
  }

  render() {
    return (
      <div id='FileUploadContainer'>
        <input style={{fontSize: '1em'}}type="file" onChange={this.handleOnChange} />
        <p>{this.state.message}</p>
      </div>
    );
  }
}

export default FileUpload
