import React from "react";
import {Reminder, Appointment, Event} from '../calandar'
import {Note} from '../items'
import { useSelector } from "react-redux";
import { selectUserID } from "../user/auth/userAuthSlice";



export default function DisplayItem({data}){
    const {id, type, title, value, owner_id:owner, date}=data
    const userID = useSelector(selectUserID)
    // eslint-disable-next-line eqeqeq
    const editable = owner == userID
    //console.log(owner +"+"+ userID)
    switch(type){
        case 'appointment':
            return <Appointment editable={editable} item={data}/>
        case 'reminder':
            return <Reminder editable={editable} item={data} />
        case 'event':
            return <Event editable={editable} item={data} />
        case 'note':
        case 'notification':
            return <Note type={type} editable={editable} id={id} title={title} value={value} date={date} owner={owner} />
        default:
            return <><p>{type}</p></>
    }
}