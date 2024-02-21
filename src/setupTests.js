// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Component List and tests
// appLayout 
// - contains DisplayToday
// - constins DisplayTodo
// - constins DisplayWall
// - constins DisplayNotes
// - constins DisplayCalendar

// DisplayToday
// - has title "today"
// - contains mocked Appointment
// - contains mocked Event
// - contains mocked Reminder
// DisplayTodo
// - has title "To Do"
// - contains mocked Todo
// DisplayWall
// - has title "My Wall"
// - constains mocked Note from user
// - contains mocked item from freind
// - does not contain mocked item not from freind
// - contains add button that calls NewNote
// DisplayNotes
// - has title "My Notes"
// - contains mocked Note 
// DisplayCalendar
// - has title "Calendar"
// - shows dates
// - has date range selector
// - date range selector defaults to today and ends in a month
// - contains mocked appointment - for today
// - contains mocked event - for today
// - contains mocked reminder - for today
// - contains mocked appointment - for another day
// - contains mocked event - for another day
// - contains mocked reminder - for another day
// The following subcomponetsall thave the following tests
// - recive props correctly 
// - has textbox labelled "title"
// Appointment
// - has title - "Appointement"
// - has textbox labelled "start date"
// - has textbox labelled "end date"
// - has textbox labelled "place"
// Event
// - has title - "Event"
// - has textbox labelled "start date"
// - has textbox labelled "end date"
// - has textbox labelled "place"
// Reminder
// - has title - "Reminder"
// Note
// - has title - "Note"
// - has textbox labelled "notes" 
// Todo
// - has title - "Note"
// - has textbox labelled "notes" 
// - has list of TodoItem components
// TodoItem
// - has checkbox

// UserDetails
// - (all tests use a mocked user)
// - displays user display name
// - displays user phone number
// - displays user email
// UserFriends
// - has title "Friends"
// - (all tests use a mocked user and mocked friend)
// - displays freind
// - does not display stranger

// all components below heve these tests:
// - has textbox labelled "notes" 
// - state update for "notes"
// - has textbox labelled "title"
// - state update for "title"
// - has confirm button
// - has cancel button
// - cancel gracefully closes form
// NewNote
// - has title - "Note"
// - has button labelled "share"
// NewReminder
// - has title - "Reminder"
// - has button labelled "share"
// NewAppointment
// - has title - "Appointement"
// - has textbox labelled "start date"
// - has textbox labelled "end date"
// - has textbox labelled "place"
// - has a button marked "Invite attendees"
// - has textbox containing the list of attendees
// - if this appointment did not originate from user "confim and "cancel" are titled "Accept" and "Reject"
// NewEvent
// - has title - "Event"
// - has textbox labelled "start date"
// - has textbox labelled "end date"
// - has textbox labelled "place"

// Middleware routes to test mocked error responses and changes to the redux store
// Each route needs 2 tests 1 error one for mocked change to base state. 
// request route                       slicer          action
// post    /login                      userSlice       userLogin
// post    /register                   userSlice       userRegister
// post    /auth/[3rd party site]      userSlice       userAuth
// post    /callback/[3rd party site]  userSlice       userAuthCallback
// get     /user                       userSlice       userDetails
// update  /user                       userSlice       userUpdate  
// get     /user                       userSlice       userDetails
// update  /user                       userSlice       userUpdate 
// get     /userPfp                    userSlice       userDetails
// get     /friends                    friendsSlice    freindsList
// post    /friends                    friendsSlice    freindsCreate   
// update  /friends/confirm            friendsSlice    freindConfirm
// update  /friends/unfollow           friendsSlice    freindsUnfollow
// update  /friends/block              friendsSlice    freindsBlock
// get     /items                      itemsSlice      itemsFetch   
// get     /items/note                 itemsSlice      itemsNoteFetch   
// post    /items/note                 itemsSlice      itemsNoteCreate
// update  /items/note                 itemsSlice      itemsNoteUpdate
// delete  /items/note                 itemsSlice      itemsNoteDelete
// get     /items/todo                 itemsSlice      itemsTodoFetch
// post    /items/todo                 itemsSlice      itemsTodoCreate
// update  /items/todo                 itemsSlice      itemsTodoUpdate
// delete  /items/todo                 itemsSlice      itemsTodoDelete
// get     /items/calendar             calendarSlice   calendarGet
// post    /items/calendar             calendarSlice   calendarPost
// delete  /items/calendar             calendarSlice   CalendarDelete
// get     /wall                       wallSlice       wallFetch

// selectors to test
// Mocked store is required for all of these
// selectedTodos 
//     - returns list of users totdos
// selectedWall
//     - returns list of items fromuser and users freinds
//     - does not return any items from blocked or unfollowed friends
// selectedCalendar
//     - returns items by date for user
// selectedToday
//     - returns users items for todys including
//         - todays remiders
//         - todays appointments from user
//         - todays appointments that user is attending
//         - todays events from user
//         - todays events user is attending
// selectedUserDetails
//     -returns user details
//         - display name
//         - email
//         - user ID
//         - telephone number
// selectedUserPFP 
//     - returns user pfp
// selecetedFriends_Live
//     - returns list of users freinds that are live
// selecetedFriends_Pending
//     - returns list of users freinds that are pending
// selecetedFriends_Blocked
//     - returns list of users freinds that are blocked
// selecetedFriends_Unfollowed
//     - returns list of users freinds that are unfollowed
