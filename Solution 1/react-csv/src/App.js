import React, { Component } from 'react';
import Layout from "./Layout/layout";
import { HashRouter } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <HashRouter>
      <Layout></Layout>
      </HashRouter>
    );
  }
}


export default App;
