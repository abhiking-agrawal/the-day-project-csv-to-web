import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Navbar from "../Navbar/navbar";
import FileUploadPage from "../FileUpload/fileupload";
import DetailsPage from "../Details/details";

class Layout extends Component {


    render() {
        return (
            <div className="Layout">
                <Navbar></Navbar>
                <Switch>
                    <Route path="/" exact component={DetailsPage} />
                    <Route path="/upload" component={FileUploadPage} />
                </Switch>
            </div>
        );
    }
}

export default Layout;
