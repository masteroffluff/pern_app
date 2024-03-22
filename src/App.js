import React from "react";
import {
  Route,
  BrowserRouter,
  Routes
} from "react-router-dom";
//import './reset.css'
import './App.css';
import AppLayout from './AppLayout';
import {UserLogin, UserDisplay} from './components/user'
import {NewNote, NewTodo} from './components/items'
import { NewAppointment, NewEvent, NewReminder } from "./components/calandar";
import MainDisplay from "./components/mainPage/MainDisplay";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}> {/* container for app */}
          <Route path="/" element={<MainDisplay />}>
            <Route path="/newnote" element={<NewNote />}/>
            <Route path="/newtodo" element={<NewTodo />}/>
            <Route path="/newAppointment" element={<NewAppointment />}/>
            <Route path="/newEvent" element={<NewEvent />}/>
            <Route path="/newReminder" element={<NewReminder />}/>
          </Route>
          <Route path="/userdetails" element={<UserDisplay />}/>
        </Route>
        
        <Route path="/login" element={<UserLogin />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
