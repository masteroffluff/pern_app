
import { selectedUserDetails } from '../components/user/details/userDetailsSlice.js'
import { selectUserPfp } from '../components/user/details/userPfpSlice.js'
import { selectAuthToken, selectUserAlreadyExists, selectIsLoggedIn } from '../components/user/auth/userAuthSlice.js'
import { selectFriends_Blocked, selectFriends_Live, selectFriends_Pending, selectFriends_Unfollowed,selectFriends_Sent } from '../components/user/friends/userfriendsSlice.js'
import { selectCalendar } from '../components/calandar/calendarSlice.js'
import { selectTodos, selectNotes } from '../components/items/itemSlice.js'
import { selectWall } from '../components/mainPage/wallSlice.js'
import { selectToday } from '../components/mainPage/todaySlice.js'

// import { cleanup } from '@testing-library/react'
import state, {date, tomorrow, time1, time2, time3} from './dummyData.js'

// const date1 = new Date()
// date1.setHours(0, 0, 0, 0);
// const tomorrow = new Date(date1.getDate()+1).toString()
// const time1 = new Date().setHours(1).toString()
// const time2 = new Date().setHours(2).toString()
// const date = date1.toString()





// selectors to test
// selectTodos 
//     - returns list of users totdos
describe('items', () => {
  describe('Todo Selector', () => {
    test('returns todo items', () => {

      const selectedItems = selectTodos(state);

      expect(selectedItems).toEqual(state.items.todos);
    });

  })
  describe('Notes Selector', () => {
    test('returns users notes', () => {
      const expected = [
        { id: 1, title: 'FOO', value: 'foo' },
        { id: 2, title: 'BAR', value: 'bar' },
        { id: 3, title: 'BAZ', value: 'baz' },
        { id: 4, title: 'QUX', value: 'qux' },
      ]
      const selectedItems = selectNotes(state);

      expect(selectedItems).toEqual(expected);
    });
  })
})
describe('display', () => {
  // selectWall
  //     - returns list of items fromuser and users friends
  //     - does not return any items from blocked or unfollowed friends 
  describe('wallSelector', () => {
    test('returns wall', () => {
      
      const expected = [
        { id: 1, type: 'appointment', title: 'FOO', owner: 'bob', value: 'foo', dateFrom: date, dateTo: date },
        { id: 2, type: 'event', title: 'BAR', owner: 'alice', value: 'bar', dateFrom: date, dateTo: date },
        { id: 3, type: 'reminder', title: 'BAZ', owner: 'alice', value: 'baz', dateFrom: date, dateTo: date },
        { id: 4, type: 'note', title: 'QUX', owner: 'alice', value: 'qux', date: time1 },
        { id: 5, type: 'note', title: 'QUUX', owner: 'bob', value: 'quux', date: time2 },
        { id: 6, type: 'note', title: 'CORGE', owner: 'chaz', value: 'corge', date: time3 },
      ]

      const selectedItems = selectWall(state);
      //console.log(selectedItems)
      expect(selectedItems).toEqual(expected);
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
        { id: 1, type: 'appointment', title: 'FOO', value: 'foo', dateFrom: date, dateTo: date },
        { id: 2, type: 'event', title: 'BAR', value: 'bar', dateFrom: date, dateTo: date },
        { id: 3, type: 'reminder', title: 'BAZ', value: 'baz', dateFrom: date, dateTo: date },
      ]
      const selectedItems = selectToday(state);

      expect(selectedItems).toEqual(expected);
    });
  })
})

// selectCalendar
//     - returns items by date for user
describe('Calendar Selector', () => {
  test('returns calendar items', () => {

    const selectedItems = selectCalendar(state);

    expect(selectedItems).toEqual(
      [
        { id: 1, type: 'appointment', title: 'FOO', value: 'foo', dateFrom: date, dateTo: date },
        { id: 2, type: 'event', title: 'BAR', value: 'bar', dateFrom: date, dateTo: date },
        { id: 3, type: 'reminder', title: 'BAZ', value: 'baz', dateFrom: date, dateTo: date },
        { id: 4, type: 'appointment', title: 'QUX', value: 'qux', dateFrom: tomorrow, dateTo: tomorrow },
        { id: 5, type: 'event', title: 'QUUX', value: 'quux', dateFrom: tomorrow, dateTo: tomorrow },
        { id: 6, type: 'reminder', title: 'CORGE', value: 'corge', dateFrom: tomorrow, dateTo: tomorrow },
      ]
    );
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
    const selectedItems = selectedUserDetails(state);

    expect(selectedItems).toEqual(expected);
  });

})
// selectUserPFP 
//     - returns user pfp
describe('user pfp Selector', () => {
  test('returns user pfp items', () => {

    const selectedItems = selectUserPfp(state);

    expect(selectedItems).toEqual(state.user.pfp.data);
  });
})
describe('seleced friends', () => {
  // selectFriends_Live
  //     - returns list of users friends that are live
  // { name: 'bob', status: 'friend' },
  // { name: 'charlie', status: 'unfollow' },
  // { name: 'dan', status: 'blocked' },
  // { name: 'edd' , status: 'pending'}
  test('returns list of users friends that are live', () => {

    const selectedItems = selectFriends_Live(state);

    expect(selectedItems).toEqual([{ id:2, name: 'bob', status: 'friend' }]);
  });
  test('returns list of users friends that are sent', () => {

    const selectedItems = selectFriends_Sent(state);

    expect(selectedItems).toEqual([{ id: 5, name: 'faye', status: 'sent' }]);
  });
  // selectFriends_Blocked
  //     - returns list of users friends that are blocked
  test('returns list of users friends that are blocked', () => {

    const selectedItems = selectFriends_Blocked(state);

    expect(selectedItems).toEqual([{ id:4, name: 'dan', status: 'blocked' }]);
  });
  // selectFriends_Unfollowed
  //     - returns list of users friends that are unfollowed
  test('returns list of users friends that are unfollowed', () => {

    const selectedItems = selectFriends_Unfollowed(state);

    expect(selectedItems).toEqual([{ "id": 3, name: 'charlie', status: 'unfollowed' }]);
  });
  // selectFriends_Pending
  //     - returns list of users friends that are pending
  test('returns list of users friends that are pending', () => {

    const selectedItems = selectFriends_Pending(state);

    expect(selectedItems).toEqual([{ "id": 5, name: 'edd', status: 'pending' }]);
  });

})
describe('User Authentication Selector', () => {
  test('returns auth token', () => {
    const expected = {
      authToken: "1234567890",
      isLoggedIn: true,
      customer_id: 1,
      userAlreadyExists: false,
    }

    const authToken = selectAuthToken(state);

    expect(authToken).toEqual(expected.authToken);

    const userAlreadyExists = selectUserAlreadyExists(state);
    expect(userAlreadyExists).toEqual(expected.userAlreadyExists);

    const isLoggedIn = selectIsLoggedIn(state);
    expect(isLoggedIn).toEqual(expected.isLoggedIn);

  });

})

