import moment from "moment";

//const date1 = new Date()
//date1.setHours(0, 0, 0, 0);
// const date = date1.toISOString()//.split('T')[0];
// console.log(date1.toISOString())
// const tomorrow1 = new Date()
// tomorrow1.setDate(date1.getDate() + 1)
// // const tomorrow = tomorrow1.toISOString().split('T')[0];
// const looong1 = new Date()
// looong1.setDate(looong1.getDate() + 14)
// const loooong = looong1.toISOString().split('T')[0];
const time1 = new Date().setHours(1).toString()
const time2 = new Date().setHours(2).toString()
const time3 = new Date().setHours(3).toString()


const date = moment().format('YYYY-MM-DD')
const tomorrow = moment().add(1,'day').format('YYYY-MM-DD')
const loooong = moment().add(14,'day').format('YYYY-MM-DD')

export { date, tomorrow, time1, time2, time3, loooong }


const dummyStore = {
    calendar: {
        calendarItems: [
            { id: 1, item_id:1, type: 'appointment', title: 'FOO', value: 'foo', date_from: date, date_to: date },
            { id: 2, item_id:2, type: 'event', title: 'BAR', value: 'bar', date_from: date, date_to: date },
            { id: 3, item_id:3, type: 'reminder', title: 'BAZ', value: 'baz', date_from: date, date_to: date },
            { id: 4, item_id:4, type: 'appointment', title: 'QUX', value: 'qux', date_from: tomorrow, date_to: tomorrow },
            { id: 5, item_id:5, type: 'event', title: 'QUUX', value: 'quux', date_from: tomorrow, date_to: tomorrow },
            { id: 6, item_id:6, type: 'reminder', title: 'CORGE', value: 'corge', date_from: tomorrow, date_to: tomorrow },
            { id: 7, item_id:7, type: 'reminder', title: 'LOOONG', value: 'looooooong', date_from: tomorrow, date_to: loooong },
        ]
    },
    today: {
        calendarItems: [
            { id: 1, item_id:1, type: 'appointment', title: 'FOO', value: 'foo', date_from: date, date_to: date },
            { id: 2, item_id:2, type: 'event', title: 'BAR', value: 'bar', date_from: date, date_to: date },
            { id: 3, item_id:3, type: 'reminder', title: 'BAZ', value: 'baz', date_from: date, date_to: date },
        ]
    },
    items: {
        todos: [
            {
                id: 1,
                type: 'Todo',
                title: "Todo list",
                notes:"This is a demonstration of a todo list",
                items: [
                    { id: 1, item_text: 'foo', item_done: true },
                    { id: 2, item_text: 'bar', item_done: false },
                    { id: 13, item_text: 'baz', item_done: false },
                ]
            }
        ],
        notes: [
            { id: 1, title: 'FOO', value: 'foo' },
            { id: 2, title: 'BAR', value: 'bar' },
            { id: 3, title: 'BAZ', value: 'baz' },
            { id: 4, title: 'QUX', value: 'qux' },
        ]
    },
    wall: {
        wallItems: [
            { id: 1, type: 'appointment', title: 'FOO', owner: 'bob', value: 'foo', date_from: date, date_to: date },
            { id: 2, type: 'event', title: 'BAR', owner: 'alice', value: 'bar', date_from: date, date_to: date },
            { id: 3, type: 'reminder', title: 'BAZ', owner: 'alice', value: 'baz', date_from: date, date_to: date },
            { id: 4, type: 'note', title: 'QUX', owner: 'alice', value: 'qux', date: time1 },
            { id: 5, type: 'note', title: 'QUUX', owner: 'bob', value: 'quux', date: time2 },
            { id: 6, type: 'note', title: 'CORGE', owner: 'chaz', value: 'corge', date: time3 },
        ]
    },
    user: {
        details: {
            display_name: 'alice',
            telephoneNumber: '07123 456789',
            email: 'foo@bar.baz',
            colour:'sandy'
        },
        friends: {
            list: [
                { id: 2, display_name: 'bob', status: 'friend' },
                { id: 3, display_name: 'charlie', status: 'unfollowed' },
                { id: 4, display_name: 'dan', status: 'blocked' },
                { id: 5, display_name: 'edd', status: 'pending' },
                { id: 5, display_name: 'faye', status: 'sent' }
            ],
            potential: [
                { display_name: 'frank', id: 7 },
                { display_name: 'gertie', id: 8 },
                { display_name: 'helen', id: 9 },
            ],
        },

        authentication: {
            authToken: "1234567890",
            isLoggedIn: true,
            customer_id: 1,
            userAlreadyExists: false,
        }
    },
    "popup": {
        "isPopupOpen": true
      },
};

export default dummyStore;

