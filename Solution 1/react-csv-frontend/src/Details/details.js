import React, { Component } from 'react';

import $ from 'jquery'
import axios from 'axios'
import config from '../config/config'
import swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
$.DataTable = require('datatables.net')


class DetailsPage extends Component {
    state = {
        table : ''
    }

    constructor(props){
        super(props)
        this.addData = this.addData.bind(this)
    }
    
    style = {
        width: '100%'
    }

    add = {
        'position': 'fixed',
        'bottom': '60px',
        'right': '60px',
        'width': '20px',
        'height': '20px',
        'cursor': 'pointer'
    }
    sample = [
        { "data": "Release Year", title: "Release Year" },
        { "data": "Title", title: "Title" },
        { "data": "Origin/Ethnicity", title: "Origin/Ethnicity" },
        { "data": "Director", title: "Director" },
        // { "data": "Cast", title: "Cast" },
        { "data": "Genre", title: "Genre" },
        {
            "className": "min_height",
            "targets": -1,
            "data": null,
            "defaultContent":
                '<a class="btn-view btn" > <i class="fas fa-eye"></i> </a>'
                + '<a class="btn-edit btn" > <i title="edit" class="fas fa-edit"></i> </a>'
                + '<a class="btn-delete btn"> <i title="edit" class="fas fa-trash"></i> </a>',
            title: "Action"
        }
    ]

    componentDidMount() {
        this.ReloadTableData() 
    }

    componentWillUnmount() {
       $('#DataTable').DataTable().destroy()
        // this.$el.DataTable.destroy(true)
     
    }

 
    ReloadTableData(){
        this.$el = $(this.el)
        let _this = this
        axios.get(config.url + '/data')
            .then(res => {
                console.log(res.data)
               
                _this.setState({ table: this.$el.DataTable({
                    data: res.data,
                    columns: this.sample
                    })
                })

                this.$el.on('click', 'tr', function (event) {
                    var data = _this.state.table.row(this).data();
                    if (event.target.className === "fas fa-eye") {
                        _this.viewData(data)
                        console.log(data)
                        
                    }
                    if (event.target.className === "fas fa-edit") {
                        _this.editData(data)
                        console.log(data)
                    }
                    if (event.target.className === "fas fa-trash") {
                        _this.deleteData(data)
                        console.log(data)
                    }

                });

            })

    }

    async viewData(data) {
        console.log(data['Plot'].length > 50 ? data['Plot'].slice(50) : data['Plot'])
        await swal({
            title: 'Details',
            html:
            `<table> <tr> <td> <b>Release Year:  </b> </td > <td>${data['Release Year']}</td> </tr>` +
            `<table> <tr> <td> <b>Title: </b> </td > <td>${data['Title']}</td> </tr>` +
            `<table> <tr> <td> <b>Origin/Ethnicity: </b> </td > <td>${data['Origin/Ethnicity']}</td> </tr>` +
            `<table> <tr> <td> <b>Director: </b> </td > <td>${data['Director']}</td> </tr>` +
            `<table> <tr> <td> <b>Cast: </b> </td > <td>${data['Cast']}</td> </tr>` +
            `<table> <tr> <td> <b>Genre: </b> </td > <td>${data['Genre']}</td> </tr>` +
            `<table> <tr> <td> <b>Wiki Page: </b> </td >  </tr>` +
            `<table> <tr><td>${data['Wiki Page']}</td> </tr>` +
            `<table> <tr> <td> <b>Plot:</b> </td ></tr>` +
            `<table> <tr> <td>${ data['Plot'].length > 50 ? data['Plot'].substring(0,50) : data['Plot']}</td> </tr>`,
            focusConfirm: false,
            preConfirm: () => {
              return;
            }
          })
          
    }

    async editData(data) {
        var _this = this
        await swal({
            title: 'Edit Details',
            html:
              `<form><input name="Release Year" id="swal-input1" value="${data['Release Year']}" class="swal2-input">` +
              `<input name="Title" id="swal-input2" value="${data['Title']}" class="swal2-input">` +
              `<input name="Origin/Ethnicity" id="swal-input2" value="${data['Origin/Ethnicity']}" class="swal2-input">` +
              `<input name="Director" id="swal-input2" value="${data['Director']}" class="swal2-input">` +
              `<input name="Cast" id="swal-input2" value="${data['Cast']}" class="swal2-input">` +
              `<input name="Genre" id="swal-input2" value="${data['Genre']}" class="swal2-input">` +
              `<input name="Wiki Page" id="swal-input2" value="${data['Wiki Page']}" class="swal2-input">` +
              `<textarea id="swal-input2" name="Plot" class="swal2-input">${data['Plot']}</textarea> </form>`
              ,
            focusConfirm: false,
            preConfirm: () => {
                let fd = new FormData(document.querySelector('form'))
                const datasend = {
                    "Release Year": fd.get('Release Year'),
                    "Title": fd.get("Title"),
                    "Origin/Ethnicity": fd.get("Origin/Ethnicity"),
                    "Director": fd.get("Director"),
                    "Cast": fd.get("Cast"),
                    "Genre": fd.get("Genre"),
                    "Wiki Page": fd.get("Wiki Page"),
                    "Plot": fd.get("Plot")
                }
                axios.put(config.url + `/data/${data['_id']['$oid']}`, datasend ).then( res => {
                   let table = $('#DataTable').DataTable()
                   table.clear()
                   table.destroy()
                   _this.ReloadTableData()

                    return swal(
                        'Good job!',
                        'Record updated successfully',
                        'success'
                        )
                    })
                    .catch(err => {
                        return swal(
                            'Try Again!',
                            'Cannot update the record',
                            'error'
                            ) 
                    })
                }
            })
          
    }

