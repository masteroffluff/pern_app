import React from "react";
import {
  Route,
  BrowserRouter,
  Routes
} from "react-router-dom";
//import './reset.css'
import './App.css';
import AppLayout from './AppLayout';
import {UserLogin, UserDisplay, AddFriend} from './components/user'
import {DeleteNote, NewNote, NewTodo, UpdateNote} from './components/items'
import { NewAppointment, NewEvent, NewReminder, DeleteCalendarItem } from "./components/calandar";
import MainDisplay from "./components/mainPage/MainDisplay";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}> {/* container for app */}
          <Route path="/main" element={<MainDisplay />}>
            {/* popups */}
            <Route path="newnote" element={<NewNote />}/>
            <Route path="newtodo" element={<NewTodo />}/>
            <Route path="newAppointment" element={<NewAppointment />}/>
            <Route path="newEvent" element={<NewEvent />}/>
            <Route path="newReminder" element={<NewReminder />}/>
            <Route path="deletenote" element={<DeleteNote />} />
            <Route path="updatenote" element={<UpdateNote />} />
            <Route path="deletecalendar" element={<DeleteCalendarItem />} />
          </Route>
          <Route path="/userdetails" element={<UserDisplay />}>
            <Route path="addfriend" element={<AddFriend />}/>
          </Route>
        </Route>
        
        <Route path="/login" element={<UserLogin />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
