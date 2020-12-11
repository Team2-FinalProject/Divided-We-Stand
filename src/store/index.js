import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const initialState = {
    players: []
}

function reducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state
    }
}

const store = createStore(reducer, applyMiddleware(thunk))

export default store