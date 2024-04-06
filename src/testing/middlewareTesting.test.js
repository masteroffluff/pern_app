// Middleware routes to test mocked hasError responses and changes to the redux store
// Each route needs 2 tests 1 hasError one for mocked change to base state. 
// request route                       slicer          action/dispatch  returns
// post    /login                      userSlice       userAuthLogin        user bearer token
// post    /register                   userSlice       userAuthRegister     user bearer token
// post    /auth/[3rd party site]      userSlice       userAuth         3rd part auth token
// get     /user                       userSlice       userDetails      list of user details (display name, email, phone number)
// put  /user                       userSlice       userDetailsUpdatelist of user details (display name, email, phone number)
// post    /userPfp                    userSlice       userDetails      user PFP
// put  /userPfp                    userSlice       userDetails      user PFP
// get     /userPfp                    userSlice       userDetails      user PFP
// get     /friends                    friendsSlice    friendsFetch     list of users friends and their state (friend, unfollowed, blocked)
// post    /friends                    friendsSlice    friendsAdd       list of users friends and their state (friend, unfollowed, blocked)
// put     /friends/confirm            friendsSlice    friendConfirm    list of users friends and their state (friend, unfollowed, blocked)
// put     /friends/unfollow           friendsSlice    friendsUnfollow  list of users friends and their state (friend, unfollowed, blocked)
// put     /friends/block              friendsSlice    friendsBlock     list of users friends and their state (friend, unfollowed, blocked)
// get     /friends/potential          friendsSlice    friendsPotential list of users who are potential friends
// get     /items/note                 itemsSlice      itemsNoteFetch   list of notes in descending date order
// post    /items/note                 itemsSlice      itemsNoteAdd     list of notes in descending date order
// put     /items/note                 itemsSlice      itemsNoteUpdate  list of notes in descending date order
// delete  /items/note                 itemsSlice      itemsNoteDelete  list of notes in descending date order
// get     /items/todo                 itemsSlice      itemsTodoFetch   list of todos in descending date order
// post    /items/todo                 itemsSlice      itemsTodoAdd     list of todos in descending date order
// put     /items/todo                 itemsSlice      itemsTodoUpdate  list of todos in descending date order
// delete  /items/todo                 itemsSlice      itemsTodoDelete  list of todos in descending date order
// post    /items/todo/items           itemsSlice      itemsTodoAdd     list of todos in descending date order
// put     /items/todo/items           itemsSlice      itemsTodoUpdate  list of todos in descending date order
// delete  /items/todo/items           itemsSlice      itemsTodoDelete  list of todos in descending date order
// get     /calendar                   calendarSlice   calendarGet      list of users calendar items in date range
// post    /calendar                   calendarSlice   calendarPost     list of users calendar items in date range
// delete  /calendar                   calendarSlice   calendarDelete   list of users calendar items in date range
// post    /calendar/attendees         calendarSlice   calendarPost     list of users calendar items in date range
// delete  /calendar/attendees         calendarSlice   calendarDelete   list of users calendar items in date range
// get     /today                      todaySlice      todayFetch       list of items for today
// get     /wall                       wallSlice       wallFetch        list of items on users wall in descending date order
import userDetails, { userDetailsFetch, userDetailsUpdate } from '../components/user/details/userDetailsSlice.js'
import userAuth, { userAuthCheckExists, userAuthLogin, userAuthRegister } from '../components/user/auth/userAuthSlice.js'
import friends, { friendsFetch, friendsAdd, friendConfirm, friendsBlock, friendsUnfollow, friendsPotential } from '../components/user/friends/userFriendsSlice.js'
import userPfp, { userPfpFetch, userPfpUpdate } from '../components/user/details/userPfpSlice.js'

import calendar, { calendarFetch, calendarPost, calendarDelete, calendarPostAttendee, calendarDeleteAttendee, calendarUpdateAttendee } from '../components/calandar/calendarSlice.js'
import items, { itemsNoteFetch, itemsNoteAdd, itemsNoteDelete, itemsNoteUpdate, itemsTodoAdd, itemsTodoFetch, itemsTodoDelete, itemsTodoUpdate } from '../components/items/itemSlice.js'
import wall, { wallFetch } from '../components/mainPage/wallSlice.js'
import today, { todayFetch } from '../components/mainPage/todaySlice.js'

const date = new Date()

