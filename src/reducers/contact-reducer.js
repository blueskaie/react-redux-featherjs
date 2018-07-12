// src/reducers/contact-reducer.js

const defaultState = {
    contacts: [],
    contact: {name:{}},
    loading:false,
    errors:{}
  }
  
  export default (state=defaultState, action={}) => {
    switch (action.type) {
      case 'FETCH_CONTACTS_FULFILLED': {
        return {
          ...state,
          contacts: action.payload.data.data
        }
      }
      case 'NEW_CONTACT': {
        return {
          ...state,
          contact: {name:{}}
        }
      }
      case 'FETCH_CONTACT_FULFILLED': {
        return {
          ...state,
          contact: action.payload.data
        }
      }  
      case 'SAVE_CONTACT_PENDING': {
        return {
          ...state,
          loading: true
        }
      }
  
      case 'SAVE_CONTACT_FULFILLED': {
        return {
          ...state,
          contacts: [...state.contacts, action.payload.data],
          errors: {},
          loading: false
        }
      }
  
      case 'SAVE_CONTACT_REJECTED': {
        const data = action.payload.response.data;
        // convert feathers error formatting to match client-side error formatting
        const { "name.first":first, "name.last":last, phone, email } = data.errors;
        const errors = { global: data.message, name: { first,last }, phone, email };
        return {
          ...state,
          errors: errors,
          loading: false
        }
      }

      case 'DELETE_CONTACT_FULFILLED': {
        const _id = action.payload.data._id;
        return {
          ...state,
          contacts: state.contacts.filter(item => item._id !== _id)
        }
      }
      
      default:
        return state;
    }
  }