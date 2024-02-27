const date = new Date()
const mockServerData = {
    calendar: [
        { id: 1, type: 'appointment', title: 'FOO', value: 'foo', dateFrom: date, dateTo: date },
        { id: 2, type: 'event', title: 'BAR', value: 'bar', dateFrom: date, dateTo: date },
        { id: 3, type: 'reminder', title: 'BAZ', value: 'baz', dateFrom: date, dateTo: date },
        { id: 4, type: 'appointment', title: 'QUX', value: 'qux', dateFrom: date + 1, dateTo: date + 1 },
        { id: 5, type: 'event', title: 'QUUX', value: 'quux', dateFrom: date + 1, dateTo: date + 1 },
        { id: 6, type: 'reminder', title: 'CORGE', value: 'corge', dateFrom: date + 1, dateTo: date + 1 }
    ],
    items: {
        todos: [
            {
                id: 1,
                title: "corge",
                todoItems: [
                    { value: 'foo', state: true },
                    { value: 'bar', state: false },
                    { value: 'baz', state: false }
                ]
            }
        ],
        notes: [
            { id: 1, title: 'FOO', value: 'foo' },
            { id: 2, title: 'BAR', value: 'bar' },
            { id: 3, title: 'BAZ', value: 'baz' }
        ]
    },
    wall: [
        { id: 1, type: 'appointment', title: 'FOO', owner: 'bob', value: 'foo', dateFrom: date, dateTo: date },
        { id: 2, type: 'event', title: 'BAR', owner: 'alice', value: 'bar', dateFrom: date, dateTo: date },
        { id: 3, type: 'reminder', title: 'BAZ', owner: 'alice', value: 'baz', dateFrom: date, dateTo: date },
        { id: 4, type: 'note', title: 'QUX', owner: 'alice', value: 'qux', date: date.setHours(1, 0) },
        { id: 5, type: 'note', title: 'QUUX', owner: 'bob', value: 'quux', date: date.setHours(2, 0) },
        { id: 6, type: 'note', title: 'CORGE', owner: 'chaz', value: 'corge', date: date.setHours(3, 0) }
    ],
    user: {
        displayName: 'alice',
        telephoneNumber: '07123 456789',
        email: 'foo@bar.baz',
        friends: [
            { name: 'bob', status: 'friend' },
            { name: 'charlie', status: 'unfollow' },
            { name: 'dan', status: 'blocked' },
        ],
    },
    userpfp: { pfp: ['00', '00', '00'] }
};
// const initialState = {
//     calendar: [],
//     items: {
//         todos: [],
//         notes: [],
//     },
//     wall: [],
//     user: {
//         details: {
//             displayName: '',
//             telephoneNumber: '',
//             email: '',
//         },
//         friends: []
//     }
// };


// i was using the msw rest object so i'm trying to salvge as much as i can :)
class Rest {
    constructor() {
        this.mockDataObject = { get: {}, post: {}, update: {}, delete: {} }

    }
    addToMDO(action, path, callback) {
        this.mockDataObject[action][path]=callback

    }
    get(path, callback) { this.addToMDO('get', path, callback) };
    post(path, callback) { this.addToMDO('post', path, callback) };
    update(path, callback) { this.addToMDO('update', path, callback) };
    delete(path, callback) { this.addToMDO('delete', path, callback) };

}

const rest = new Rest();
rest.get('/user', (req) => {
    const { displayName, mail, telephoneNumber } = mockServerData.user
    return (({ displayName, mail, telephoneNumber }));
})
rest.update('/user ', (req) => {
    const { displayName, mail, telephoneNumber } = mockServerData.user
    return (({ displayName, mail, telephoneNumber }));
})
rest.post('/userPfp', (req) => {
    return ((mockServerData.userpfp));
})
rest.update('/userPfp', (req) => {
    return ((mockServerData.userpfp));
})
rest.get('/userPfp', (req) => {
    return ((mockServerData.userpfp));
})
rest.get('/friends', (req) => {
    return ((mockServerData.user.friends));
})
rest.post('/friends', (req) => {
    return ((mockServerData.user.friends));
})
rest.update('/friends/confirm', (req) => {
    return ((mockServerData.user.friends));
})
rest.update('/friends/unfollow', (req) => {
    return ((mockServerData.user.friends));
})
rest.update('/friends/block', (req) => {
    return ((mockServerData.user.friends));
})
rest.get('/items/note', (req) => {
    return ((mockServerData.items.notes));
})
rest.post('/items/note', (req) => {
    return ((mockServerData.items.notes));
})
rest.update('/items/note', (req) => {
    return ((mockServerData.items.notes));
})
rest.delete('/items/note', (req) => {
    return ((mockServerData.items.notes));
})
rest.get('/items/todo', (req) => {
    return ((mockServerData.items.todos));
})
rest.post('/items/todo', (req) => {
    return ((mockServerData.items.todos));
})
rest.update('/items/todo', (req) => {
    return ((mockServerData.items.todos));
})
rest.delete('/items/todo', (req) => {
    return ((mockServerData.items.todos));
})
rest.get('/items/calendar', (req) => {
    return ((mockServerData.calendar));
})
rest.post('/items/calendar', (req) => {
    return ((mockServerData.calendar));
})
rest.delete('/items/calendar', (req) => {
    return ((mockServerData.calendar));
})
rest.get('/wall ', (req) => {
    return ((mockServerData.wall));
})




// apiFetch(endPoint, options, rejectWithValue)


export default async function apiFetch(endPoint, options, rejectionCallback) {
    try {
        const params = new URLSearchParams(endPoint.split('?')[1]);
        const entries = Object.fromEntries (params.entries());
        options.params= entries
        return new Promise(resolve => {
            setTimeout(() => {
              const data = rest.mockDataObject[options.method||'get'][endPoint](options);
              if (data) {
                resolve({
                  json: async () => data,
                });
              } else {
                resolve({
                  json: async () => {
                    throw new Error(`Mock data not found for ${endPoint}`);
                  },
                });
              }
            }, 100);
          });

    } catch (e) {

        return rejectionCallback(e)
    }
}

