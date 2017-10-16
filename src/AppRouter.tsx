import * as React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import MainContainer from './containers/MainContainer';


const AppRouter = () => (
  <MainContainer/>
  // <Router>
  //   <div>
  //     <ul>
  //       <li><Link to="/">Main</Link></li>
  //     </ul>

  //     <hr/>

  //     <Route exact path="/" component={MainContainer}/>
  //   </div>
  // </Router>
)

export default AppRouter