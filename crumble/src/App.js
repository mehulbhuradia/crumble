import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Crumble from './Crumble';
import ShareView from './ShareView.js';

function App() {
  return (
    <Router>
      <Route path="/" exact component={Crumble} />
      <Route path="/website/:uuid" component={ShareView} />
    </Router>
  );
}

export default App;