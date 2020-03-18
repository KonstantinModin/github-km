import { SET_CURRENT_TAB } from "./actions";

const INITIAL_STATE = {
    currentTab: 0
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_CURRENT_TAB:
            return { ...state, currentTab: action.payload };
        default:
            return state;
    }
};

export default reducer;
