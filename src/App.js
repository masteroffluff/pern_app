import React from "react";
import {
  Route,
  BrowserRouter,
  Routes
} from "react-router-dom";
//import './reset.css'
import './App.css';
import AppLayout from './AppLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}> {/* container for app */}
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
