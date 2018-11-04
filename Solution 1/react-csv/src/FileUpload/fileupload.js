import React, { Component } from 'react';
import config from '../config/config'
import axios from 'axios'
import swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import $ from 'jquery'
class FileUpload extends Component {
    style = {
        "background-color" : "transparent"
    }
    fileupload = (e) => {
        e.preventDefault()
        let formdata = new FormData(document.querySelector('form'));
        $('form')[0].reset()
        console.log(config)
        axios.post(config.url + "/upload", formdata)
            .then((res) => {
                console.log(res)
                swal(
                    'Good job!',
                    'File Upload was successfull',
                    'success'
                )
            }).catch(err => {
                console.log(err)
            })
    }


    render() {
        return (


            <div class="container h-100">
                <div class="row align-items-center h-100">
                    <div class="col-6 mx-auto">
                        <div class="jumbotron" style={this.style}>
                            <form className=" my-2 border border-white bg-light rounded" onSubmit={(e) => { this.fileupload(e) }} >
                                <div className="form-group  p-5">
                                    <h3>Upload File</h3>
                                    <input type="file" className="form-control-file" id="File" name="file" required />
                                    <button className="btn btn-primary mt-3" type="submit">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

export default FileUpload;
