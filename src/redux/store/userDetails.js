
import produce from "immer";
import createReducer from './reducerUtil';

const initialState = {
    detailUser: {}
}

const editDetails = {
    setDetailUser(state, action) {
        debugger
        state.detailUser = action.payload
    }
}



export default produce((state, action) => createReducer(state, action, editDetails), initialState)
