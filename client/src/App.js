import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CardComp from './components/CardComp';
import NewVideo from './components/NewVideo';
import Editor from './components/Editor';

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/' exact>
            <CardComp />
          </Route>
          {/* <Route path='/:id'>
            
                <NewVideo/>
            
          </Route> */}
          <Route path='/:id' exact>
            <div className='all-content video-editor'>
              <div className='main-column1 editorr'>
                <Editor />
              </div>
              <div className='main-column2 newvideo'>
                <NewVideo />
              </div>
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

// PREVIOUSLY HOSTED APP.CSS

// import React from "react";
// import "./App.css";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Editor from "./components/Editor";
// import NewVideo from "./components/NewVideo";
// import CardComp from "./components/CardComp";

// function App() {
//   return (
//     <div className='App'>
//       <p>Hello</p>
//       <Router>
//         <Switch>
//           <Route path='/' exact>
//             <CardComp />
//           </Route>
//           <Route path='/:id'>
//             <div className='video-editor'>
//               <div className='editor'>
//                 <Editor />
//               </div>
//               <div className='newvideo'>
//                 <NewVideo />
//               </div>
//             </div>
//           </Route>
//         </Switch>
//       </Router>
//     </div>
//   );
// }

// export default App;
