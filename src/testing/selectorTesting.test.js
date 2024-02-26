import { getFilteredItems } from './selectors';



const date = new Date()
const state = {
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
            { name: 'edd' , status: 'pending'}
        ],
    },
    userpfp: { pfp: ['00', '00', '00'] }
};


// selectors to test
// selectTodos 
//     - returns list of users totdos
describe('todoSelector', () => {
    test('returns todo items', () => {
  
      const selectedItems = selectTodos(state);
  
      expect(selectedItems).toEqual(state.items.todos);
    });
  
  })
// selectWall
//     - returns list of items fromuser and users friends
//     - does not return any items from blocked or unfollowed friends 
describe('wallSelector', () => {
    test('returns todo items', () => {
    const expected = [
        { id: 1, type: 'appointment', title: 'FOO', owner: 'bob', value: 'foo', dateFrom: date, dateTo: date },
        { id: 2, type: 'event', title: 'BAR', owner: 'alice', value: 'bar', dateFrom: date, dateTo: date },
        { id: 3, type: 'reminder', title: 'BAZ', owner: 'alice', value: 'baz', dateFrom: date, dateTo: date },
        { id: 4, type: 'note', title: 'QUX', owner: 'alice', value: 'qux', date: date.setHours(1, 0) },
        { id: 5, type: 'note', title: 'QUUX', owner: 'bob', value: 'quux', date: date.setHours(2, 0) },
    ]
      const selectedItems = selectWall(state);
  
      expect(selectedItems).toEqual(expected);
    });
  
  })

// selectCalendar
//     - returns items by date for user
describe('Calendar Selector', () => {
    test('returns todo items', () => {
  
      const selectedItems = selectCalendar(state);
  
      expect(selectedItems).toEqual(state.calendar);
    });
}) 
// selectToday
//     - returns users items for todys including
//         - todays remiders
//         - todays appointments from user
//         - todays appointments that user is attending
//         - todays events from user
//         - todays events user is attending
describe('Today Selector', () => {
    test('returns todays items', () => {
    const expected = [
        { id: 1, type: 'appointment', title: 'FOO', owner: 'bob', value: 'foo', dateFrom: date, dateTo: date },
        { id: 2, type: 'event', title: 'BAR', owner: 'alice', value: 'bar', dateFrom: date, dateTo: date },
        { id: 3, type: 'reminder', title: 'BAZ', owner: 'alice', value: 'baz', dateFrom: date, dateTo: date },
    ]
      const selectedItems = selectToday(state);
  
      expect(selectedItems).toEqual(expected);
    });
}) 
// selectUserDetails
//     -returns user details
//         - display name
//         - email
//         - user ID
//         - telephone number
describe('User Details Selector', () => {
    test('returns todo items', () => {
        const expected = {
            displayName: 'alice',
            telephoneNumber: '07123 456789',
            email: 'foo@bar.baz',
        }
      const selectedItems = selectUserDetails(state);
    
      expect(selectedItems).toEqual(expected);
    });
  
  })
// selectUserPFP 
//     - returns user pfp
describe('user pfp Selector', () => {
    test('returns todo items', () => {
  
      const selectedItems = selectUserPfp(state);
  
      expect(selectedItems).toEqual(state.userpfp);
    });
}) 
describe('seleced freinds', () => {
    // selectFriends_Live
//     - returns list of users friends that are live
// { name: 'bob', status: 'friend' },
// { name: 'charlie', status: 'unfollow' },
// { name: 'dan', status: 'blocked' },
// { name: 'edd' , status: 'pending'}
test('returns list of users friends that are live', () => {
  
    const selectedItems = selectFriends_Live(state);

    expect(selectedItems).toEqual({ name: 'bob', status: 'friend' });
  });
// selectFriends_Blocked
//     - returns list of users friends that are blocked
test('returns list of users friends that are blocked', () => {
  
    const selectedItems = selectFriends_Blocked(state);

    expect(selectedItems).toEqual({ name: 'dan', status: 'blocked' });
  });
// selectFriends_Unfollowed
//     - returns list of users friends that are unfollowed
test('returns list of users friends that are unfollowed', () => {
  
    const selectedItems = selectFriends_Unfollowed(state);

    expect(selectedItems).toEqual({ name: 'charlie', status: 'unfollow' });
  });
// selectFriends_Pending
//     - returns list of users friends that are pending
    test('returns list of users friends that are pending', () => {
  
      const selectedItems = selectFriends_Pending(state);
  
      expect(selectedItems).toEqual({ name: 'edd' , status: 'pending'});
    });
}) 