    async deleteData (data) {
        let _this = this
        await swal({
            title: 'Attention!!!',
            html:
             `<table> <tr> <td> <b>Release Year:  </b> </td > <td>${data['Release Year']}</td> </tr>` +
            `<table> <tr> <td> <b>Title: </b> </td > <td>${data['Title']}</td> </tr>` +
            `<table> <tr> <td> <b>Origin/Ethnicity: </b> </td > <td>${data['Origin/Ethnicity']}</td> </tr>` +
            `<table> <tr> <td> <b>Director: </b> </td > <td>${data['Director']}</td> </tr>` +
            `<table> <tr> <td> <b>Cast: </b> </td > <td>${data['Cast']}</td> </tr>` +
            `<table> <tr> <td> <b>Genre: </b> </td > <td>${data['Genre']}</td> </tr>` +
            `<table> <tr> <td> <b>Wiki Page: </b> </td >  </tr>` +
            `<table> <tr><td>${data['Wiki Page']}</td> </tr>` +
            `<table> <tr> <td> <b>Plot:</b> </td ></tr>` +
            `<table> <tr> <td>${ data['Plot'].length > 50 ? data['Plot'].substring(0,50) : data['Plot']}</td> </tr>`,
            focusConfirm: false,
            confirmButtonText: 'Yes, Delete it',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            preConfirm: () => {
                axios.delete(config.url + `/data/${data['_id']['$oid']}`).then( res => {
                    let table = $('#DataTable').DataTable()
                    table.clear()
                    table.destroy()
                    _this.ReloadTableData()

                    return swal(
                        'Success!',
                        'Record Deleted successfully',
                        'success'
                        )
                    })
                    .catch(err => {
                        return swal(
                            'Try Again!',
                            'Cannot update the record',
                            'error'
                            ) 
                    })
            }
          })

    }

    async addData(){
        var _this = this
        await swal({
            title: 'Edit Details',
            html:
              `<form><input name="Release Year"  placeholder="Enter Release Year"  id="swal-input1"  class="swal2-input">` +
              `<input name="Title"  placeholder="Enter Title"  id="swal-input2"  class="swal2-input">` +
              `<input name="Origin/Ethnicity"  placeholder="Enter Origin/Ethnicity"  id="swal-input2"  class="swal2-input">` +
              `<input name="Director"  placeholder="Enter Director"  id="swal-input2"  class="swal2-input">` +
              `<input name="Cast"  placeholder="Enter Cast"  id="swal-input2"  class="swal2-input">` +
              `<input name="Genre"  placeholder="Enter Genre"  id="swal-input2"  class="swal2-input">` +
              `<input name="Wiki Page"  placeholder="Enter Wiki Page"  id="swal-input2"  class="swal2-input">` +
              `<label>Enter Plot</label>`+
              `<textarea id="swal-input2" name="Plot" class="swal2-input"></textarea> </form>`
              ,
            focusConfirm: false,
            preConfirm: () => {
                let fd = new FormData(document.querySelector('form'))
                const datasend = {
                    "Release Year": fd.get('Release Year'),
                    "Title": fd.get("Title"),
                    "Origin/Ethnicity": fd.get("Origin/Ethnicity"),
                    "Director": fd.get("Director"),
                    "Cast": fd.get("Cast"),
                    "Genre": fd.get("Genre"),
                    "Wiki Page": fd.get("Wiki Page"),
                    "Plot": fd.get("Plot")
                }
                axios.post(config.url + `/data`, datasend ).then( res => {
                   let table = $('#DataTable').DataTable()
                   table.clear()
                   table.destroy()
                   _this.ReloadTableData()

                    return swal(
                        'Good job!',
                        'Record inserted successfully',
                        'success'
                        )
                    })
                    .catch(err => {
                        return swal(
                            'Try Again!',
                            'Cannot insert the record',
                            'error'
                            ) 
                    })
                }
            })
          
    }


    render() {
        return (
            <div className="container p-3">
                <table id="DataTable" className="table table-striped table-bordered" style={this.style}
                    ref={el => this.el = el}></table>
                    <a style={this.add} onClick={this.addData} ><i class="fas fa-plus-circle fa-4x"   ></i></a>
            </div>
        );
    }
}

export default DetailsPage;
