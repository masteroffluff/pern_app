const date1 = new Date()
date1.setHours(0, 0, 0, 0);
const date = date1.toISOString().split('T')[0];
const tomorrow1 = new Date()
tomorrow1.setDate(date1.getDate() + 1)
const tomorrow = tomorrow1.toISOString().split('T')[0];
const time1 = new Date().setHours(1).toString()
const time2 = new Date().setHours(2).toString()
const time3 = new Date().setHours(3).toString()


export { date, tomorrow, time1, time2, time3 }

const dummyStore = {
    calendar: {
        calendarItems: [
            { id: 1, type: 'appointment', title: 'FOO', value: 'foo', dateFrom: date, dateTo: date },
            { id: 2, type: 'event', title: 'BAR', value: 'bar', dateFrom: date, dateTo: date },
            { id: 3, type: 'reminder', title: 'BAZ', value: 'baz', dateFrom: date, dateTo: date },
            { id: 4, type: 'appointment', title: 'QUX', value: 'qux', dateFrom: tomorrow, dateTo: tomorrow },
            { id: 5, type: 'event', title: 'QUUX', value: 'quux', dateFrom: tomorrow, dateTo: tomorrow },
            { id: 6, type: 'reminder', title: 'CORGE', value: 'corge', dateFrom: tomorrow, dateTo: tomorrow },
        ]
    },
    today: {
        calendarItems: [
            { id: 1, type: 'appointment', title: 'FOO', value: 'foo', dateFrom: date, dateTo: date },
            { id: 2, type: 'event', title: 'BAR', value: 'bar', dateFrom: date, dateTo: date },
            { id: 3, type: 'reminder', title: 'BAZ', value: 'baz', dateFrom: date, dateTo: date },
        ]
    },
    items: {
        todos: [
            {
                id: 1,
                type: 'Todo',
                title: "Todo list",
                todoItems: [
                    { value: 'foo', state: true },
                    { value: 'bar', state: false },
                    { value: 'baz', state: false },
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
            { id: 1, type: 'appointment', title: 'FOO', owner: 'bob', value: 'foo', dateFrom: date, dateTo: date },
            { id: 2, type: 'event', title: 'BAR', owner: 'alice', value: 'bar', dateFrom: date, dateTo: date },
            { id: 3, type: 'reminder', title: 'BAZ', owner: 'alice', value: 'baz', dateFrom: date, dateTo: date },
            { id: 4, type: 'note', title: 'QUX', owner: 'alice', value: 'qux', date: time1 },
            { id: 5, type: 'note', title: 'QUUX', owner: 'bob', value: 'quux', date: time2 },
            { id: 6, type: 'note', title: 'CORGE', owner: 'chaz', value: 'corge', date: time3 },
        ]
    },
    user: {
        details: {
            displayName: 'alice',
            telephoneNumber: '07123 456789',
            email: 'foo@bar.baz',
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
        },
        pfp: { data: '00 00 00 00' }
    },
};

export default dummyStore;