// get     /user                       userSlice       userDetails      list of user details (display name, email, phone number)
describe('dispatch tests', () => {
  describe('userDetails', () => {
    describe('userDetailsFetch', () => {
      it('should handle fetchUser.pending', () => {
        const initialState = {
          display_name: '',
          telephoneNumber: '',
          email: '',
          isLoading: false,
          hasError: null,
        };

        const newState = userDetails(initialState, userDetailsFetch.pending());

        // Check state after dispatching the pending action
        expect(newState.isLoading).toBe(true);
        expect(newState.userDetails).toBe(undefined);
        expect(newState.hasError).toBe(null);
      });

      ///////////////////////////////////////////////////////////////////////
      it('should handle fetchUser.fulfilled', () => {
        const initialState = {
          display_name: '',
          telephoneNumber: '',
          email: '',
          isLoading: true,
          hasError: null,
        };

        const userDetailsData = {
          display_name: 'alice',
          telephoneNumber: '07123 456789',
          email: 'foo@bar.baz',
        };

        const action = userDetailsFetch.fulfilled(userDetailsData);

        const newState = userDetails(initialState, action);

        // Check state after dispatching the fulfilled action
        // console.log(newState)
        expect(newState.isLoading).toBe(false);
        expect(newState.display_name).toEqual(userDetailsData.display_name);
        expect(newState.hasError).toBe(null);
      });
      ///////////////////////////////////////////////////////////////////////////////////
      it('should handle fetchUser.rejected', () => {
        const initialState = {
          display_name: '',
          telephoneNumber: '',
          email: '',
          isLoading: true,
          hasError: null,
        };

        const errorMessage = 'Failed to fetch user details';

        const action = userDetailsFetch.rejected(null, null, errorMessage);

        const newState = userDetails(initialState, action);

        // Check state after dispatching the rejected action
        expect(newState.isLoading).toBe(false);
        expect(newState.display_name).toBe('');
        expect(newState.hasError).toStrictEqual({ "message": "Rejected" });
      });

    })

    // put     /user                       userSlice       userUpdate       list of user details (display name, email, phone number)
    ///////////////////////////////////////////////////////////////////////
    describe('userDetailsUpdate', () => {
      it('should handle userDetailsUpdate.pending', () => {
        const initialState = {
          display_name: '',
          telephoneNumber: '',
          email: '',
          isLoading: false,
          hasError: null,
        };

        const newState = userDetails(initialState, userDetailsUpdate.pending());

        // Check state after dispatching the pending action
        expect(newState.isLoading).toBe(true);
        expect(newState.userDetailsUpdate).toBe(undefined);
        expect(newState.hasError).toBe(null);
      });
      ///////////////////////////////////////////////////////////////////////
      it('should handle userDetailsUpdate.fulfilled', () => {
        const initialState = {
          display_name: '',
          telephoneNumber: '',
          email: '',
          isLoading: true,
          hasError: null,
        };

        const userDetailsData = {
          display_name: 'alice',
          telephoneNumber: '07123 456789',
          email: 'foo@bar.baz',
        };

        const action = userDetailsUpdate.fulfilled(userDetailsData);

        const newState = userDetails(initialState, action);

        // Check state after dispatching the fulfilled action
        // console.log(newState)
        expect(newState.isLoading).toBe(false);
        expect(newState.display_name).toEqual(userDetailsData.display_name);
        expect(newState.hasError).toBe(null);
      });
      ///////////////////////////////////////////////////////////////////////////////////
      it('should handle userDetailsUpdate.rejected', () => {
        const initialState = {
          display_name: '',
          telephoneNumber: '',
          email: '',
          isLoading: true,
          hasError: null,
        };

        const errorMessage = 'Failed to fetch user details';

        const action = userDetailsUpdate.rejected(null, null, errorMessage);

        const newState = userDetails(initialState, action);

        // Check state after dispatching the rejected action
        expect(newState.isLoading).toBe(false);
        expect(newState.display_name).toBe('');
        expect(newState.hasError).toStrictEqual({ "message": "Rejected" });
      });
    });
  });



  // put     /userPfp                    userPfp       userPfp      user PFP
  // get     /userPfp                    userPfp       userPfp      user PFP
  describe('userPfp', () => {
    describe('userPfpFetch', () => {
      it('should handle userPfpFetch.pending', () => {
        const initialState = {
          data: '',
          isLoading: false,
          hasError: null,
        }
        const action = userPfpFetch.pending();

        const newState = userPfp(initialState, action);


        // Check state after dispatching the pending action
        expect(newState.isLoading).toBe(true);
        expect(newState.data).toBe('');
        expect(newState.hasError).toBe(null);
      });

      ///////////////////////////////////////////////////////////////////////
      it('should handle userPfpFetch.fulfilled', () => {
        const initialState = {
          data: '',
          isLoading: true,
          hasError: null,
        }

        const userPfpData = 'ae 34e 89 a0 b5 89';

        const action = userPfpFetch.fulfilled(userPfpData);

        const newState = userPfp(initialState, action);

        // Check state after dispatching the fulfilled action

        expect(newState.isLoading).toBe(false);
        expect(newState.data).toEqual(userPfpData);
        expect(newState.hasError).toBe(null);
      });
      ///////////////////////////////////////////////////////////////////
      it('should handle userPfpFetch.rejected', () => {
        const initialState = {
          data: '',
          isLoading: true,
          hasError: null,
        }

        const errorMessage = 'Failed to fetch user details';

        const action = userPfpFetch.rejected(null, null, errorMessage);

        const newState = userPfp(initialState, action);

        // Check state after dispatching the rejected action
        expect(newState.isLoading).toBe(false);
        expect(newState.data).toBe('');
        expect(newState.hasError).toStrictEqual({ "message": "Rejected" });
      });

    })


    ///////////////////////////////////////////////////////////////////////
    describe('userPfpUpdate', () => {
      it('should handle userPfpUpdate.pending', () => {
        const initialState = {
          data: '00 00 00 00 00 00 00 00',
          isLoading: false,
          hasError: null,
        }

        const newState = userPfp(initialState, userPfpUpdate.pending());

        // Check state after dispatching the pending action
        expect(newState.isLoading).toBe(true);
        expect(newState.data).toBe(initialState.data);
        expect(newState.hasError).toBe(null);
      });
      ///////////////////////////////////////////////////////////////////////
      it('should handle userPfpUpdate.fulfilled', () => {
        const initialState = {
          data: '00 00 00 00 00 00 00 00',
          isLoading: true,
          hasError: null,
        }

        const userPfpData = {
          data: 'ae 34e 89 a0 b5 89',
        };

        const action = userPfpUpdate.fulfilled(userPfpData);

        const newState = userPfp(initialState, action);

        // Check state after dispatching the fulfilled action
        //console.log(newState)
        expect(newState.isLoading).toBe(false);
        expect(newState.data).toEqual(userPfpData);
        expect(newState.hasError).toBe(null);
      });
      /////////////////////////////////////////////////////////////////////////
      it('should handle userPfpUpdate.rejected', () => {
        const initialState = {
          data: '00 00 00 00 00 00 00 00',
          isLoading: true,
          hasError: null,
        }

        const errorMessage = 'Failed to fetch user details';

        const action = userPfpUpdate.rejected(null, null, errorMessage);

        const newState = userPfp(initialState, action);

        // Check state after dispatching the rejected action
        expect(newState.isLoading).toBe(false);
        expect(newState.data).toBe(initialState.data);
        expect(newState.hasError).toStrictEqual({ "message": "Rejected" });
      });
    });
  });
  // get     /friends                    friendsSlice    friendsFetch     list of users friends and their state (friend, unfollowed, blocked)
  // post    /friends                    friendsSlice    friendsAdd       list of users friends and their state (friend, unfollowed, blocked)
  // put     /friends/confirm            friendsSlice    friendConfirm    list of users friends and their state (friend, unfollowed, blocked)
  // put     /friends/unfollow           friendsSlice    friendsUnfollow  list of users friends and their state (friend, unfollowed, blocked)
  // put     /friends/block              friendsSlice    friendsBlock     list of users friends and their state (friend, unfollowed, blocked)

  describe('friends', () => {
    describe('friendsPotential', () => {
      it('should handle friendsPotential.pending', () => {
        const initialState = {
          list: [],
          isLoading: true,
          hasError: null,
          potentials: []
        }
        const action = friendsPotential.pending();

        const newState = friends(initialState, action);


        // Check state after dispatching the pending action
        expect(newState.isLoading).toBe(true);
        expect(newState.list.length).toBe(0);
        expect(newState.hasError).toBe(null);
      });

      ///////////////////////////////////////////////////////////////////////
      it('should handle friendsPotential.fulfilled', () => {
        const initialState = {
          list: [],
          isLoading: true,
          hasError: null,
          potentials: []
        }

        const friendsData = [
          { name: 'frank', id:7 },
          { name: 'gertie', id:8 },
          { name: 'helen', id:9 },
        ]


        const action = friendsPotential.fulfilled(friendsData);

        const newState = friends(initialState, action);

        // Check state after dispatching the fulfilled action
        //console.log('friendsFetch.fulfilled', newState)
        expect(newState.isLoading).toBe(false);
        expect(newState.potentials).toEqual(friendsData);
        expect(newState.hasError).toBe(null);
      });
      ///////////////////////////////////////////////////////////////////
      it('should handle friendsPotential.rejected', () => {
        const initialState = {
          list: [],
          isLoading: true,
          hasError: null,
          potentials: []
        }

        const errorMessage = 'Failed to fetch friend details';

        const action = friendsPotential.rejected(null, null, errorMessage);

        const newState = friends(initialState, action);

        // Check state after dispatching the rejected action
        expect(newState.isLoading).toBe(false);
        expect(newState.list.length).toBe(0);
        expect(newState.hasError).toStrictEqual({ "message": "Rejected" });
      });

    })

    describe('friendsFetch', () => {

      it('should handle friendsFetch.pending', () => {
        const initialState = {
          list: [],
          isLoading: true,
          hasError: null,
          potentials: []
        }
        const action = friendsFetch.pending();

        const newState = friends(initialState, action);


        // Check state after dispatching the pending action
        expect(newState.isLoading).toBe(true);
        expect(newState.list.length).toBe(0);
        expect(newState.hasError).toBe(null);
      });

      ///////////////////////////////////////////////////////////////////////
      it('should handle friendsFetch.fulfilled', () => {
        const initialState = {
          list: [],
          isLoading: true,
          hasError: null,
        }

        const friendsData = [
          { name: 'bob', status: 'friend' },
          { name: 'charlie', status: 'unfollow' },
          { name: 'dan', status: 'blocked' },
        ]


        const action = friendsFetch.fulfilled(friendsData);

        const newState = friends(initialState, action);

        // Check state after dispatching the fulfilled action
        //console.log('friendsFetch.fulfilled', newState)
        expect(newState.isLoading).toBe(false);
        expect(newState.list).toEqual(friendsData);
        expect(newState.hasError).toBe(null);
      });
      ///////////////////////////////////////////////////////////////////
      it('should handle friendsFetch.rejected', () => {
        const initialState = {
          list: [],
          isLoading: true,
          hasError: null,
          potentials: []
        }

        const errorMessage = 'Failed to fetch user details';

        const action = friendsFetch.rejected(null, null, errorMessage);

        const newState = friends(initialState, action);

        // Check state after dispatching the rejected action
        expect(newState.isLoading).toBe(false);
        expect(newState.list.length).toBe(0);
        expect(newState.hasError).toStrictEqual({ "message": "Rejected" });
      });

    })


    ///////////////////////////////////////////////////////////////////////
    describe('friendsAdd', () => {
      it('should handle friendsAdd.pending', () => {
        const initialState = {
          list: [],
          isLoading: true,
          hasError: null,
          potentials: []
        }

        const newState = friends(initialState, friendsAdd.pending());

        // Check state after dispatching the pending action
        expect(newState.isLoading).toBe(true);
        expect(newState.list.length).toBe(0);
        expect(newState.hasError).toBe(null);
      });
      ///////////////////////////////////////////////////////////////////////
      it('should handle friendsAdd.fulfilled', () => {
        const initialState = {
          list: [],
          isLoading: true,
          hasError: null,
        }

        const friendsData = [
          { name: 'bob', status: 'friend' },
          { name: 'charlie', status: 'unfollow' },
          { name: 'dan', status: 'blocked' },
        ]

        const action = friendsAdd.fulfilled(friendsData);

        const newState = friends(initialState, action);

        // Check state after dispatching the fulfilled action
        //console.log(newState)
        expect(newState.isLoading).toBe(false);
        expect(newState.list).toEqual(friendsData);
        expect(newState.hasError).toBe(null);
      });
      /////////////////////////////////////////////////////////////////////////
      it('should handle friendsAdd.rejected', () => {
        const initialState = {
          list: [],
          isLoading: true,
          hasError: null,
          potentials: []
        }

        const errorMessage = 'Failed to fetch user details';

        const action = friendsAdd.rejected(null, null, errorMessage);

        const newState = friends(initialState, action);

        // Check state after dispatching the rejected action
        expect(newState.isLoading).toBe(false);
        expect(newState.list.length).toBe(0);
        expect(newState.hasError).toStrictEqual({ "message": "Rejected" });
      });
      ///////////////////////////////////////////////////////////////////////
    });

    describe('friendConfirm', () => {
      it('should handle friendConfirm.pending', () => {
        const initialState = {
          list: [],
          isLoading: true,
          hasError: null,
          potentials: []
        }

        const newState = friends(initialState, friendConfirm.pending());

        // Check state after dispatching the pending action
        expect(newState.isLoading).toBe(true);
        expect(newState.list.length).toBe(0);
        expect(newState.hasError).toBe(null);
      });
      ///////////////////////////////////////////////////////////////////////
      it('should handle friendConfirm.fulfilled', () => {
        const initialState = {
          list: [],
          isLoading: true,
          hasError: null,
        }

        const friendsData = [
          { name: 'bob', status: 'friend' },
          { name: 'charlie', status: 'unfollow' },
          { name: 'dan', status: 'blocked' },
        ]

        const action = friendConfirm.fulfilled(friendsData);

        const newState = friends(initialState, action);

        // Check state after dispatching the fulfilled action
        //console.log(newState)
        expect(newState.isLoading).toBe(false);
        expect(newState.list).toEqual(friendsData);
        expect(newState.hasError).toBe(null);
      });
      /////////////////////////////////////////////////////////////////////////

      it('should handle friendConfirm.rejected', () => {
        const initialState = {
          list: [],
          isLoading: true,
          hasError: null,
          potentials: []
        }

        const errorMessage = 'Failed to fetch user details';

        const action = friendConfirm.rejected(null, null, errorMessage);

        const newState = friends(initialState, action);

        // Check state after dispatching the rejected action
        expect(newState.isLoading).toBe(false);
        expect(newState.list.length).toBe(0);
        expect(newState.hasError).toStrictEqual({ "message": "Rejected" });
      });

    })
    ///////////////////////////////////////////////////////////////////////
    describe('friendsUnfollow', () => {
      it('should handle friendsUnfollow.pending', () => {
        const initialState = {
          list: [],
          isLoading: true,
          hasError: null,
          potentials: []
        }

        const newState = friends(initialState, friendsUnfollow.pending());

        // Check state after dispatching the pending action
        expect(newState.isLoading).toBe(true);
        expect(newState.list.length).toBe(0);
        expect(newState.hasError).toBe(null);
      });
      ///////////////////////////////////////////////////////////////////////
      it('should handle friendsUnfollow.fulfilled', () => {
        const initialState = {
          list: [],
          isLoading: true,
          hasError: null,
          potentials: []
        }

        const friendsData = [
          { name: 'bob', status: 'friend' },
          { name: 'charlie', status: 'unfollow' },
          { name: 'dan', status: 'blocked' },
        ]

        const action = friendsUnfollow.fulfilled(friendsData);

        const newState = friends(initialState, action);

        // Check state after dispatching the fulfilled action
        //console.log(newState)
        expect(newState.isLoading).toBe(false);
        expect(newState.list).toEqual(friendsData);
        expect(newState.hasError).toBe(null);
      });
      /////////////////////////////////////////////////////////////////////////
      it('should handle friendsUnfollow.rejected', () => {
        const initialState = {
          list: [],
          isLoading: true,
          hasError: null,
          potentials: []
        }

        const errorMessage = 'Failed to fetch user details';

        const action = friendsUnfollow.rejected(null, null, errorMessage);

        const newState = friends(initialState, action);

        // Check state after dispatching the rejected action
        expect(newState.isLoading).toBe(false);
        expect(newState.list.length).toBe(0);
        expect(newState.hasError).toStrictEqual({ "message": "Rejected" });
      });

    });

    describe('friendsBlock', () => {
      it('should handle friendsBlock.pending', () => {
        const initialState = {
          list: [],
          isLoading: true,
          hasError: null,
          potentials: []
        }

        const newState = friends(initialState, friendsAdd.pending());

        // Check state after dispatching the pending action
        expect(newState.isLoading).toBe(true);
        expect(newState.list.length).toBe(0);
        expect(newState.hasError).toBe(null);
      });
      ///////////////////////////////////////////////////////////////////////
      it('should handle friendsBlock.fulfilled', () => {
        const initialState = {
          list: [],
          isLoading: true,
          hasError: null,
          potentials: []
        }

        const friendsData = [
          { name: 'bob', status: 'friend' },
          { name: 'charlie', status: 'unfollow' },
          { name: 'dan', status: 'blocked' },
        ]

        const action = friendsBlock.fulfilled(friendsData);

        const newState = friends(initialState, action);

        // Check state after dispatching the fulfilled action
        //console.log(newState)
        expect(newState.isLoading).toBe(false);
        expect(newState.list).toEqual(friendsData);
        expect(newState.hasError).toBe(null);
      });
      /////////////////////////////////////////////////////////////////////////
      it('should handle friendsBlock.rejected', () => {
        const initialState = {
          list: [],
          isLoading: true,
          hasError: null,
          potentials: []
        }

        const errorMessage = 'Failed to fetch user details';

        const action = friendsBlock.rejected(null, null, errorMessage);

        const newState = friends(initialState, action);

        // Check state after dispatching the rejected action
        expect(newState.isLoading).toBe(false);
        expect(newState.list.length).toBe(0);
        expect(newState.hasError).toStrictEqual({ "message": "Rejected" });
      });
    });
  });



  // get     /items/note                 itemsSlice      itemsNoteFetch   list of notes in descending date order
  // post    /items/note                 itemsSlice      itemsNoteAdd     list of notes in descending date order
  // put     /items/note                 itemsSlice      itemsNoteUpdate  list of notes in descending date order
  // delete  /items/note                 itemsSlice      itemsNoteDelete  list of notes in descending date order
  // get     /items/todo                 itemsSlice      itemsTodoFetch   list of todos in descending date order
  // post    /items/todo                 itemsSlice      itemsTodoAdd     list of todos in descending date order
  // put     /items/todo                 itemsSlice      itemsTodoUpdate  list of todos in descending date order
  // delete  /items/todo                 itemsSlice      itemsTodoDelete  list of todos in descending date order

  describe('items', () => {
    describe('itemsNotes', () => {
      it('should handle itemsNoteFetch.pending', () => {
        const initialState = {
          todos: [],
          notes: [],
        }

        const newState = items(initialState, itemsNoteFetch.pending());

        // Check state after dispatching the pending action
        expect(newState.isLoading).toBe(true);
        expect(newState.notes).toBe(initialState.notes);
        expect(newState.hasError).toBe(null);
      });
      ///////////////////////////////////////////////////////////////////////
      it('should handle itemsNoteFetch.fulfilled', () => {
        const initialState = {
          todos: [],
          notes: [],
          isLoading: true,
          hasError: null,
        }

        const mockData = [
          { id: 1, title: 'FOO', value: 'foo' },
          { id: 2, title: 'BAR', value: 'bar' },
          { id: 3, title: 'BAZ', value: 'baz' }
        ];

        const action = itemsNoteFetch.fulfilled(mockData);

        const newState = items(initialState, action);

        // Check state after dispatching the fulfilled action
        //console.log(newState)
        expect(newState.isLoading).toBe(false);
        expect(newState.notes).toEqual(mockData);
        expect(newState.hasError).toBe(null);
      });
      /////////////////////////////////////////////////////////////////////////
      it('should handle itemsNoteFetch.rejected', () => {
        const initialState = {
          todos: [],
          notes: [],
          isLoading: true,
          hasError: null,
        }

        const errorMessage = 'Failed to fetch user details';

        const action = itemsNoteFetch.rejected(null, null, errorMessage);

        const newState = items(initialState, action);

        // Check state after dispatching the rejected action
        expect(newState.isLoading).toBe(false);
        expect(newState.notes).toBe(initialState.notes);
        expect(newState.hasError).toStrictEqual({ "message": "Rejected" });
      });

      ///////////////////////////////////////////////////////////////////////
      it('should handle itemsNoteAdd.pending', () => {
        const initialState = {
          todos: [],
          notes: [],
        }

        const newState = items(initialState, itemsNoteAdd.pending());

        // Check state after dispatching the pending action
        expect(newState.isLoading).toBe(true);
        expect(newState.notes).toBe(initialState.notes);
        expect(newState.hasError).toBe(null);
      });
      ///////////////////////////////////////////////////////////////////////      
      it('should handle itemsNoteAdd.fulfilled', () => {
        const initialState = {
          todos: [],
          notes: [],
          isLoading: true,
          hasError: null,
        }

        const mockData = [
          { id: 1, title: 'FOO', value: 'foo' },
          { id: 2, title: 'BAR', value: 'bar' },
          { id: 3, title: 'BAZ', value: 'baz' }
        ];

        const action = itemsNoteAdd.fulfilled(mockData);

        const newState = items(initialState, action);

        // Check state after dispatching the fulfilled action

        expect(newState.isLoading).toBe(false);
        expect(newState.notes).toEqual(mockData);
        expect(newState.hasError).toBe(null);
      });
      /////////////////////////////////////////////////////////////////////////
      it('should handle itemsNoteAdd.rejected', () => {
        const initialState = {
          todos: [],
          notes: [],
          isLoading: true,
          hasError: null,
        }

        const errorMessage = 'Failed to fetch user details';

        const action = itemsNoteAdd.rejected(null, null, errorMessage);

        const newState = items(initialState, action);

        // Check state after dispatching the rejected action
        expect(newState.isLoading).toBe(false);
        expect(newState.notes).toBe(initialState.notes);
        expect(newState.hasError).toStrictEqual({ "message": "Rejected" });
      });
      ///////////////////////////////////////////////////////////////////////
      it('should handle itemsNoteUpdate.pending', () => {
        const initialState = {
          todos: [],
          notes: [],
        }

        const newState = items(initialState, itemsNoteUpdate.pending());

        // Check state after dispatching the pending action
        expect(newState.isLoading).toBe(true);
        expect(newState.notes).toBe(initialState.notes);
        expect(newState.hasError).toBe(null);
      });
      ///////////////////////////////////////////////////////////////////////
      it('should handle itemsNoteUpdate.fulfilled', () => {
        const initialState = {
          todos: [],
          notes: [],
          isLoading: true,
          hasError: null,
        }

        const mockData = [
          { id: 1, title: 'FOO', value: 'foo' },
          { id: 2, title: 'BAR', value: 'bar' },
          { id: 3, title: 'BAZ', value: 'baz' }
        ];

        const action = itemsNoteUpdate.fulfilled(mockData);

        const newState = items(initialState, action);

        // Check state after dispatching the fulfilled action
        //console.log(newState)
        expect(newState.isLoading).toBe(false);
        expect(newState.notes).toEqual(mockData);
        expect(newState.hasError).toBe(null);
      });
      /////////////////////////////////////////////////////////////////////////
      it('should handle itemsNoteUpdate.rejected', () => {
        const initialState = {
          todos: [],
          notes: [],
          isLoading: true,
          hasError: null,
        }

        const errorMessage = 'Failed to fetch user details';

        const action = itemsNoteUpdate.rejected(null, null, errorMessage);

        const newState = items(initialState, action);

        // Check state after dispatching the rejected action
        expect(newState.isLoading).toBe(false);
        expect(newState.notes).toBe(initialState.notes);
        expect(newState.hasError).toStrictEqual({ "message": "Rejected" });
      });
      ///////////////////////////////////////////////////////////////////////
      it('should handle itemsNoteDelete.pending', () => {
        const initialState = {
          todos: [],
          notes: [],
        }

        const newState = items(initialState, itemsNoteDelete.pending());

        // Check state after dispatching the pending action
        expect(newState.isLoading).toBe(true);
        expect(newState.notes).toBe(initialState.notes);
        expect(newState.hasError).toBe(null);
      });
      ///////////////////////////////////////////////////////////////////////
      it('should handle itemsNoteDelete.fulfilled', () => {
        const initialState = {
          todos: [],
          notes: [],
          isLoading: true,
          hasError: null,
        }

        const mockData = [
          { id: 1, title: 'FOO', value: 'foo' },
          { id: 2, title: 'BAR', value: 'bar' },
          { id: 3, title: 'BAZ', value: 'baz' }
        ];

        const action = itemsNoteDelete.fulfilled(mockData);

        const newState = items(initialState, action);

        // Check state after dispatching the fulfilled action
        //console.log(newState)
        expect(newState.isLoading).toBe(false);
        expect(newState.notes).toEqual(mockData);
        expect(newState.hasError).toBe(null);
      });
      /////////////////////////////////////////////////////////////////////////
      it('should handle itemsNoteDelete.rejected', () => {
        const initialState = {
          todos: [],
          notes: [],
          isLoading: true,
          hasError: null,
        }

        const errorMessage = 'Failed to fetch user details';

        const action = itemsNoteDelete.rejected(null, null, errorMessage);

        const newState = items(initialState, action);

        // Check state after dispatching the rejected action
        expect(newState.isLoading).toBe(false);
        expect(newState.notes).toBe(initialState.notes);
        expect(newState.hasError).toStrictEqual({ "message": "Rejected" });
      });
    });
    describe('itemsTodos', () => {
      it('should handle itemsTodoFetch.pending', () => {
        const initialState = {
          todos: [],
          notes: [],
          isLoading: false,
          hasError: null,
        }
        const newState = items(initialState, itemsTodoFetch.pending());

        // Check state after dispatching the pending action
        expect(newState.isLoading).toBe(true);
        expect(newState.todos).toBe(initialState.todos);
        expect(newState.hasError).toBe(null);
      });
      ///////////////////////////////////////////////////////////////////////
      it('should handle itemsTodoFetch.fulfilled', () => {
        const initialState = {
          todos: [],
          notes: [],
          isLoading: true,
          hasError: null,
        }

        const mockData = [
          {
            id: 1,
            title: "corge",
            todoItems: [
              { value: 'foo', state: true },
              { value: 'bar', state: false },
              { value: 'baz', state: false }
            ]
          }
        ];

        const action = itemsTodoFetch.fulfilled(mockData);

        const newState = items(initialState, action);

        // Check state after dispatching the fulfilled action
        //console.log(newState)
        expect(newState.isLoading).toBe(false);
        expect(newState.todos).toEqual(mockData);
        expect(newState.hasError).toBe(null);
      });
      /////////////////////////////////////////////////////////////////////////
      it('should handle itemsTodoFetch.rejected', () => {
        const initialState = {
          todos: [],
          notes: [],
          isLoading: true,
          hasError: null,
        }

        const errorMessage = 'Failed to fetch user details';

        const action = itemsTodoFetch.rejected(null, null, errorMessage);

        const newState = items(initialState, action);

        // Check state after dispatching the rejected action
        expect(newState.isLoading).toBe(false);
        expect(newState.todos).toBe(initialState.todos);
        expect(newState.hasError).toStrictEqual({ "message": "Rejected" });
      });

      ///////////////////////////////////////////////////////////////////////
      it('should handle itemsTodoAdd.pending', () => {
        const initialState = {
          todos: [],
          notes: [],
          isLoading: false,
          hasError: null,
        }

        const newState = items(initialState, itemsTodoAdd.pending());

        // Check state after dispatching the pending action
        expect(newState.isLoading).toBe(true);
        expect(newState.todos).toBe(initialState.todos);
        expect(newState.hasError).toBe(null);
      });
      ///////////////////////////////////////////////////////////////////////      
      it('should handle itemsTodoAdd.fulfilled', () => {
        const initialState = {
          todos: [],
          notes: [],
          isLoading: true,
          hasError: null,
        }

        const mockData = [
          {
            id: 1,
            title: "corge",
            todoItems: [
              { value: 'foo', state: true },
              { value: 'bar', state: false },
              { value: 'baz', state: false }
            ]
          }
        ];

        const action = itemsTodoAdd.fulfilled(mockData);

        const newState = items(initialState, action);

        // Check state after dispatching the fulfilled action
        //console.log(newState)
        expect(newState.isLoading).toBe(false);
        expect(newState.todos).toEqual(mockData);
        expect(newState.hasError).toBe(null);
      });
      /////////////////////////////////////////////////////////////////////////
      it('should handle itemsTodoAdd.rejected', () => {
        const initialState = {
          todos: [],
          notes: [],
          isLoading: true,
          hasError: null,
        }

        const errorMessage = 'Failed to fetch user details';

        const action = itemsTodoAdd.rejected(null, null, errorMessage);

        const newState = items(initialState, action);

        // Check state after dispatching the rejected action
        expect(newState.isLoading).toBe(false);
        expect(newState.todos).toBe(initialState.todos);
        expect(newState.hasError).toStrictEqual({ "message": "Rejected" });
      });
      ///////////////////////////////////////////////////////////////////////
      it('should handle itemsTodoUpdate.pending', () => {
        const initialState = {
          todos: [],
          notes: [],
        }

        const newState = items(initialState, itemsTodoUpdate.pending());

        // Check state after dispatching the pending action
        expect(newState.isLoading).toBe(true);
        expect(newState.todos).toBe(initialState.todos);
        expect(newState.hasError).toBe(null);
      });
      ///////////////////////////////////////////////////////////////////////
      it('should handle itemsTodoUpdate.fulfilled', () => {
        const initialState = {
          todos: [],
          notes: [],
          isLoading: true,
          hasError: null,
        }

        const mockData = [
          {
            id: 1,
            title: "corge",
            todoItems: [
              { value: 'foo', state: true },
              { value: 'bar', state: false },
              { value: 'baz', state: false }
            ]
          }
        ];

        const action = itemsTodoUpdate.fulfilled(mockData);

        const newState = items(initialState, action);

        // Check state after dispatching the fulfilled action
        //console.log(newState)
        expect(newState.isLoading).toBe(false);
        expect(newState.todos).toEqual(mockData);
        expect(newState.hasError).toBe(null);
      });
      /////////////////////////////////////////////////////////////////////////
      it('should handle itemsTodoUpdate.rejected', () => {
        const initialState = {
          todos: [],
          notes: [],
          isLoading: true,
          hasError: null,
        }

        const errorMessage = 'Failed to fetch user details';

        const action = itemsTodoUpdate.rejected(null, null, errorMessage);

        const newState = items(initialState, action);

        // Check state after dispatching the rejected action
        expect(newState.isLoading).toBe(false);
        expect(newState.todos).toBe(initialState.todos);
        expect(newState.hasError).toStrictEqual({ "message": "Rejected" });
      });
      ///////////////////////////////////////////////////////////////////////
      it('should handle itemsTodoDelete.pending', () => {
        const initialState = {
          todos: [],
          notes: [],
        }

        const newState = items(initialState, itemsTodoDelete.pending());

        // Check state after dispatching the pending action
        expect(newState.isLoading).toBe(true);
        expect(newState.todos).toBe(initialState.todos);
        expect(newState.hasError).toBe(null);
      });
      ///////////////////////////////////////////////////////////////////////
      it('should handle itemsTodoDelete.fulfilled', () => {
        const initialState = {
          todos: [],
          notes: [],
          isLoading: true,
          hasError: null,
        }

        const mockData = [
          {
            id: 1,
            title: "corge",
            todoItems: [
              { value: 'foo', state: true },
              { value: 'bar', state: false },
              { value: 'baz', state: false }
            ]
          }
        ];

        const action = itemsTodoDelete.fulfilled(mockData);

        const newState = items(initialState, action);

        // Check state after dispatching the fulfilled action
        //console.log(newState)
        expect(newState.isLoading).toBe(false);
        expect(newState.todos).toEqual(mockData);
        expect(newState.hasError).toBe(null);
      });
      /////////////////////////////////////////////////////////////////////////
      it('should handle itemsTodoDelete.rejected', () => {
        const initialState = {
          todos: [],
          notes: [],
          isLoading: true,
          hasError: null,
        }

        const errorMessage = 'Failed to fetch user details';

        const action = itemsTodoDelete.rejected(null, null, errorMessage);

        const newState = items(initialState, action);

        // Check state after dispatching the rejected action
        expect(newState.isLoading).toBe(false);
        expect(newState.todos).toBe(initialState.todos);
        expect(newState.hasError).toStrictEqual({ "message": "Rejected" });
      });
    });
  });
  // get     /calendar                   calendarSlice   calendarGet      list of users calendar items in date range
  // post    /calendar                   calendarSlice   calendarPost     list of users calendar items in date range
  // delete  /calendar                   calendarSlice   calendarDelete   list of users calendar items in date range


  describe('calendar', () => {
    describe('calendarFetch', () => {
      it('should handle calendarFetch.pending', () => {
        const initialState = {
          calendarItems: [],
          isLoading: false,
          hasError: null,
        };

        const newState = calendar(initialState, calendarFetch.pending());

        // Check state after dispatching the pending action
        expect(newState.isLoading).toBe(true);
        expect(newState.calendarItems.length).toBe(0);
        expect(newState.hasError).toBe(null);
      });

      ///////////////////////////////////////////////////////////////////////
      it('should handle calendarFetch.fulfilled', () => {
        const initialState = {
          calendarItems: [],
          isLoading: true,
          hasError: null,
        };

        const calendarData = [
          { id: 1, type: 'appointment', title: 'FOO', value: 'foo', dateFrom: date, dateTo: date },
          { id: 2, type: 'event', title: 'BAR', value: 'bar', dateFrom: date, dateTo: date },
          { id: 3, type: 'reminder', title: 'BAZ', value: 'baz', dateFrom: date, dateTo: date },
          { id: 4, type: 'appointment', title: 'QUX', value: 'qux', dateFrom: date + 1, dateTo: date + 1 },
          { id: 5, type: 'event', title: 'QUUX', value: 'quux', dateFrom: date + 1, dateTo: date + 1 },
          { id: 6, type: 'reminder', title: 'CORGE', value: 'corge', dateFrom: date + 1, dateTo: date + 1 }
        ];

        const action = calendarFetch.fulfilled(calendarData);

        const newState = calendar(initialState, action);

        // Check state after dispatching the fulfilled action
        // console.log(newState)
        expect(newState.isLoading).toBe(false);
        expect(newState.calendarItems).toEqual(calendarData);
        expect(newState.hasError).toBe(null);
      });
      ///////////////////////////////////////////////////////////////////////////////////
      it('should handle calendarFetch.rejected', () => {
        const initialState = {
          calendarItems: [],
          isLoading: true,
          hasError: null,
        };

        const errorMessage = 'Failed to fetch user details';

        const action = calendarFetch.rejected(null, null, errorMessage);

        const newState = calendar(initialState, action);

        // Check state after dispatching the rejected action
        expect(newState.isLoading).toBe(false);
        expect(newState.calendarItems.length).toBe(0);
        expect(newState.hasError).toStrictEqual("Rejected");
      });

    })
    describe('calendarPost', () => {
      it('should handle calendarPost.pending', () => {
        const initialState = {
          calendarItems: [],
          isLoading: false,
          hasError: null,
        };

        const newState = calendar(initialState, calendarPost.pending());

        // Check state after dispatching the pending action
        expect(newState.isLoading).toBe(true);
        expect(newState.calendarItems.length).toBe(0);
        expect(newState.hasError).toBe(null);
      });

      ///////////////////////////////////////////////////////////////////////
      it('should handle calendarPost.fulfilled', () => {
        const initialState = {
          calendarItems: [],
          isLoading: true,
          hasError: null,
        };

        const calendarData = [
          { id: 1, type: 'appointment', title: 'FOO', value: 'foo', dateFrom: date, dateTo: date },
          { id: 2, type: 'event', title: 'BAR', value: 'bar', dateFrom: date, dateTo: date },
          { id: 3, type: 'reminder', title: 'BAZ', value: 'baz', dateFrom: date, dateTo: date },
          { id: 4, type: 'appointment', title: 'QUX', value: 'qux', dateFrom: date + 1, dateTo: date + 1 },
          { id: 5, type: 'event', title: 'QUUX', value: 'quux', dateFrom: date + 1, dateTo: date + 1 },
          { id: 6, type: 'reminder', title: 'CORGE', value: 'corge', dateFrom: date + 1, dateTo: date + 1 }
        ];

        const action = calendarPost.fulfilled(calendarData);

        const newState = calendar(initialState, action);

        // Check state after dispatching the fulfilled action
        // console.log(newState)
        expect(newState.isLoading).toBe(false);
        expect(newState.calendarItems).toEqual(calendarData);
        expect(newState.hasError).toBe(null);
      });
      ///////////////////////////////////////////////////////////////////////////////////
      it('should handle calendarPost.rejected', () => {
        const initialState = {
          calendarItems: [],
          isLoading: true,
          hasError: null,
        };

        const errorMessage = 'Failed to fetch user details';

        const action = calendarPost.rejected(null, null, errorMessage);

        const newState = calendar(initialState, action);

        // Check state after dispatching the rejected action
        expect(newState.isLoading).toBe(false);
        expect(newState.calendarItems.length).toBe(0);
        expect(newState.hasError).toStrictEqual("Rejected");
      });



      describe('calendarDelete', () => {
        it('should handle calendarDelete.pending', () => {
          const initialState = {
            calendarItems: [],
            isLoading: false,
            hasError: null,
          };

          const newState = calendar(initialState, calendarDelete.pending());

          // Check state after dispatching the pending action
          expect(newState.isLoading).toBe(true);
          expect(newState.calendarItems.length).toBe(0);
          expect(newState.hasError).toBe(null);
        });

        ///////////////////////////////////////////////////////////////////////
        it('should handle calendarDelete.fulfilled', () => {
          const initialState = {
            calendarItems: [],
            isLoading: true,
            hasError: null,
          };

          const calendarData = [
            { id: 1, type: 'appointment', title: 'FOO', value: 'foo', dateFrom: date, dateTo: date },
            { id: 2, type: 'event', title: 'BAR', value: 'bar', dateFrom: date, dateTo: date },
            { id: 3, type: 'reminder', title: 'BAZ', value: 'baz', dateFrom: date, dateTo: date },
            { id: 4, type: 'appointment', title: 'QUX', value: 'qux', dateFrom: date + 1, dateTo: date + 1 },
            { id: 5, type: 'event', title: 'QUUX', value: 'quux', dateFrom: date + 1, dateTo: date + 1 },
            { id: 6, type: 'reminder', title: 'CORGE', value: 'corge', dateFrom: date + 1, dateTo: date + 1 }
          ];

          const action = calendarDelete.fulfilled(calendarData);

          const newState = calendar(initialState, action);

          // Check state after dispatching the fulfilled action
          // console.log(newState)
          expect(newState.isLoading).toBe(false);
          expect(newState.calendarItems).toEqual(calendarData);
          expect(newState.hasError).toBe(null);
        });
        ///////////////////////////////////////////////////////////////////////////////////
        it('should handle calendarDelete.rejected', () => {
          const initialState = {
            calendarItems: [],
            isLoading: true,
            hasError: null,
          };

          const errorMessage = 'Failed to fetch user details';

          const action = calendarDelete.rejected(null, null, errorMessage);

          const newState = calendar(initialState, action);

          // Check state after dispatching the rejected action
          expect(newState.isLoading).toBe(false);
          expect(newState.calendarItems.length).toBe(0);
          expect(newState.hasError).toStrictEqual("Rejected");
        });




      });
    });

  });
  describe('calendar/attenddes', () => {
    describe('calendarPostAttendee', () => {
      it('should handle calendarPost.pending', () => {
        const initialState = {
          calendarItems: [],
          isLoading: false,
          hasError: null,
        };

        const newState = calendar(initialState, calendarPostAttendee.pending());

        // Check state after dispatching the pending action
        expect(newState.isLoading).toBe(true);
        expect(newState.calendarItems.length).toBe(0);
        expect(newState.hasError).toBe(null);
      });

      ///////////////////////////////////////////////////////////////////////
      it('should handle calendarPost.fulfilled', () => {
        const initialState = {
          calendarItems: [],
          isLoading: true,
          hasError: null,
        };

        const calendarData = [
          { id: 1, type: 'appointment', title: 'FOO', value: 'foo', dateFrom: date, dateTo: date },
          { id: 2, type: 'event', title: 'BAR', value: 'bar', dateFrom: date, dateTo: date },
          { id: 3, type: 'reminder', title: 'BAZ', value: 'baz', dateFrom: date, dateTo: date },
          { id: 4, type: 'appointment', title: 'QUX', value: 'qux', dateFrom: date + 1, dateTo: date + 1 },
          { id: 5, type: 'event', title: 'QUUX', value: 'quux', dateFrom: date + 1, dateTo: date + 1 },
          { id: 6, type: 'reminder', title: 'CORGE', value: 'corge', dateFrom: date + 1, dateTo: date + 1 }
        ];

        const action = calendarPostAttendee.fulfilled(calendarData);

        const newState = calendar(initialState, action);

        // Check state after dispatching the fulfilled action
        // console.log(newState)
        expect(newState.isLoading).toBe(false);
        expect(newState.calendarItems).toEqual(calendarData);
        expect(newState.hasError).toBe(null);
      });
      ///////////////////////////////////////////////////////////////////////////////////
      it('should handle calendarPost.rejected', () => {
        const initialState = {
          calendarItems: [],
          isLoading: true,
          hasError: null,
        };

        const errorMessage = 'Failed to fetch user details';

        const action = calendarPostAttendee.rejected(null, null, errorMessage);

        const newState = calendar(initialState, action);

        // Check state after dispatching the rejected action
        expect(newState.isLoading).toBe(false);
        expect(newState.calendarItems.length).toBe(0);
        expect(newState.hasError).toStrictEqual("Rejected" );
      });



      describe('calendarDeleteAttendee', () => {
        it('should handle calendarDelete.pending', () => {
          const initialState = {
            calendarItems: [],
            isLoading: false,
            hasError: null,
          };

          const newState = calendar(initialState, calendarDeleteAttendee.pending());

          // Check state after dispatching the pending action
          expect(newState.isLoading).toBe(true);
          expect(newState.calendarItems.length).toBe(0);
          expect(newState.hasError).toBe(null);
        });

        ///////////////////////////////////////////////////////////////////////
        it('should handle calendarDelete.fulfilled', () => {
          const initialState = {
            calendarItems: [],
            isLoading: true,
            hasError: null,
          };

          const calendarData = [
            { id: 1, type: 'appointment', title: 'FOO', value: 'foo', dateFrom: date, dateTo: date },
            { id: 2, type: 'event', title: 'BAR', value: 'bar', dateFrom: date, dateTo: date },
            { id: 3, type: 'reminder', title: 'BAZ', value: 'baz', dateFrom: date, dateTo: date },
            { id: 4, type: 'appointment', title: 'QUX', value: 'qux', dateFrom: date + 1, dateTo: date + 1 },
            { id: 5, type: 'event', title: 'QUUX', value: 'quux', dateFrom: date + 1, dateTo: date + 1 },
            { id: 6, type: 'reminder', title: 'CORGE', value: 'corge', dateFrom: date + 1, dateTo: date + 1 }
          ];

          const action = calendarDeleteAttendee.fulfilled(calendarData);

          const newState = calendar(initialState, action);

          // Check state after dispatching the fulfilled action
          // console.log(newState)
          expect(newState.isLoading).toBe(false);
          expect(newState.calendarItems).toEqual(calendarData);
          expect(newState.hasError).toBe(null);
        });
        ///////////////////////////////////////////////////////////////////////////////////
        it('should handle calendarDelete.rejected', () => {
          const initialState = {
            calendarItems: [],
            isLoading: true,
            hasError: null,
          };

          const errorMessage = 'Failed to fetch user details';

          const action = calendarDeleteAttendee.rejected(null, null, errorMessage);

          const newState = calendar(initialState, action);

          // Check state after dispatching the rejected action
          expect(newState.isLoading).toBe(false);
          expect(newState.calendarItems.length).toBe(0);
          expect(newState.hasError).toStrictEqual("Rejected");
        });




      });
    });
    describe('calendarUpdateAttendee', () => {
      it('should handle calendarUpdate.pending', () => {
        const initialState = {
          calendarItems: [],
          isLoading: false,
          hasError: null,
        };

        const newState = calendar(initialState, calendarUpdateAttendee.pending());

        // Check state after dispatching the pending action
        expect(newState.isLoading).toBe(true);
        expect(newState.calendarItems.length).toBe(0);
        expect(newState.hasError).toBe(null);
      });

      ///////////////////////////////////////////////////////////////////////
      it('should handle calendarUpdate.fulfilled', () => {
        const initialState = {
          calendarItems: [],
          isLoading: true,
          hasError: null,
        };

        const calendarData = [
          { id: 1, type: 'appointment', title: 'FOO', value: 'foo', dateFrom: date, dateTo: date },
          { id: 2, type: 'event', title: 'BAR', value: 'bar', dateFrom: date, dateTo: date },
          { id: 3, type: 'reminder', title: 'BAZ', value: 'baz', dateFrom: date, dateTo: date },
          { id: 4, type: 'appointment', title: 'QUX', value: 'qux', dateFrom: date + 1, dateTo: date + 1 },
          { id: 5, type: 'event', title: 'QUUX', value: 'quux', dateFrom: date + 1, dateTo: date + 1 },
          { id: 6, type: 'reminder', title: 'CORGE', value: 'corge', dateFrom: date + 1, dateTo: date + 1 }
        ];

        const action = calendarUpdateAttendee.fulfilled(calendarData);

        const newState = calendar(initialState, action);

        // Check state after dispatching the fulfilled action
        // console.log(newState)
        expect(newState.isLoading).toBe(false);
        expect(newState.calendarItems).toEqual(calendarData);
        expect(newState.hasError).toBe(null);
      });
      ///////////////////////////////////////////////////////////////////////////////////
      it('should handle calendarUpdateAttendee.rejected', () => {
        const initialState = {
          calendarItems: [],
          isLoading: true,
          hasError: null,
        };

        const errorMessage = 'Failed to fetch user details';

        const action = calendarUpdateAttendee.rejected(null, null, errorMessage);

        const newState = calendar(initialState, action);

        // Check state after dispatching the rejected action
        expect(newState.isLoading).toBe(false);
        expect(newState.calendarItems.length).toBe(0);
        expect(newState.hasError).toStrictEqual("Rejected");
      });




    });

  });
  // get     /today                      todaySlice      todayFetch       list of items for today
  describe('today', () => {
    describe('todayFetch', () => {
      it('should handle todayFetch.pending', () => {
        const initialState = {
          calendarItems: [],
          isLoading: false,
          hasError: null,
        };

        const newState = today(initialState, todayFetch.pending());

        // Check state after dispatching the pending action
        expect(newState.isLoading).toBe(true);
        expect(newState.calendarItems.length).toBe(0);
        expect(newState.hasError).toBe(null);
      });

      ///////////////////////////////////////////////////////////////////////
      it('should handle todayFetch.fulfilled', () => {
        const initialState = {
          calendarItems: [],
          isLoading: true,
          hasError: null,
        };

        const todayData = [
          { id: 1, type: 'appointment', title: 'FOO', value: 'foo', dateFrom: date, dateTo: date },
          { id: 2, type: 'event', title: 'BAR', value: 'bar', dateFrom: date, dateTo: date },
          { id: 3, type: 'reminder', title: 'BAZ', value: 'baz', dateFrom: date, dateTo: date },
        ];

        const action = todayFetch.fulfilled(todayData);

        const newState = today(initialState, action);

        // Check state after dispatching the fulfilled action
        // console.log(newState)
        expect(newState.isLoading).toBe(false);
        expect(newState.calendarItems).toEqual(todayData);
        expect(newState.hasError).toBe(null);
      });
      ///////////////////////////////////////////////////////////////////////////////////
      it('should handle todayFetch.rejected', () => {
        const initialState = {
          calendarItems: [],
          isLoading: true,
          hasError: null,
        };

        const errorMessage = 'Failed to fetch user details';

        const action = todayFetch.rejected(null, null, errorMessage);

        const newState = today(initialState, action);
        //console.log(newState)
        // Check state after dispatching the rejected action
        expect(newState.isLoading).toBe(false);
        expect(newState.calendarItems.length).toBe(0);
        expect(newState.hasError).toStrictEqual({ "message": "Rejected" });
      });




    });

  });
  // get     /wall                       wallSlice       wallFetch        list of items on users wall in descending date order
  describe('wall', () => {
    describe('wallFetch', () => {
      it('should handle wallFetch.pending', () => {
        const initialState = {
          wallItems: [],
          isLoading: false,
          hasError: null,
        };

        const newState = wall(initialState, wallFetch.pending());

        // Check state after dispatching the pending action
        expect(newState.isLoading).toBe(true);
        expect(newState.wallItems.length).toBe(0);
        expect(newState.hasError).toBe(null);
      });

      ///////////////////////////////////////////////////////////////////////
      it('should handle wallFetch.fulfilled', () => {
        const initialState = {
          wallItems: [],
          isLoading: true,
          hasError: null,
        };

        const wallData = [
          { id: 1, type: 'appointment', title: 'FOO', owner: 'bob', value: 'foo', dateFrom: date, dateTo: date },
          { id: 2, type: 'event', title: 'BAR', owner: 'alice', value: 'bar', dateFrom: date, dateTo: date },
          { id: 3, type: 'reminder', title: 'BAZ', owner: 'alice', value: 'baz', dateFrom: date, dateTo: date },
          { id: 4, type: 'note', title: 'QUX', owner: 'alice', value: 'qux', date: date.setHours(1, 0) },
          { id: 5, type: 'note', title: 'QUUX', owner: 'bob', value: 'quux', date: date.setHours(2, 0) },
          { id: 6, type: 'note', title: 'CORGE', owner: 'chaz', value: 'corge', date: date.setHours(3, 0) }
        ];

        const action = wallFetch.fulfilled(wallData);

        const newState = wall(initialState, action);

        // Check state after dispatching the fulfilled action
        // console.log(newState)
        expect(newState.isLoading).toBe(false);
        expect(newState.wallItems).toEqual(wallData);
        expect(newState.hasError).toBe(null);
      });
      ///////////////////////////////////////////////////////////////////////////////////
      it('should handle wallFetch.rejected', () => {
        const initialState = {
          wallItems: [],
          isLoading: true,
          hasError: null,
        };

        const errorMessage = 'Failed to fetch user details';

        const action = wallFetch.rejected(null, null, errorMessage);

        const newState = wall(initialState, action);

        // Check state after dispatching the rejected action
        expect(newState.isLoading).toBe(false);
        expect(newState.wallItems.length).toBe(0);
        expect(newState.hasError).toStrictEqual({ "message": "Rejected" });
      });




    });

  });


  // post    /login                      userSlice       userAuthLogin        user bearer token
  // post    /register                   userSlice       userAuthRegister     user bearer token
  // post    /auth/[3rd party site]      userSlice       userAuth         3rd part auth token

  describe('user', () => {
    describe('userAuthLogin', () => {
      it('should handle userAuthLogin.pending', () => {
        const initialState = {
          authToken: "",
          isLoggedIn: false,
          customer_id: null,
          userAlreadyExists: null,
          isLoading: false,
          hasError: null,
        }

        const newState = userAuth(initialState, userAuthLogin.pending());

        // Check state after dispatching the pending action
        expect(newState.isLoading).toBe(true);
        expect(newState.authToken).toBe('');
        expect(newState.hasError).toBe(null);
      });

      ///////////////////////////////////////////////////////////////////////
      it('should handle userAuthLogin.fulfilled', () => {
        const initialState = {
          authToken: "",
          isLoggedIn: true,
          customer_id: null,
          userAlreadyExists: null,
          isLoading: true,
          hasError: null,
        }

        const authToken = { token: "THISISIANAUTHTOKEN" };

        const action = userAuthLogin.fulfilled(authToken);

        const newState = userAuth(initialState, action);

        // Check state after dispatching the fulfilled action
        // console.log(newState)
        expect(newState.isLoading).toBe(false);
        expect(newState.authToken).toEqual(authToken.token);
        expect(newState.hasError).toBe(null);
      });
      ///////////////////////////////////////////////////////////////////////////////////
      it('should handle userAuthLogin.rejected', () => {
        const initialState = {
          authToken: "",
          isLoggedIn: true,
          customer_id: null,
          userAlreadyExists: null,
          isLoading: true,
          hasError: null,
        }

        const errorMessage = 'Failed to fetch user details';

        const action = userAuthLogin.rejected(null, null, errorMessage);

        const newState = userAuth(initialState, action);

        // Check state after dispatching the rejected action
        expect(newState.isLoading).toBe(false);
        expect(newState.authToken).toBe('');
        expect(newState.hasError).toStrictEqual({ "message": "Rejected" });
      });




    });

    describe('userAuthRegister', () => {
      it('should handle userAuthRegister.pending', () => {
        const initialState = {
          authToken: "",
          isLoggedIn: false,
          customer_id: null,
          userAlreadyExists: null,
          isLoading: false,
          hasError: null,
        }

        const newState = userAuth(initialState, userAuthRegister.pending());

        // Check state after dispatching the pending action
        expect(newState.isLoading).toBe(true);
        expect(newState.authToken).toBe('');
        expect(newState.hasError).toBe(null);
      });

      ///////////////////////////////////////////////////////////////////////
      it('should handle userAuthRegister.fulfilled', () => {
        const initialState = {
          authToken: "",
          isLoggedIn: true,
          customer_id: null,
          userAlreadyExists: null,
          isLoading: true,
          hasError: null,
        }

        const authToken = { token: "THISISIANAUTHTOKEN" };

        const action = userAuthRegister.fulfilled(authToken);

        const newState = userAuth(initialState, action);

        // Check state after dispatching the fulfilled action
        // console.log(newState)
        expect(newState.isLoading).toBe(false);
        expect(newState.authToken).toEqual(authToken.token);
        expect(newState.hasError).toBe(null);
      });
      ///////////////////////////////////////////////////////////////////////////////////
      it('should handle userAuthRegister.rejected', () => {
        const initialState = {
          authToken: "",
          isLoggedIn: true,
          customer_id: null,
          userAlreadyExists: null,
          isLoading: true,
          hasError: null,
        }

        const errorMessage = 'Failed to fetch user details';

        const action = userAuthRegister.rejected(null, null, errorMessage);

        const newState = userAuth(initialState, action);

        // Check state after dispatching the rejected action
        expect(newState.isLoading).toBe(false);
        expect(newState.authToken).toBe('');
        expect(newState.hasError).toStrictEqual({ "message": "Rejected" });
      });




    });
    describe('userAuthCheckExists', () => {
      it('should handle userAuthCheckExists.pending', () => {
        const initialState = {
          authToken: "",
          isLoggedIn: false,
          customer_id: null,
          userAlreadyExists: null,
          isLoading: false,
          hasError: null,
        }

        const newState = userAuth(initialState, userAuthCheckExists.pending());

        // Check state after dispatching the pending action
        expect(newState.isLoading).toBe(true);
        expect(newState.userAlreadyExists).toBe(null);
        expect(newState.hasError).toBe(null);
      });

      ///////////////////////////////////////////////////////////////////////
      it('should handle userAuthCheckExists.fulfilled', () => {
        const initialState = {
          authToken: "",
          isLoggedIn: true,
          customer_id: null,
          userAlreadyExists: null,
          isLoading: true,
          hasError: null,
        }


        const action = userAuthCheckExists.fulfilled({ exists: true });

        const newState = userAuth(initialState, action);

        // Check state after dispatching the fulfilled action
        // console.log(newState)
        expect(newState.isLoading).toBe(false);
        expect(newState.userAlreadyExists).toEqual(true);
        expect(newState.hasError).toBe(null);
      });
      ///////////////////////////////////////////////////////////////////////////////////
      it('should handle userAuthCheckExists.rejected', () => {
        const initialState = {
          authToken: "",
          isLoggedIn: true,
          customer_id: null,
          userAlreadyExists: null,
          isLoading: true,
          hasError: null,
        }

        const errorMessage = 'Failed to fetch user details';

        const action = userAuthCheckExists.rejected(null, null, errorMessage);

        const newState = userAuth(initialState, action);

        // Check state after dispatching the rejected action
        if (newState.isLoading) {
          console.log("authckeckexists", newState)
        }
        expect(newState.isLoading).toBe(false);
        expect(newState.userAlreadyExists).toBe(null);
        expect(newState.hasError).toStrictEqual({ "message": "Rejected" });
      });




    });
  });
})